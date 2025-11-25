import React, { useEffect, useRef, useState } from 'react';
import { Brain, Database, Activity, Cpu } from 'lucide-react';

const NeuralCore: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState({
    accuracy: 98.4,
    nodes: 1042,
    latency: 12
  });

  // Simulação de dados vivos
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        accuracy: +(98 + Math.random()).toFixed(1),
        nodes: prev.nodes + Math.floor(Math.random() * 5),
        latency: 10 + Math.floor(Math.random() * 5)
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    
    // Parâmetros da Esfera Neural
    const particleCount = 200;
    const connectionDistance = 100;
    const rotationSpeed = 0.002;
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    interface Particle {
      x: number;
      y: number;
      z: number;
      size: number;
    }

    const particles: Particle[] = [];

    // Inicializar Partículas na Esfera
    const radius = Math.min(width, height) / 3.5;
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      particles.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
        size: Math.random() * 1.5 + 0.5
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - width / 2) * 0.0005;
      mouseY = (e.clientY - rect.top - height / 2) * 0.0005;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', () => {
        if(canvas) {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        }
    });

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Suavização da rotação
      targetRotationY += (mouseX - targetRotationY) * 0.05;
      targetRotationX += (mouseY - targetRotationX) * 0.05;

      // Rotação automática base
      const time = Date.now() * 0.0005;
      const autoRotateY = time * 0.5;

      const particles2D: { x: number, y: number, z: number, size: number }[] = [];

      // Calcular projeção 3D
      particles.forEach(p => {
        // Rotação Y
        let x1 = p.x * Math.cos(autoRotateY + targetRotationY) - p.z * Math.sin(autoRotateY + targetRotationY);
        let z1 = p.z * Math.cos(autoRotateY + targetRotationY) + p.x * Math.sin(autoRotateY + targetRotationY);
        
        // Rotação X
        let y1 = p.y * Math.cos(targetRotationX) - z1 * Math.sin(targetRotationX);
        let z2 = z1 * Math.cos(targetRotationX) + p.y * Math.sin(targetRotationX);

        // Perspectiva
        const scale = 400 / (400 + z2);
        const x2d = x1 * scale + width / 2;
        const y2d = y1 * scale + height / 2;

        particles2D.push({ x: x2d, y: y2d, z: z2, size: p.size * scale });
      });

      // Desenhar conexões
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles2D.length; i++) {
        for (let j = i + 1; j < particles2D.length; j++) {
          const dx = particles2D[i].x - particles2D[j].x;
          const dy = particles2D[i].y - particles2D[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = 1 - dist / connectionDistance;
            ctx.strokeStyle = `rgba(106, 0, 255, ${alpha * 0.4})`; // Roxo Allrah
            ctx.beginPath();
            ctx.moveTo(particles2D[i].x, particles2D[i].y);
            ctx.lineTo(particles2D[j].x, particles2D[j].y);
            ctx.stroke();
          }
        }
      }

      // Desenhar partículas
      particles2D.sort((a, b) => b.z - a.z); // Z-index sorting
      particles2D.forEach(p => {
        const alpha = (p.z + radius) / (2 * radius); // Fade particles in back
        ctx.fillStyle = `rgba(200, 200, 255, ${Math.max(0.1, alpha)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Glow effect
        if (Math.random() > 0.99) {
             ctx.shadowBlur = 10;
             ctx.shadowColor = '#6A00FF';
             ctx.fillStyle = '#fff';
             ctx.fill();
             ctx.shadowBlur = 0;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative py-24 bg-black overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(50,0,138,0.2),transparent_70%)]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Texto e Dados */}
          <div className="lg:w-1/3 order-2 lg:order-1">
             <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-allrah-main/10 border border-allrah-main/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-mono text-green-400 uppercase tracking-widest">Core Online</span>
             </div>
             
             <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
               O Núcleo <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-allrah-main to-purple-300">Neural</span>
             </h2>
             
             <p className="text-gray-400 mb-8 leading-relaxed">
               A visualização em tempo real do nosso modelo de Machine Learning. 
               Cada nó representa um ponto de decisão autônomo, aprendendo e evoluindo 
               com cada interação do seu negócio.
             </p>

             <div className="grid grid-cols-1 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-between group hover:border-allrah-main/50 transition-colors">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-allrah-main/20 rounded-lg text-allrah-main">
                        <Activity size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-mono uppercase">Precisão do Modelo</p>
                        <p className="text-xl font-bold text-white">{stats.accuracy}%</p>
                      </div>
                   </div>
                   <div className="w-16 h-1 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-allrah-main animate-pulse" style={{ width: `${stats.accuracy}%` }}></div>
                   </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-between group hover:border-allrah-main/50 transition-colors">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                        <Cpu size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-mono uppercase">Nós Ativos</p>
                        <p className="text-xl font-bold text-white">{stats.nodes.toLocaleString()}</p>
                      </div>
                   </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-between group hover:border-allrah-main/50 transition-colors">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                        <Database size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-mono uppercase">Latência Global</p>
                        <p className="text-xl font-bold text-white">{stats.latency}ms</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* 3D Visualization */}
          <div className="lg:w-2/3 w-full h-[500px] relative order-1 lg:order-2" ref={containerRef}>
             {/* HUD Elements */}
             <div className="absolute top-4 left-4 pointer-events-none z-20">
                <div className="text-[10px] font-mono text-allrah-main opacity-70">
                   SYS.MONITOR.V2<br/>
                   TARGET: NEURAL_GRID<br/>
                   COORDS: {stats.nodes * 21}X / 44Y
                </div>
             </div>
             <div className="absolute top-4 right-4 pointer-events-none z-20">
                <Brain className="w-6 h-6 text-allrah-main animate-pulse" />
             </div>
             <div className="absolute bottom-4 left-4 pointer-events-none z-20 flex gap-2">
                 <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                 <div className="w-2 h-2 bg-allrah-main rounded-full animate-bounce delay-75"></div>
                 <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-150"></div>
             </div>

             {/* The Canvas */}
             <canvas 
               ref={canvasRef} 
               className="w-full h-full rounded-3xl cursor-crosshair active:cursor-grabbing"
             />
             
             {/* Background Glow */}
             <div className="absolute inset-0 bg-allrah-main/5 blur-3xl rounded-full -z-10 pointer-events-none transform scale-75 animate-pulse-glow"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NeuralCore;