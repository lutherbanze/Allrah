import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock, Play } from 'lucide-react';

const InteractivePreview: React.FC = () => {
  const [step, setStep] = useState(0);

  // Auto-cycle through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { title: "Input de Dados", desc: "Recebimento de dados brutos de múltiplas fontes." },
    { title: "Processamento Neural", desc: "A IA analisa, categoriza e decide a ação." },
    { title: "Ação Autônoma", desc: "Execução da tarefa e notificação instantânea." }
  ];

  return (
    <section id="tech" className="py-24 bg-gradient-to-b from-allrah-dark via-[#0d0026] to-allrah-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(106,0,255,0.1)_0%,transparent_70%)]"></div>
      
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 relative z-10">
        
        {/* Left Content */}
        <div className="lg:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Fluxos de Trabalho <br />
            <span className="text-allrah-main">Autocorretivos</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Esqueça as regras estáticas. A Allrah aprende com suas operações diárias,
            ajustando automaticamente os parâmetros de automação para maximizar a eficiência
            e reduzir erros a zero.
          </p>
          
          <div className="space-y-6">
            {steps.map((s, idx) => (
              <div 
                key={idx}
                className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-500 ${step === idx ? 'bg-allrah-main/20 border border-allrah-main/50 translate-x-4' : 'opacity-50 border border-transparent'}`}
              >
                <div className={`mt-1 p-2 rounded-full ${step === idx ? 'bg-allrah-main text-white' : 'bg-gray-800 text-gray-500'}`}>
                  {step > idx ? <CheckCircle2 size={16} /> : step === idx ? <Clock size={16} className="animate-spin-slow" /> : <Play size={16} />}
                </div>
                <div>
                  <h4 className={`font-bold ${step === idx ? 'text-white' : 'text-gray-400'}`}>{s.title}</h4>
                  <p className="text-sm text-gray-500">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Visual */}
        <div className="lg:w-1/2 w-full">
          <div className="relative rounded-2xl bg-gray-900 border border-gray-800 p-2 shadow-2xl">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-800 bg-gray-900 rounded-t-xl">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-xs text-gray-500 font-mono">allrah_core — bash — 80x24</span>
            </div>
            
            {/* Terminal Body */}
            <div className="bg-black/90 p-6 rounded-b-xl font-mono text-sm h-[350px] overflow-hidden flex flex-col justify-end">
               <div className="text-gray-500 mb-2">Last login: {new Date().toLocaleTimeString()} on ttys000</div>
               
               <div className={`transition-opacity duration-300 ${step >= 0 ? 'opacity-100' : 'opacity-0'}`}>
                 <span className="text-green-400">➜</span> <span className="text-blue-400">~</span> <span className="text-white">fetching_data_streams...</span>
                 <div className="text-gray-400 mt-1 pl-4">
                   [SUCCESS] CRM_Salesforce connected<br/>
                   [SUCCESS] SQL_Legacy_DB connected<br/>
                   <span className="text-allrah-main">Packets received: 1.45TB</span>
                 </div>
               </div>

               <div className={`mt-4 transition-opacity duration-300 ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                 <span className="text-green-400">➜</span> <span className="text-blue-400">~</span> <span className="text-white">initializing_neural_engine...</span>
                 <div className="text-gray-400 mt-1 pl-4">
                   Analyzing patterns... 98%<br/>
                   <span className="text-yellow-400">Optimization opportunity found (Efficiency +400%)</span><br/>
                   Re-routing logic circuits...
                 </div>
               </div>

               <div className={`mt-4 transition-opacity duration-300 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                 <span className="text-green-400">➜</span> <span className="text-blue-400">~</span> <span className="text-white">executing_tasks</span>
                 <div className="text-gray-400 mt-1 pl-4">
                   <span className="text-green-500">✔ Generated 500 reports</span><br/>
                   <span className="text-green-500">✔ Synced inventory</span><br/>
                   <span className="animate-pulse text-allrah-main">Waiting for next trigger...</span>
                 </div>
               </div>
            </div>
            
            {/* Glow effect behind terminal */}
            <div className="absolute -inset-1 bg-gradient-to-r from-allrah-main to-purple-600 rounded-2xl blur opacity-20 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractivePreview;