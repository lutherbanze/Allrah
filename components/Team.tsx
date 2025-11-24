import React from 'react';
import { Linkedin, Twitter, Instagram, Github, Globe } from 'lucide-react';

interface SocialLink {
  icon: React.ElementType;
  href: string;
  label: string;
}

interface TeamMemberProps {
  name: string;
  role: string;
  initials: string;
  delay: string;
  socials: SocialLink[];
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, initials, delay, socials }) => (
  <div 
    className="group relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-allrah-main/50 transition-all duration-500"
    style={{ animationDelay: delay }}
  >
    <div className="absolute inset-0 bg-allrah-main/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-2xl"></div>
    
    <div className="relative bg-[#0a051e] p-8 rounded-xl h-full flex flex-col items-center text-center border border-white/5 group-hover:border-allrah-main/30 backdrop-blur-md overflow-hidden">
      
      {/* Liquid background effect inside card */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/5 to-transparent opacity-50"></div>

      {/* Avatar/Placeholder */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-allrah-deep to-allrah-dark flex items-center justify-center border-2 border-white/10 shadow-[0_0_20px_rgba(106,0,255,0.3)] group-hover:shadow-[0_0_40px_rgba(106,0,255,0.6)] transition-all duration-500 z-10 relative">
          <span className="text-2xl font-black text-white">{initials}</span>
        </div>
        {/* Ring */}
        <div className="absolute -inset-2 rounded-full border border-allrah-main/30 border-dashed animate-spin-slow"></div>
      </div>

      <h4 className="text-xl font-bold text-white mb-1 group-hover:text-allrah-light transition-colors">{name}</h4>
      <p className="text-allrah-main text-sm font-semibold tracking-wide uppercase mb-6">{role}</p>
      
      <div className="flex gap-4 mt-auto opacity-60 group-hover:opacity-100 transition-opacity justify-center flex-wrap">
        {socials.map((social, idx) => (
          <a 
            key={idx}
            href={social.href}
            target={social.href.startsWith('http') ? '_blank' : undefined}
            rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            title={social.label}
            className="p-2 rounded-lg bg-white/5 hover:bg-allrah-main hover:text-white transition-all text-gray-400"
          >
              <social.icon size={18} />
          </a>
        ))}
      </div>
    </div>
  </div>
);

const Team: React.FC = () => {
  const team = [
    { 
      name: "Luther Banze", 
      role: "CEO & Founder", 
      initials: "LB",
      socials: [
        { icon: Linkedin, href: "#", label: "LinkedIn" },
        { icon: Instagram, href: "#", label: "Instagram" },
        { icon: Twitter, href: "#", label: "X" },
        { icon: Github, href: "#", label: "GitHub" },
        { icon: Globe, href: "https://lutherbanze.com", label: "Portfolio" }
      ]
    },
    { 
      name: "Arshad Ibrahimo", 
      role: "Co-Founder", 
      initials: "AI",
      socials: [
        { icon: Linkedin, href: "#", label: "LinkedIn" },
        { icon: Instagram, href: "#", label: "Instagram" },
        { icon: Globe, href: "https://arshadibrahimo.com", label: "Website" }
      ]
    },
    { 
      name: "Fadhil Teixeira", 
      role: "Head of AI", 
      initials: "FT",
      socials: [
        { icon: Linkedin, href: "#", label: "LinkedIn" },
        { icon: Instagram, href: "#", label: "Instagram" }
      ]
    },
  ];

  return (
    <section id="team" className="py-24 relative bg-allrah-dark overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(106,0,255,0.15)_0%,rgba(0,0,0,0)_60%)]"></div>
        
        <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
                <h2 className="text-sm font-bold text-allrah-main tracking-[0.2em] uppercase mb-4">
                    Visionários
                </h2>
                <h3 className="text-3xl md:text-5xl font-black text-white">
                    Mentes por trás da <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-gray-400">Inovação</span>
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {team.map((member, idx) => (
                    <TeamMember 
                        key={idx}
                        {...member}
                        delay={`${idx * 150}ms`}
                    />
                ))}
            </div>
        </div>
    </section>
  );
};

export default Team;