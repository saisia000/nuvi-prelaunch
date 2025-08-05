import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const taglines = [
  "Meet the world's first emotional OS for caregiving relationships",
  "For every task, every feeling, every day",
  "Support that listens before it suggests",
  "When AI can't help, we bring humans who can",
  "Real help—AI and human, in one place"
];

const RotatingTagline = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Start showing taglines immediately since parent motion handles the delay
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % taglines.length);
    }, 3000); // Slightly longer interval for better performance

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <div className="relative h-8 mb-2 text-center -mt-6">
      {isVisible && (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 text-2xl md:text-3xl lg:text-4xl text-black font-medium italic"
            style={{ 
              fontFamily: "'Dancing Script', cursive",
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
            }}
          >
            {taglines[currentIndex]}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default RotatingTagline;