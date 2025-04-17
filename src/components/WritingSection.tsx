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
  const articleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-center space-x-4 mb-12">
        {icon}
        <h2 className="text-3xl font-serif">{title}</h2>
      </div>
      
      <div className="space-y-8">
        {writings.map((writing, index) => (
          <motion.article
            key={index}
            className={`p-8 rounded-lg border ${accentColors[accent]} backdrop-blur-sm`}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={articleVariants}
          >
            {writing.title && (
              <h3 className="text-2xl font-serif mb-4">{writing.title}</h3>
            )}
            <div className="prose prose-invert max-w-none whitespace-pre-line leading-relaxed">
              {writing.content}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default WritingSection;