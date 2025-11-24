import React, { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Soluções', href: '#features' },
    { name: 'Tecnologia', href: '#tech' },
    { name: 'Equipe', href: '#team' },
    { name: 'Sobre', href: '#about' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 bg-allrah-dark/60 backdrop-blur-2xl border-b border-white/5 shadow-lg' : 'pt-14 pb-6 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center h-16 md:h-auto">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-allrah-main blur-lg opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-gradient-to-br from-allrah-main to-allrah-deep p-2 rounded-lg border border-white/20">
              <Zap className="text-white w-5 h-5" fill="white" />
            </div>
          </div>
          <span className="text-2xl font-black tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-allrah-light transition-all">
            Allrah
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-gray-300 hover:text-white font-medium transition-colors duration-200 text-xs tracking-widest uppercase hover:shadow-[0_2px_0_0_#6A00FF] pb-1"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact"
            className="px-6 py-2.5 bg-white/5 hover:bg-allrah-main/80 border border-allrah-main/50 hover:border-allrah-main text-white backdrop-blur-md transition-all duration-300 rounded-full font-bold text-xs tracking-wide shadow-[0_0_15px_rgba(106,0,255,0.15)] hover:shadow-[0_0_25px_rgba(106,0,255,0.5)]"
          >
            Fale Conosco
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-allrah-dark/95 backdrop-blur-3xl border-b border-white/10 p-6 flex flex-col gap-4 animate-fade-in shadow-2xl">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-gray-200 hover:text-allrah-main text-lg font-bold"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact"
            className="w-full text-center py-4 bg-allrah-main text-white rounded-xl font-bold mt-4 shadow-[0_0_20px_#6A00FF]"
            onClick={() => setIsOpen(false)}
          >
            Começar Agora
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;