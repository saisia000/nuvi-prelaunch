import { motion } from "framer-motion";

interface NuvoriLogoProps {
  onClick?: () => void;
}

const NuvoriLogo = ({ onClick }: NuvoriLogoProps) => {
  return (
    <motion.div
      className="mx-auto my-6 text-center cursor-pointer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        duration: 0.8, 
        ease: "easeOut",
        delay: 2
      }}
      onClick={onClick}
    >
      <motion.div
        className="text-6xl md:text-7xl lg:text-8xl font-bold text-black tracking-wide drop-shadow-2xl text-shadow"
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.3 }
        }}
      >
        <img 
          src="/lovable-uploads/29688816-6798-4637-9c6d-e984fd37f9b4.png" 
          alt="nuvori logo" 
          className="h-32 md:h-40 lg:h-48 w-auto mx-auto brightness-0"
          style={{
            filter: 'brightness(0) drop-shadow(0 4px 15px rgba(0, 0, 0, 0.3))'
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default NuvoriLogo;