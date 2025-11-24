import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import InteractivePreview from './components/InteractivePreview';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-allrah-dark min-h-screen text-white selection:bg-allrah-main selection:text-white font-sans overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <InteractivePreview />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;