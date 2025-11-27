import React, { useEffect, useState, useRef } from 'react';
import { Mic, MicOff, X, Activity, Volume2 } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

interface RevolutionProps {
  onBack: () => void;
}

const Revolution: React.FC<RevolutionProps> = ({ onBack }) => {
  const [status, setStatus] = useState<'connecting' | 'connected' | 'error' | 'disconnected'>('connecting');
  const [isMicOn, setIsMicOn] = useState(true);
  const [audioLevel, setAudioLevel] = useState(0); // For visualization
  const [errorMessage, setErrorMessage] = useState('');
  
  // Refs for audio processing
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const inputProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  // Connection Ref
  const sessionRef = useRef<any>(null);

  useEffect(() => {
    startRevolution();
    return () => stopRevolution();
  }, []);

  const startRevolution = async () => {
    try {
      setStatus('connecting');

      // Initialize Audio Contexts
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContextClass({ sampleRate: 24000 }); // Output sample rate
      audioContextRef.current = audioCtx;
      nextStartTimeRef.current = audioCtx.currentTime;

      // Microphone Access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: { 
          sampleRate: 16000, 
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true
        } 
      });
      mediaStreamRef.current = stream;

      // Initialize Gemini
      if (!process.env.API_KEY) {
         throw new Error("API Key not found");
      }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Connect to Live API
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: "Você é a Allrah, uma inteligência artificial avançada e futurista da startup Allrah. Fale português. Seja profissional, mas com um tom inovador e tecnológico. Sua primeira frase deve ser estritamente: 'Bem vindo ao sistema Allrah. A revolução começou.' e depois aguarde o usuário.",
        },
        callbacks: {
          onopen: () => {
            console.log("Allrah Connected");
            setStatus('connected');
            setupAudioInput(stream, sessionPromise);
            
            // Send initial greeting trigger (optional hack if model doesn't auto-start, but prompt says it should)
             sessionPromise.then(session => {
                session.send({ parts: [{ text: "Start" }] });
             });
          },
          onmessage: async (message: LiveServerMessage) => {
            handleServerMessage(message, audioCtx);
          },
          onclose: () => {
            console.log("Connection closed");
            setStatus('disconnected');
          },
          onerror: (err) => {
            console.error("Gemini Error:", err);
            setStatus('error');
            setErrorMessage("Falha na conexão neural.");
          }
        }
      });
      
      sessionRef.current = sessionPromise;

    } catch (err) {
      console.error("Initialization Error:", err);
      setStatus('error');
      setErrorMessage("Permissão de áudio negada ou erro de rede.");
    }
  };

  const setupAudioInput = (stream: MediaStream, sessionPromise: Promise<any>) => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
    const source = audioCtx.createMediaStreamSource(stream);
    const processor = audioCtx.createScriptProcessor(4096, 1, 1);
    
    processor.onaudioprocess = (e) => {
      if (!isMicOn) return;

      const inputData = e.inputBuffer.getChannelData(0);
      
      // Calculate volume for visualizer
      let sum = 0;
      for(let i=0; i<inputData.length; i++) sum += inputData[i] * inputData[i];
      const rms = Math.sqrt(sum / inputData.length);
      setAudioLevel(prev => prev * 0.8 + rms * 10 * 0.2); // Smooth envelope

      // Convert to PCM 16 LE
      const pcm16 = new Int16Array(inputData.length);
      for (let i = 0; i < inputData.length; i++) {
        pcm16[i] = inputData[i] * 32768;
      }
      
      const base64Data = btoa(String.fromCharCode(...new Uint8Array(pcm16.buffer)));

      sessionPromise.then(session => {
         session.sendRealtimeInput({
            media: {
               mimeType: 'audio/pcm;rate=16000',
               data: base64Data
            }
         });
      });
    };

    source.connect(processor);
    processor.connect(audioCtx.destination);
    inputProcessorRef.current = processor;
  };

  const handleServerMessage = async (message: LiveServerMessage, audioCtx: AudioContext) => {
    const serverContent = message.serverContent;
    
    // Audio Data
    if (serverContent?.modelTurn?.parts?.[0]?.inlineData) {
       const base64Audio = serverContent.modelTurn.parts[0].inlineData.data;
       const audioData = Uint8Array.from(atob(base64Audio), c => c.charCodeAt(0));
       
       // Decode PCM (1 channel, 24kHz)
       const audioBuffer = audioCtx.createBuffer(1, audioData.length / 2, 24000);
       const channelData = audioBuffer.getChannelData(0);
       const int16Data = new Int16Array(audioData.buffer);
       
       let maxVal = 0;
       for(let i=0; i < int16Data.length; i++) {
          const val = int16Data[i] / 32768.0;
          channelData[i] = val;
          if(Math.abs(val) > maxVal) maxVal = Math.abs(val);
       }

       // Visualizer response from AI
       setAudioLevel(maxVal * 2); 

       const source = audioCtx.createBufferSource();
       source.buffer = audioBuffer;
       source.connect(audioCtx.destination);
       
       // Scheduling
       const startTime = Math.max(audioCtx.currentTime, nextStartTimeRef.current);
       source.start(startTime);
       nextStartTimeRef.current = startTime + audioBuffer.duration;
       
       sourcesRef.current.add(source);
       source.onended = () => sourcesRef.current.delete(source);
    }

    // Interruptions
    if (serverContent?.interrupted) {
       sourcesRef.current.forEach(src => src.stop());
       sourcesRef.current.clear();
       nextStartTimeRef.current = audioCtx.currentTime;
    }
  };

  const stopRevolution = () => {
     // Cleanup Audio
     if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
     }
     if (inputProcessorRef.current) {
        inputProcessorRef.current.disconnect();
     }
     if (audioContextRef.current) {
        audioContextRef.current.close();
     }
     
     // Close Session (Not directly exposed in quick setup, but garbage collected)
  };

  const toggleMic = () => {
     setIsMicOn(!isMicOn);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden font-sans animate-fade-in">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#32008A_0%,#000000_70%)] opacity-40"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      
      {/* Header */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20">
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-500 text-xs tracking-widest font-mono uppercase">
               {status === 'connected' ? 'Neural Link Established' : status === 'connecting' ? 'Establishing Handshake...' : 'Link Broken'}
            </span>
         </div>
         <button onClick={onBack} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10">
            <X size={24} />
         </button>
      </div>

      {/* Central Visualizer */}
      <div className="relative z-10 flex flex-col items-center gap-12">
         
         <div className="relative group">
            {/* Outer Rings */}
            <div className={`absolute inset-0 rounded-full border border-allrah-main/30 scale-[1.5] transition-transform duration-100 ${status === 'connected' ? 'animate-spin-slow' : ''}`}></div>
            <div className={`absolute inset-0 rounded-full border border-dashed border-allrah-main/20 scale-[2] transition-transform duration-100 ${status === 'connected' ? 'animate-[spin_10s_linear_infinite_reverse]' : ''}`}></div>
            
            {/* The Orb */}
            <div 
               className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-b from-allrah-main to-black border border-allrah-main/50 shadow-[0_0_100px_rgba(106,0,255,0.4)] flex items-center justify-center relative transition-all duration-75"
               style={{
                  transform: `scale(${1 + Math.min(audioLevel, 0.5)})`,
                  boxShadow: `0 0 ${50 + audioLevel * 200}px rgba(106,0,255, ${0.4 + audioLevel})`
               }}
            >
               <div className="absolute inset-2 rounded-full bg-black/80 backdrop-blur-sm"></div>
               
               {/* Core */}
               {status === 'connecting' ? (
                  <div className="flex gap-1">
                     <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                     <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-75"></div>
                     <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-150"></div>
                  </div>
               ) : status === 'error' ? (
                  <Activity className="text-red-500 w-16 h-16 animate-pulse" />
               ) : (
                  <div className="relative w-full h-full flex items-center justify-center">
                     <div className="w-32 h-1 bg-allrah-main blur-sm absolute"></div>
                     <div 
                        className="w-32 h-1 bg-white absolute transition-all duration-75"
                        style={{ height: `${2 + audioLevel * 50}px`, opacity: 0.8 + audioLevel }}
                     ></div>
                     <div 
                        className="w-1 h-32 bg-white absolute transition-all duration-75"
                        style={{ width: `${2 + audioLevel * 50}px`, opacity: 0.8 + audioLevel }}
                     ></div>
                  </div>
               )}
            </div>
         </div>

         {/* Status Text */}
         <div className="text-center h-16">
            {status === 'connecting' && (
               <p className="text-gray-400 font-mono text-sm animate-pulse">
                  Calibrando frequências quânticas...
               </p>
            )}
            {status === 'connected' && (
               <p className="text-white font-medium text-lg animate-fade-in-up">
                  {audioLevel > 0.1 ? "Allrah ouvindo..." : "Aguardando comando de voz..."}
               </p>
            )}
            {status === 'error' && (
               <p className="text-red-400 font-bold">
                  {errorMessage}
               </p>
            )}
         </div>

         {/* Controls */}
         <div className="flex items-center gap-6">
            <button 
               className={`p-6 rounded-full transition-all duration-300 ${isMicOn ? 'bg-white text-black hover:scale-110 shadow-[0_0_30px_rgba(255,255,255,0.3)]' : 'bg-red-500/20 text-red-500 border border-red-500/50'}`}
               onClick={toggleMic}
            >
               {isMicOn ? <Mic size={32} /> : <MicOff size={32} />}
            </button>
            
            <div className="flex flex-col gap-1">
               <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
               <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
               <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
            </div>

            <div className="p-4 rounded-full bg-white/5 border border-white/10 text-gray-400">
               <Volume2 size={24} />
            </div>
         </div>
      </div>
    </div>
  );
};

export default Revolution;