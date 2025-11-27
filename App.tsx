import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import InteractivePreview from './components/InteractivePreview';
import NeuralCore from './components/NeuralCore';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import Revolution from './components/Revolution';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'revolution'>('landing');

  if (view === 'revolution') {
    return <Revolution onBack={() => setView('landing')} />;
  }

  return (
    <div className="bg-allrah-dark min-h-screen text-white selection:bg-allrah-main selection:text-white font-sans overflow-x-hidden">
      <Navbar />
      <main>
        <Hero onStartRevolution={() => setView('revolution')} />
        <Features />
        <InteractivePreview />
        <NeuralCore />
        <Team />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default App;