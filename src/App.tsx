import React from 'react';
import { Feather, Heart, Siren as Fire, Star, Sparkles, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import WritingSection from './components/WritingSection';
import { allWritings as importedWritings, WritingData } from './data/writings';

// Explicitly type the imported data
const allWritings: WritingData[] = importedWritings;

// Define section configurations using titles for filtering
const sections = [
  {
    id: "reflections",
    title: "Reflections on Fiction",
    icon: BookOpen,
    iconClass: "text-emerald-400",
    writingTitles: ["Fictitious Dreams"],
    accent: "emerald",
    navClass: "hover:text-emerald-400", 
    bgClass: "bg-emerald-400"
  },
  {
    id: "love",
    title: "Love & Pain",
    icon: Heart,
    iconClass: "text-rose-400",
    writingTitles: ["Love and Pain"],
    accent: "rose",
    navClass: "hover:text-rose-400", 
    bgClass: "bg-rose-400"
  },
  {
    id: "serendipity",
    title: "Cosmic Serendipity",
    icon: Star,
    iconClass: "text-purple-400",
    writingTitles: ["Cosmic Serendipity", "Morphed Love"],
    accent: "purple",
    navClass: "hover:text-purple-400", 
    bgClass: "bg-purple-400"
  },
  {
    id: "journey",
    title: "Inner Journeys",
    icon: Sparkles,
    iconClass: "text-amber-400",
    writingTitles: [
      "Ghost of a Spark",
      "The Calm in the Storm",
      "Lose You to Love Me",
      "Redemption from Reverie",
      "Love Will Come and So Will Pain",
      "Killing My Flesh"
    ],
    accent: "amber",
    navClass: "hover:text-amber-400", 
    bgClass: "bg-amber-400"
  },
  {
    id: "desire",
    title: "Passion & Desire",
    icon: Fire,
    iconClass: "text-red-400",
    writingTitles: [
      "Hell's Fury",
      "When My Yearning Found a Home",
      "The Song of Fire and Ice",
      "Fickle, Frail Heart",
      "One Night of Bliss",
      "Unquenched Fire",
      "Poisoned Sanctuary"
    ],
    accent: "red",
    navClass: "hover:text-red-400", 
    bgClass: "bg-red-400"
  },
    {
    id: "power",
    title: "Feminine Power",
    icon: Feather,
    iconClass: "text-blue-400",
    writingTitles: ["Feminine Power"],
    accent: "blue",
    navClass: "hover:text-blue-400", 
    bgClass: "bg-blue-400"
  },
];

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

      {/* Navigation - Map from sections array */}
      <nav className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-6 flex-wrap">
            {sections.map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`} 
                className={`relative flex items-center space-x-2 ${item.navClass} transition-colors my-1 group`} 
              >
                <item.icon size={18} />
                <span>{item.title}</span>
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

      {/* Content Sections - Map from sections array */}
      <main className="max-w-4xl mx-auto px-4 py-16 space-y-32">
        {sections.map((section) => {
          // Filter writings for the current section
          const sectionWritings = allWritings.filter(w => 
            w && section.writingTitles.includes(w.title || '') // Handle potentially undefined title
          );

          return (
            <WritingSection
              key={section.id}
              id={section.id}
              title={section.title}
              icon={<section.icon className={section.iconClass} />}
              // Pass the correctly typed and filtered array
              writings={sectionWritings}
              // Assert the accent type
              accent={section.accent as 'rose' | 'purple' | 'blue' | 'red' | 'amber' | 'emerald'}
            />
          );
        })}
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