import React from 'react';
import { motion } from 'framer-motion';

interface Writing {
  title?: string;
  content: string;
}

const accentColors = {
  rose: 'bg-rose-400/10 border-rose-400/20',
  purple: 'bg-purple-400/10 border-purple-400/20',
  blue: 'bg-blue-400/10 border-blue-400/20',
  red: 'bg-red-400/10 border-red-400/20',
  amber: 'bg-amber-400/10 border-amber-400/20',
  emerald: 'bg-emerald-400/10 border-emerald-400/20',
};

// Define a type for the accent keys
type AccentColor = keyof typeof accentColors;

interface WritingSectionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  writings: Writing[];
  accent: AccentColor; // Use the specific type here
}

function WritingSection({ id, title, icon, writings, accent }: WritingSectionProps) {
  const sectionTitleVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };
  
  const articleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15, // Slightly increase stagger delay between articles
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const articleContentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.5, ease: "easeIn" }
    },
  };

  return (
    <section id={id} className="scroll-mt-24">
      {/* Animate the section title block */}
      <motion.div 
        className="flex items-center space-x-4 mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // Trigger when 30% visible
        variants={sectionTitleVariants}
      >
        {icon}
        <h2 className="text-3xl font-serif">{title}</h2>
      </motion.div>
      
      <div className="space-y-8">
        {writings.map((writing, index) => (
          <motion.article
            key={index}
            className={`p-8 rounded-lg border ${accentColors[accent]} backdrop-blur-sm overflow-hidden`} // Added overflow-hidden
            custom={index} // Pass index for stagger between articles
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={articleVariants} 
          >
            {/* Stagger title within article */}
            {writing.title && (
              <motion.h3 
                className="text-2xl font-serif mb-4"
                initial="hidden"
                animate="visible" // Use animate here since parent triggers whileInView
                variants={articleContentVariants} 
                transition={{ delay: 0.1 }} // Delay after card appears
              >
                {writing.title}
              </motion.h3>
            )}
            {/* Stagger content div within article */}
            <motion.div 
              className="prose prose-invert max-w-none whitespace-pre-line leading-relaxed"
              initial="hidden"
              animate="visible" // Use animate here
              variants={articleContentVariants}
              transition={{ delay: writing.title ? 0.2 : 0.1 }} // Delay more if title exists
            >
              {writing.content}
            </motion.div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default WritingSection;