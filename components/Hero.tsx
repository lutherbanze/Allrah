import React from 'react';
import { ArrowRight, Bot, Cpu, Network } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-16 md:pt-40 lg:pt-44">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-allrah-main/30 rounded-full mix-blend-screen filter blur-[128px] animate-blob"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-allrah-deep/40 rounded-full mix-blend-screen filter blur-[128px] animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-[128px] animate-blob animation-delay-4000"></div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-allrah-glass-border bg-allrah-glass backdrop-blur-xl mb-8 animate-fade-in-up shadow-[0_0_15px_rgba(106,0,255,0.2)]">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-allrah-main opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-allrah-main"></span>
          </span>
          <span className="text-allrah-light text-xs font-bold tracking-wider">
            Allrah Startup
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight mb-8 leading-tight flex flex-col items-center gap-1 md:gap-2">
          <span className="block text-gray-100 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">Automatize o</span>
          <span className="block text-[#a855f7] drop-shadow-[0_0_40px_rgba(168,85,247,0.6)]">
            Impossível
          </span>
        </h1>

        <div className="relative max-w-2xl mx-auto mb-10 p-5 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm">
          <p className="text-gray-200 text-base md:text-lg lg:text-xl leading-relaxed font-medium">
            Soluções de IA e automação avançada para empresas que buscam performance, inovação e escalabilidade.
          </p>
          {/* Liquid highlight */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="group relative px-6 py-3.5 bg-allrah-main text-white rounded-xl font-bold tracking-wide overflow-hidden transition-all hover:scale-105 shadow-[0_0_40px_-10px_#6A00FF] w-full sm:w-auto">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span className="relative flex items-center justify-center gap-2">
              Iniciar Revolução <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          
          <button className="px-6 py-3.5 border border-white/10 bg-white/5 backdrop-blur-xl text-white rounded-xl font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2 shadow-lg w-full sm:w-auto">
            <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80]"></span>
            Ver Demo ao Vivo
          </button>
        </div>

        {/* Floating Icons Visualization */}
        <div className="mt-20 relative h-32 hidden md:flex items-center justify-center gap-12">
          <div className="flex flex-col items-center gap-2 animate-float">
            <div className="p-5 rounded-2xl bg-gradient-to-b from-white/10 to-transparent border border-white/20 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              <Bot className="w-8 h-8 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            </div>
            <span className="text-[10px] font-bold text-allrah-light tracking-widest">IA AGENTS</span>
          </div>
          
          <div className="flex flex-col items-center gap-2 animate-float animation-delay-2000">
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-allrah-main to-transparent opacity-50"></div>
          </div>
          
          <div className="flex flex-col items-center gap-2 animate-float animation-delay-1000">
            <div className="p-5 rounded-2xl bg-gradient-to-b from-allrah-main/20 to-transparent border border-allrah-main/30 backdrop-blur-2xl shadow-[0_8px_32px_rgba(106,0,255,0.2)]">
              <Cpu className="w-8 h-8 text-purple-300 drop-shadow-[0_0_10px_#d8b4fe]" />
            </div>
            <span className="text-[10px] font-bold text-allrah-light tracking-widest">PROCESSING</span>
          </div>
          
          <div className="flex flex-col items-center gap-2 animate-float animation-delay-3000">
             <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-allrah-main to-transparent opacity-50"></div>
          </div>
          
          <div className="flex flex-col items-center gap-2 animate-float">
            <div className="p-5 rounded-2xl bg-gradient-to-b from-white/10 to-transparent border border-white/20 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              <Network className="w-8 h-8 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            </div>
            <span className="text-[10px] font-bold text-allrah-light tracking-widest">SCALE</span>
          </div>
        </div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-allrah-dark to-transparent z-20"></div>
    </section>
  );
};

export default Hero;