import React from 'react';
import { Feather, Heart, Siren as Fire, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import WritingSection from './components/WritingSection';
import { writings } from './data/writings';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 opacity-30"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1533134486753-c833f0ed4866?auto=format&fit=crop&q=80')"
          }}
        />
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            className="text-5xl md:text-7xl font-serif mb-6 text-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Fictitious Scribbles
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-2xl mx-auto text-gray-300 italic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            A sanctuary for poetry, prose, and the depths of human emotion
          </motion.p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-8">
            <a href="#love" className="flex items-center space-x-2 hover:text-rose-400 transition-colors">
              <Heart size={18} />
              <span>Love & Pain</span>
            </a>
            <a href="#serendipity" className="flex items-center space-x-2 hover:text-purple-400 transition-colors">
              <Star size={18} />
              <span>Serendipity</span>
            </a>
            <a href="#desire" className="flex items-center space-x-2 hover:text-red-400 transition-colors">
              <Fire size={18} />
              <span>Desire</span>
            </a>
            <a href="#power" className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
              <Feather size={18} />
              <span>Power</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Content Sections */}
      <main className="max-w-4xl mx-auto px-4 py-16 space-y-32">
        <WritingSection
          id="love"
          title="Love & Pain"
          icon={<Heart className="text-rose-400" />}
          writings={[writings.loveAndPain]}
          accent="rose"
        />

        <WritingSection
          id="serendipity"
          title="Cosmic Serendipity"
          icon={<Star className="text-purple-400" />}
          writings={[writings.cosmicSerendipity, writings.morphedLove]}
          accent="purple"
        />

        <WritingSection
          id="power"
          title="Feminine Power"
          icon={<Feather className="text-blue-400" />}
          writings={[writings.femininePower]}
          accent="blue"
        />

        <WritingSection
          id="desire"
          title="Passion & Desire"
          icon={<Fire className="text-red-400" />}
          writings={[
            writings.hellsFury,
            writings.yearning,
            writings.fireAndIce,
            writings.fickleHeart,
            writings.oneNight,
            writings.unquenchedFire
          ]}
          accent="red"
        />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-400">
          <p className="font-serif italic mb-4">
            "In the depth of winter, I finally learned that within me there lay an invincible summer."
            <br />
            — Albert Camus
          </p>
          <p className="text-sm text-gray-500">
            Penned by Yancey
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;