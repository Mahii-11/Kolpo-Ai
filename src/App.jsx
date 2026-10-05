import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Industries from './components/Industries';
import HowItWorks from './components/HowItWorks';
import CreativeStudio from './components/CreativeStudio';
import Capabilities from './components/Capabilities';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import DemoModal from './components/DemoModal';

export default function App() {
  const [lang, setLang] = useState('en');
  const [selectedIndustryId, setSelectedIndustryId] = useState('university');
  const [modalState, setModalState] = useState(null);

  const handleOpenDemo = (industryId = 'university') => {
    setSelectedIndustryId(industryId);
    setModalState({ mode: 'demo', industryId });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0B1120] selection:bg-indigo-600 selection:text-white">
      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenModal={(config) => setModalState(config)}
      />

      <main className="flex-1">
        <Hero
          lang={lang}
          setLang={setLang}
          selectedIndustryId={selectedIndustryId}
          onSelectIndustry={setSelectedIndustryId}
          onOpenDemo={handleOpenDemo}
        />

        <Stats lang={lang} />

        <Industries
          lang={lang}
          onOpenDemo={handleOpenDemo}
        />

        <HowItWorks
          lang={lang}
          onOpenModal={(config) => setModalState(config)}
        />

        {/* Creative AI Studio with Modern 3D Auto Slider in Image Generation */}
        <CreativeStudio
          lang={lang}
          onOpenModal={(config) => setModalState(config)}
        />

        <Capabilities
          lang={lang}
          onOpenModal={(config) => setModalState(config)}
        />

        <FinalCTA
          lang={lang}
          onOpenModal={(config) => setModalState(config)}
        />
      </main>

      <Footer
        lang={lang}
        setLang={setLang}
        onOpenDemo={handleOpenDemo}
      />

      <DemoModal
        modalState={modalState}
        onClose={() => setModalState(null)}
        lang={lang}
        setLang={setLang}
      />
    </div>
  );
}
