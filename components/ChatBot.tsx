import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Zap, Bot, Minimize2 } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Olá! Sou a IA da Allrah. Como posso ajudar a automatizar sua empresa hoje?", 
      sender: 'bot' 
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Base de conhecimento simulada da Allrah
  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('preço') || lowerInput.includes('custo') || lowerInput.includes('valor') || lowerInput.includes('quanto')) {
      return "Nossas soluções são personalizadas para a escala da sua empresa. Agende uma demo para recebermos um diagnóstico e orçamento sob medida.";
    }
    if (lowerInput.includes('equipe') || lowerInput.includes('fundador') || lowerInput.includes('quem')) {
      return "A Allrah é liderada por visionários: Luther Banze (CEO & Founder), Arshad Ibrahimo (Co-Founder) e Fadhil Teixeira (Head of AI).";
    }
    if (lowerInput.includes('luther')) {
      return "Luther Banze é nosso CEO e Fundador, responsável pela visão futurista da Allrah.";
    }
    if (lowerInput.includes('o que') || lowerInput.includes('faz') || lowerInput.includes('serviço')) {
      return "Somos uma startup de automação avançada. Criamos fluxos de trabalho invisíveis, IA preditiva e sistemas que se autocorrigem para eliminar ineficiências.";
    }
    if (lowerInput.includes('contato') || lowerInput.includes('falar') || lowerInput.includes('email')) {
      return "Você pode usar o formulário na seção 'Fale Conosco' desta página ou nos enviar um e-mail diretamente.";
    }
    if (lowerInput.includes('tecnologia') || lowerInput.includes('ia') || lowerInput.includes('como funciona')) {
      return "Utilizamos uma arquitetura proprietária de IA Neural que processa dados em tempo real e aprende com seus processos para otimizar a execução.";
    }
    if (lowerInput.includes('olá') || lowerInput.includes('oi') || lowerInput.includes('bom dia') || lowerInput.includes('boa tarde')) {
      return "Olá! Bem-vindo ao futuro da automação. Sobre o que gostaria de saber?";
    }
    
    return "Interessante pergunta. Como sou uma IA focada na Allrah, posso detalhar nossa tecnologia, equipe ou agendar uma demonstração. O que prefere?";
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const newMsg: Message = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, newMsg]);
    const userText = inputValue;
    setInputValue('');
    setIsTyping(true);

    // Simular tempo de processamento da IA
    setTimeout(() => {
      const botResponse = getBotResponse(userText);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end font-sans">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-2rem)] sm:w-[350px] md:w-[400px] h-[60vh] md:h-[500px] max-h-[80vh] bg-allrah-dark/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-fade-in-up origin-bottom-right transition-all">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-allrah-main to-allrah-deep flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Allrah Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  <span className="text-[10px] text-white/80 uppercase tracking-wider">Online</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
               <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
                  <Minimize2 size={18} />
               </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-allrah-deep scrollbar-track-transparent">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-allrah-main text-white rounded-br-none shadow-[0_0_15px_rgba(106,0,255,0.3)]' 
                      : 'bg-white/10 text-gray-100 border border-white/5 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 p-4 rounded-2xl rounded-bl-none border border-white/5 flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 bg-black/40 border-t border-white/10 flex gap-2 shrink-0">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Digite sua pergunta..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-allrah-main/50 focus:bg-white/10 transition-all placeholder-gray-500 min-w-0"
            />
            <button 
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2.5 bg-allrah-main hover:bg-allrah-deep text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative w-12 h-12 md:w-14 md:h-14 bg-allrah-main hover:bg-white hover:text-allrah-main text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(106,0,255,0.4)] transition-all duration-300 transform hover:scale-110 active:scale-95"
      >
        {/* Ripples */}
        {!isOpen && (
           <>
            <span className="absolute inset-0 rounded-full border border-allrah-main animate-ping opacity-75"></span>
            <span className="absolute inset-0 rounded-full border border-allrah-main animate-ping animation-delay-1000 opacity-75"></span>
           </>
        )}
        
        {isOpen ? (
            <X size={24} className="md:w-7 md:h-7" />
        ) : (
            <MessageSquare size={24} className={`md:w-7 md:h-7 ${isHovered ? 'animate-bounce' : ''}`} />
        )}

        {/* Badge */}
        {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3 md:h-4 md:w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 md:h-4 md:w-4 bg-red-500"></span>
            </span>
        )}
      </button>
    </div>
  );
};

export default ChatBot;