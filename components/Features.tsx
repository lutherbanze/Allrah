import React from 'react';
import { Layers, Zap, ShieldCheck, BarChart3, Globe2, BrainCircuit } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => (
  <div 
    className={`group relative p-8 rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2`}
    style={{ animationDelay: delay }}
  >
    {/* Liquid Glass Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl group-hover:border-allrah-main/30 transition-colors duration-500"></div>
    
    {/* Hover Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-allrah-main/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
    
    <div className="relative z-10">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-allrah-deep/80 to-allrah-dark border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-[0_0_30px_#6A00FF] transition-all duration-300 text-white shadow-lg">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-200 transition-colors font-medium">
        {description}
      </p>
    </div>
  </div>
);

const Features: React.FC = () => {
  const features = [
    {
      icon: <BrainCircuit className="w-8 h-8" />,
      title: "IA Preditiva",
      description: "Algoritmos que antecipam gargalos e otimizam fluxos de trabalho antes mesmo que os problemas surjam."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Execução Instantânea",
      description: "Processamento em tempo real com latência zero. Sua empresa operando na velocidade da luz."
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Integração Universal",
      description: "Conecte a Allrah a qualquer CRM, ERP ou banco de dados legado sem escrever uma única linha de código."
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Criptografia",
      description: "Criptografia de ponta a ponta e compliance automatizado para proteger seus dados mais valiosos."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analytics",
      description: "Dashboards futuristas que transformam dados brutos em insights estratégicos acionáveis."
    },
    {
      icon: <Globe2 className="w-8 h-8" />,
      title: "Escala Global",
      description: "Infraestrutura distribuída que cresce com você, suportando milhões de requisições simultâneas."
    }
  ];

  return (
    <section id="features" className="py-32 relative bg-allrah-dark">
      {/* Background blobs */}
      <div className="absolute top-40 left-0 w-96 h-96 bg-allrah-main/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-40 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold text-allrah-main tracking-[0.2em] uppercase mb-4">
            Tecnologia Core
          </h2>
          <h3 className="text-3xl md:text-5xl font-black text-white mb-6">
            Poder Além da <span className="text-transparent bg-clip-text bg-gradient-to-r from-allrah-main to-purple-400">Imaginação</span>
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto font-medium">
            Uma suíte completa de ferramentas desenhadas para o ecossistema digital do próximo século.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              {...feature} 
              delay={`${index * 100}ms`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;