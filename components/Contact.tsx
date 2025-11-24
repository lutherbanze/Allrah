import React from 'react';
import { Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="relative max-w-5xl mx-auto bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-14 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          
          {/* Decorative Background */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-allrah-main/30 rounded-full blur-[100px] animate-pulse-glow"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px]"></div>
          
          {/* Noise texture overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>

          <div className="relative z-10 flex flex-col md:flex-row gap-16">
            <div className="md:w-5/12">
              <h2 className="text-4xl font-black mb-6">Pronto para o Salto?</h2>
              <p className="text-gray-300 mb-10 font-medium leading-relaxed">
                Junte-se às empresas que estão redefinindo o que é possível. 
                Agende uma demonstração personalizada da plataforma Allrah.
              </p>
              
              <div className="flex flex-col gap-6">
                <div className="group p-5 bg-black/40 rounded-2xl border border-white/5 hover:border-allrah-main/50 transition-all">
                  <p className="text-sm font-bold text-white mb-1">Suporte Premium</p>
                  <p className="text-xs text-gray-400 font-medium">Atendimento 24/7 por especialistas.</p>
                </div>
                <div className="group p-5 bg-black/40 rounded-2xl border border-white/5 hover:border-purple-400/50 transition-all">
                  <p className="text-sm font-bold text-white mb-1">Setup Rápido</p>
                  <p className="text-xs text-gray-400 font-medium">Implementação em menos de 1 semana.</p>
                </div>
              </div>
            </div>

            <form className="md:w-7/12 flex flex-col gap-5">
              <div className="group">
                <label className="text-xs font-bold tracking-wider text-allrah-light ml-1 mb-2 block">IDENTIFICAÇÃO</label>
                <input 
                  type="text" 
                  placeholder="Seu Nome" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 focus:border-allrah-main focus:bg-black/60 focus:ring-1 focus:ring-allrah-main outline-none transition-all text-white placeholder-gray-600"
                />
              </div>
              <div className="group">
                <label className="text-xs font-bold tracking-wider text-allrah-light ml-1 mb-2 block">PONTO DE CONTATO</label>
                <input 
                  type="email" 
                  placeholder="seu@email.com" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 focus:border-allrah-main focus:bg-black/60 focus:ring-1 focus:ring-allrah-main outline-none transition-all text-white placeholder-gray-600"
                />
              </div>
              <div className="group">
                <label className="text-xs font-bold tracking-wider text-allrah-light ml-1 mb-2 block">MENSAGEM</label>
                <textarea 
                  rows={4}
                  placeholder="Descreva seu desafio de automação..." 
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 focus:border-allrah-main focus:bg-black/60 focus:ring-1 focus:ring-allrah-main outline-none transition-all text-white placeholder-gray-600 resize-none"
                ></textarea>
              </div>

              <button type="button" className="mt-4 bg-gradient-to-r from-allrah-main to-purple-600 text-white py-5 rounded-xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(106,0,255,0.4)] hover:shadow-[0_0_50px_rgba(106,0,255,0.6)]">
                Enviar Requisição <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;