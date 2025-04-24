import React, { useMemo, useState } from 'react';
import { Feather, Heart, Siren as Fire, Star, Sparkles, BookOpen, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import WritingSection from './components/WritingSection';
import { allWritings as importedWritings, WritingData } from './data/writings';

// Explicitly type the imported data
const allWritings: WritingData[] = importedWritings;

// Define available accent colors (mirroring what was in WritingSection)
const accentColorKeys = ['rose', 'purple', 'blue', 'red', 'amber', 'emerald'] as const;
type AccentColor = typeof accentColorKeys[number];

// Define section configurations
const sectionConfigs = [
  {
    id: "reflections",
    title: "Reflections on Fiction",
    icon: BookOpen,
    iconClass: "text-emerald-400",
    writingIds: ["fictitiousDreams"], // Use writing IDs
    accent: "emerald",
    navClass: "hover:text-emerald-400", 
    bgClass: "bg-emerald-400"
  },
  {
    id: "love",
    title: "Love & Pain",
    icon: Heart,
    iconClass: "text-rose-400",
    writingIds: ["loveAndPain"], // Use writing IDs
    accent: "rose",
    navClass: "hover:text-rose-400", 
    bgClass: "bg-rose-400"
  },
  {
    id: "serendipity",
    title: "Cosmic Serendipity",
    icon: Star,
    iconClass: "text-purple-400",
    writingIds: ["cosmicSerendipity", "morphedLove"], // Use writing IDs
    accent: "purple",
    navClass: "hover:text-purple-400", 
    bgClass: "bg-purple-400"
  },
  {
    id: "journey",
    title: "Inner Journeys",
    icon: Sparkles,
    iconClass: "text-amber-400",
    writingIds: [ // Use writing IDs
      "ghostOfSpark",
      "calmInStorm",
      "loseToLove",
      "redemption",
      "loveAndPainWillCome",
      "killingMyFlesh"
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
    writingIds: [ // Use writing IDs
      "hellsFury",
      "yearning",
      "fireAndIce",
      "fickleHeart",
      "oneNight",
      "unquenchedFire",
      "poisonedSanctuary"
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
    writingIds: ["femininePower"], // Use writing IDs
    accent: "blue",
    navClass: "hover:text-blue-400", 
    bgClass: "bg-blue-400"
  },
];

function App() {
  // State for mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Group writings by their section ID for easier access
  const sectionsWithWritings = useMemo(() => {
    const writingsById = allWritings.reduce((acc, writing) => {
      acc[writing.id] = writing;
      return acc;
    }, {} as Record<string, WritingData>);

    return sectionConfigs.map(config => ({
      ...config,
      writings: config.writingIds.map(id => writingsById[id]).filter(w => w) // Map IDs to WritingData objects
    }));
  }, []);

  // Function to handle poem link clicks and apply highlight
  const handlePoemLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const href = event.currentTarget.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.classList.add('highlight-scroll-target');
      
      // Remove the highlight class after a short duration
      setTimeout(() => {
        targetElement.classList.remove('highlight-scroll-target');
      }, 1500); // Highlight duration: 1.5 seconds
    }
    
    // Note: We don't prevent default behavior here because 
    // `scroll-behavior: smooth` handles the scrolling.
  };

  // Function to handle clicks on links within the mobile menu
  const handleMobileLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setIsMobileMenuOpen(false); // Close the menu first
    
    const href = event.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        // Check if it's a poem ID by seeing if it exists in the original writings data
        const isPoemLink = allWritings.some(w => w.id === targetId);
        if (isPoemLink) {
            // If it's a poem link, trigger the highlight effect
            handlePoemLinkClick(event);
        } else {
             // If it's a section link, the smooth scroll handles it.
             // We might need to manually scroll if smooth behavior isn't enough,
             // but let's rely on CSS first.
        }
    }
  };

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

      {/* Navigation Bar */}
      <nav className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 z-40"> {/* Lower z-index than mobile menu */}
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between"> {/* Fixed height and justify-between */} 
          
          {/* Logo/Title (Optional) - Could add one here */} 
          <div className="text-lg font-semibold">Fictitious Scribbles</div>
          
          {/* Desktop Navigation (Hidden on Mobile) */}
          <div className="hidden md:flex items-center justify-center space-x-6 flex-wrap">
            {sectionsWithWritings.map((section) => (
              <div key={section.id} className="relative group my-1"> 
                {/* Main Category Link */}
                <a 
                  href={`#${section.id}`} 
                  className={`relative flex items-center space-x-2 ${section.navClass} transition-colors pb-1`} 
                >
                  <section.icon size={18} />
                  <span>{section.title}</span>
                  {/* Underline animation */}
                  <motion.div
                    className={`absolute bottom-[-2px] left-0 right-0 h-[2px] ${section.bgClass}`}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }} 
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{ transformOrigin: 'left' }} 
                  />
                </a>
                
                {/* Poem Sub-links Dropdown (only if poems exist) */}
                {section.writings && section.writings.length > 0 && (
                  <div 
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max max-w-xs p-3 
                               bg-gray-800/90 backdrop-blur-sm rounded-md shadow-lg 
                               opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                               transition-all duration-200 ease-out scale-95 group-hover:scale-100
                               transform-gpu origin-top z-50" // Ensure dropdown is on top
                  >
                    <div className="flex flex-col space-y-2">
                      {section.writings.map((writing) => (
                        <a 
                          key={writing.id}
                          href={`#${writing.id}`} // Link to the poem's ID
                          onClick={handlePoemLinkClick} // <-- Add the click handler here
                          className={`block text-sm text-gray-300 hover:text-white hover:${section.iconClass} transition-colors whitespace-nowrap`}
                          title={writing.title} // Add tooltip
                        >
                          {writing.title || 'Untitled'} {/* Display poem title */}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button (Visible on Mobile) */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-label="Open main menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay (Conditionally Rendered) */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 bg-gray-900/95 backdrop-blur-sm z-50 p-6 md:hidden overflow-y-auto" // High z-index, padding, hide on md+, scroll
        >
          {/* Close Button */}
          <div className="flex justify-end mb-6">
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-label="Close main menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex flex-col space-y-6">
            {sectionsWithWritings.map((section) => (
              <div key={`${section.id}-mobile`}>
                {/* Section Link */}
                <a 
                  href={`#${section.id}`}
                  onClick={handleMobileLinkClick}
                  className={`flex items-center space-x-3 p-2 rounded-md text-lg font-semibold ${section.navClass} transition-colors`}
                >
                  <section.icon size={20} />
                  <span>{section.title}</span>
                </a>
                {/* Poem Links (If any) */}
                {section.writings && section.writings.length > 0 && (
                  <div className="mt-2 pl-8 space-y-2 border-l border-gray-700 ml-4">
                    {section.writings.map((writing) => (
                      <a 
                        key={writing.id}
                        href={`#${writing.id}`}
                        onClick={handleMobileLinkClick}
                        className={`block text-base text-gray-400 hover:text-gray-100 hover:${section.iconClass} transition-colors py-1`}
                        title={writing.title}
                      >
                        {writing.title || 'Untitled'}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </motion.div>
      )}

      {/* Content Sections - Map from sections array */}
      <main className="max-w-4xl mx-auto px-4 py-16 space-y-32">
        {sectionsWithWritings.map((section) => { // Use the processed sections data
          return (
            <WritingSection
              key={section.id}
              id={section.id} // Section ID
              title={section.title}
              icon={<section.icon className={section.iconClass} />}
              writings={section.writings} // Pass the pre-filtered writings
              accent={section.accent as AccentColor} // Keep type assertion or refine if needed
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