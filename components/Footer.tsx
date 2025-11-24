import React from 'react';
import { Zap, Twitter, Linkedin, Github, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="bg-allrah-main p-1.5 rounded">
              <Zap className="text-white w-5 h-5" fill="white" />
            </div>
            <span className="text-xl font-mono font-bold tracking-tighter text-white">
              Allrah
            </span>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-allrah-main transition-colors" title="LinkedIn"><Linkedin size={20} /></a>
            <a href="#" className="text-gray-500 hover:text-allrah-main transition-colors" title="Instagram"><Instagram size={20} /></a>
            <a href="#" className="text-gray-500 hover:text-allrah-main transition-colors" title="X / Twitter"><Twitter size={20} /></a>
            <a href="#" className="text-gray-500 hover:text-allrah-main transition-colors" title="GitHub"><Github size={20} /></a>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Allrah Automation Technologies. Todos os direitos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-400">Privacidade</a>
            <a href="#" className="hover:text-gray-400">Termos</a>
            <a href="#" className="hover:text-gray-400">Segurança</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;