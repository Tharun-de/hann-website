import React, { useMemo, useState, useEffect } from 'react';
import { Feather, Heart, Siren as Fire, Star, Sparkles, BookOpen, Menu, X, Settings, Twitter, Instagram, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import WritingSection from './components/WritingSection';
import AdminPage from './components/AdminPage';
import { allWritings as importedWritings, WritingData } from './data/writings';

// Define available accent colors
export type AccentColor = 'rose' | 'purple' | 'blue' | 'red' | 'amber' | 'emerald';

export type SectionConfig = {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  iconClass: string;
  writingIds: string[];
  accent: AccentColor;
  navClass: string;
  bgClass: string;
  iconName: string;
};

// Helper to map icon names (strings) to actual components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  Heart,
  Star,
  Sparkles,
  Fire,
  Feather,
};

const defaultSections: SectionConfig[] = [
  {
    id: "reflections",
    title: "Reflections on Fiction",
    icon: BookOpen,
    iconClass: "text-emerald-400",
    writingIds: ["fictitiousDreams"],
    accent: "emerald",
    navClass: "hover:text-emerald-400", 
    bgClass: "bg-emerald-400",
    iconName: 'BookOpen',
  },
  {
    id: "love",
    title: "Love & Pain",
    icon: Heart,
    iconClass: "text-rose-400",
    writingIds: ["loveAndPain"],
    accent: "rose",
    navClass: "hover:text-rose-400", 
    bgClass: "bg-rose-400",
    iconName: 'Heart',
  },
  {
    id: "serendipity",
    title: "Cosmic Serendipity",
    icon: Star,
    iconClass: "text-purple-400",
    writingIds: ["cosmicSerendipity", "morphedLove"],
    accent: "purple",
    navClass: "hover:text-purple-400", 
    bgClass: "bg-purple-400",
    iconName: 'Star',
  },
  {
    id: "journey",
    title: "Inner Journeys",
    icon: Sparkles,
    iconClass: "text-amber-400",
    writingIds: [
      "ghostOfSpark",
      "calmInStorm",
      "loseToLove",
      "redemption",
      "loveAndPainWillCome",
      "killingMyFlesh"
    ],
    accent: "amber",
    navClass: "hover:text-amber-400", 
    bgClass: "bg-amber-400",
    iconName: 'Sparkles',
  },
  {
    id: "desire",
    title: "Passion & Desire",
    icon: Fire,
    iconClass: "text-red-400",
    writingIds: [
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
    bgClass: "bg-red-400",
    iconName: 'Fire',
  },
  {
    id: "power",
    title: "Feminine Power",
    icon: Feather,
    iconClass: "text-blue-400",
    writingIds: ["femininePower"],
    accent: "blue",
    navClass: "hover:text-blue-400", 
    bgClass: "bg-blue-400",
    iconName: 'Feather',
  },
];

// Helper function to normalize a single writing object
const normalizeWritingData = (writing: Partial<WritingData>): WritingData => {
  return {
    id: writing.id || Date.now().toString(),
    title: writing.title || '',
    content: writing.content || '',
    sectionId: writing.sectionId || undefined,
    mood: writing.mood || undefined,
    date: writing.date || undefined,
    likes: typeof writing.likes === 'number' ? writing.likes : 0,
  };
};

// Define a type for social links
export interface SocialLinks {
  twitter: string;
  instagram: string;
  snapchat: string;
}

function App() {
  // State for mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // State for writings that can be modified (with localStorage persistence)
  const [writings, setWritings] = useState<WritingData[]>(() => {
    const savedWritingsJson = localStorage.getItem('writings');
    // Normalize importedWritings (defaults) first
    let writingsToLoad: WritingData[] = importedWritings.map(w => normalizeWritingData(w as Partial<WritingData>));

    if (savedWritingsJson) {
      try {
        // Cast parsed JSON to Partial<WritingData>[] as we expect an array of poem-like objects
        const parsedWritings = JSON.parse(savedWritingsJson) as Partial<WritingData>[];
        if (Array.isArray(parsedWritings)) {
          const normalizedParsedWritings = parsedWritings.map(normalizeWritingData);

          if (normalizedParsedWritings.length === 0 && writingsToLoad.length > 0) {
            // localStorage is empty, defaults are not. Keep defaults.
          } else {
            // Prefer localStorage if it has content, or if defaults were also empty.
            writingsToLoad = normalizedParsedWritings;
          }
        }
      } catch (error) {
        console.error("Error parsing or normalizing writings from localStorage, using default importedWritings.", error);
        // writingsToLoad is already set to normalized defaults
      }
    }
    return writingsToLoad;
  });
  // State for admin route
  const [showAdmin, setShowAdmin] = useState(false);
  // State for main header (with localStorage persistence)
  const [mainHeader, setMainHeader] = useState(() =>
    localStorage.getItem('mainHeader') || 'Fictitious Scribbles'
  );
  // State for section configs (with localStorage persistence)
  const [sections, setSections] = useState<SectionConfig[]>(() => {
    const saved = localStorage.getItem('sections');
    if (saved) {
      // When parsing, expect iconName to be a string
      const parsedSections = JSON.parse(saved) as Array<Omit<SectionConfig, 'icon'> & { iconName: string }>;
      return parsedSections.map(section => ({
        ...section,
        icon: iconMap[section.iconName] || BookOpen, // Use section.iconName directly
      }));
    }
    // When using defaultSections, ensure iconName is present and icon component is assigned
    return defaultSections.map(s => ({
      ...s,
      icon: iconMap[s.iconName] || BookOpen, // Ensure icon is the component
    }));
  });

  // State for social media links (with localStorage persistence)
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(() => {
    const savedSocialLinks = localStorage.getItem('socialLinks');
    if (savedSocialLinks) {
      try {
        return JSON.parse(savedSocialLinks);
      } catch (error) {
        console.error("Error parsing socialLinks from localStorage, using defaults.", error);
        return { twitter: '', instagram: '', snapchat: '' };
      }
    }
    return { twitter: '', instagram: '', snapchat: '' };
  });

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('mainHeader', mainHeader);
  }, [mainHeader]);
  useEffect(() => {
    localStorage.setItem('sections', JSON.stringify(
      // When saving, ensure we are saving the iconName string from section.iconName
      sections.map(s => ({ ...s, icon: undefined, iconName: s.iconName }))
    ));
  }, [sections]);
  useEffect(() => {
    localStorage.setItem('writings', JSON.stringify(writings));
  }, [writings]);
  useEffect(() => {
    localStorage.setItem('socialLinks', JSON.stringify(socialLinks));
  }, [socialLinks]);

  // Group writings by their section ID for easier access
  const sectionsWithWritings = useMemo(() => {
    return sections.map(section => ({
      ...section,
      // Filter all writings to find those that belong to this section
      writings: writings.filter(writing => writing.sectionId === section.id)
    }));
  }, [writings, sections]);

  // Helper function to handle smooth scrolling and highlight
  const handlePoemLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string, poemId: string) => {
    event.preventDefault();
    const poemElement = document.getElementById(poemId);
    const sectionElement = document.getElementById(sectionId); // Still need section for highlight

    if (poemElement) {
      // Scroll the specific poem into view
      poemElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Highlight the containing section
      if (sectionElement) {
        sectionElement.classList.add('highlight-scroll-target');
        setTimeout(() => {
          sectionElement.classList.remove('highlight-scroll-target');
        }, 1500); 
      }
    } else if (sectionElement) {
      // Fallback: if poem element not found (shouldn't happen), scroll to section
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  // Function to handle clicks on links within the mobile menu
  const handleMobileLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); 
    const href = event.currentTarget.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    const targetPoemId = href.substring(1);
    
    // Find the section this poem belongs to
    let targetSectionId: string | null = null;
    for (const section of sectionsWithWritings) {
      if (section.writings.some(w => w.id === targetPoemId)) {
        targetSectionId = section.id;
        break;
      }
    }

    if (targetSectionId) {
      // Call the main handler with section and poem IDs
      handlePoemLinkClick(event, targetSectionId, targetPoemId);
    } else {
      // If it's not a poem link (e.g., a direct section link if added later)
      const targetElement = document.getElementById(targetPoemId); // targetPoemId is actually sectionId here
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Admin Button */}
      <button
        onClick={() => setShowAdmin(true)}
        className="fixed bottom-4 right-4 p-3 bg-gray-800 hover:bg-gray-700 rounded-full shadow-lg transition-colors z-50"
        title="Admin Panel"
      >
        <Settings size={24} />
      </button>

      {/* Admin Page */}
      {showAdmin && (
        <AdminPage
          writings={writings}
          onUpdateWritings={setWritings}
          mainHeader={mainHeader}
          setMainHeader={setMainHeader}
          sections={sections}
          setSections={setSections}
          iconMap={iconMap}
          socialLinks={socialLinks}
          setSocialLinks={setSocialLinks}
        />
      )}

      {/* Main Content */}
      {!showAdmin && (
        <>
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
                {mainHeader}
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
          <nav className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 z-40">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
              
              {/* Logo/Title (Optional) - Could add one here */} 
              <div className="text-lg font-semibold">{mainHeader}</div>
              
              {/* Desktop Navigation (Hidden on Mobile) */}
              <div className="hidden md:flex items-center justify-center space-x-6 flex-wrap">
                {sectionsWithWritings.map((section) => (
                  <div key={section.id} className="relative group my-1">
                    {/* Main Category Link */}
                    <a 
                      href={`#${section.id}`} 
                      className={`relative flex items-center space-x-2 ${section.navClass} transition-colors pb-1`}
                    >
                      <section.icon className={section.iconClass} />
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
                                   transform-gpu origin-top z-50"
                      >
                        <div className="flex flex-col space-y-2">
                          {section.writings.map((writing) => (
                            <a 
                              key={writing.id || writing.title}
                              href={`#${writing.id}`}
                              onClick={(e) => handlePoemLinkClick(e, section.id, writing.id || '')}
                              className={`block text-sm text-gray-300 hover:text-white hover:${section.iconClass} transition-colors whitespace-nowrap`}
                              title={writing.title}
                            >
                              {writing.title || 'Untitled'}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
    
              {/* Mobile Menu Button (Hidden on Medium+ Screens) */}
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
              className="fixed inset-0 bg-gray-900/95 backdrop-blur-sm z-50 p-6 md:hidden overflow-y-auto"
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
                      <section.icon className={section.iconClass} />
                      <span>{section.title}</span>
                    </a>
                    {/* Poem Links (If any) */}
                    {section.writings && section.writings.length > 0 && (
                      <div className="mt-2 pl-8 space-y-2 border-l border-gray-700 ml-4">
                        {section.writings.map((writing) => (
                          <a 
                            key={writing.id || writing.title}
                            href={`#${writing.id}`}
                            onClick={handleMobileLinkClick}
                            className={`block text-base text-gray-400 hover:text-gray-100 hover:${section.iconClass} transition-colors py-1 pl-6`}
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

          {/* Main Content */}
          <main className="max-w-4xl mx-auto px-4 py-12">
            {sectionsWithWritings.map((section) => (
              <WritingSection
                key={section.id}
                id={section.id}
                title={section.title}
                icon={<section.icon className={section.iconClass} />}
                writings={section.writings}
                accent={section.accent}
              />
            ))}
          </main>
        </>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-400">
          <p className="font-serif italic mb-4">
            "In the depth of winter, I finally learned that within me there lay an invincible summer."
            <br />
            — Albert Camus
          </p>
          <div className="flex justify-center space-x-6 mb-4">
            {socialLinks.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={24} />
              </a>
            )}
            {socialLinks.instagram && (
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors" aria-label="Instagram">
                <Instagram size={24} />
              </a>
            )}
            {socialLinks.snapchat && (
              <a href={socialLinks.snapchat} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-400 transition-colors" aria-label="Snapchat">
                <MessageSquare size={24} /> {/* Placeholder for Snapchat */}
              </a>
            )}
          </div>
          <p className="text-sm text-gray-500">
            Penned by Yancey
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;