import React from 'react';
import { Feather, Heart, Siren as Fire, Star, Sparkles, BookOpen } from 'lucide-react';
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
          <div className="flex items-center justify-center space-x-6 flex-wrap">
            {[
              { href: "#reflections", text: "Reflections", icon: BookOpen, hoverClass: "hover:text-emerald-400", bgClass: "bg-emerald-400" },
              { href: "#love", text: "Love & Pain", icon: Heart, hoverClass: "hover:text-rose-400", bgClass: "bg-rose-400" },
              { href: "#serendipity", text: "Serendipity", icon: Star, hoverClass: "hover:text-purple-400", bgClass: "bg-purple-400" },
              { href: "#journey", text: "Inner Journeys", icon: Sparkles, hoverClass: "hover:text-amber-400", bgClass: "bg-amber-400" },
              { href: "#desire", text: "Desire", icon: Fire, hoverClass: "hover:text-red-400", bgClass: "bg-red-400" },
              { href: "#power", text: "Power", icon: Feather, hoverClass: "hover:text-blue-400", bgClass: "bg-blue-400" },
            ].map((item) => (
              <a 
                key={item.href}
                href={item.href} 
                className={`relative flex items-center space-x-2 ${item.hoverClass} transition-colors my-1 group`}
              >
                <item.icon size={18} />
                <span>{item.text}</span>
                <motion.div
                  className={`absolute bottom-[-2px] left-0 right-0 h-[2px] ${item.bgClass}`}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{ transformOrigin: 'left' }}
                />
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Content Sections */}
      <main className="max-w-4xl mx-auto px-4 py-16 space-y-32">
        <WritingSection
          id="reflections"
          title="Reflections on Fiction"
          icon={<BookOpen className="text-emerald-400" />}
          writings={[writings.fictitiousDreams]}
          accent="emerald"
        />

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
          id="journey"
          title="Inner Journeys"
          icon={<Sparkles className="text-amber-400" />}
          writings={[
            writings.ghostOfSpark,
            writings.calmInStorm,
            writings.loseToLove,
            writings.redemption,
            writings.loveAndPainWillCome,
            writings.killingMyFlesh
          ]}
          accent="amber"
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
            writings.unquenchedFire,
            writings.poisonedSanctuary
          ]}
          accent="red"
        />

        <WritingSection
          id="power"
          title="Feminine Power"
          icon={<Feather className="text-blue-400" />}
          writings={[writings.femininePower]}
          accent="blue"
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