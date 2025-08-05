import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { trackEvent } from "@/lib/supabase";
import { WaitlistDialog } from "@/components/WaitlistDialog";

const Navbar = () => {
  const navigate = useNavigate();
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  const handleLogoClick = () => {
    trackEvent('navbar_logo_click', { source: 'navbar' });
    navigate('/');
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/20 border-b border-border/20"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <motion.button
          onClick={handleLogoClick}
          className="flex items-center cursor-pointer"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <img 
            src="/lovable-uploads/29688816-6798-4637-9c6d-e984fd37f9b4.png" 
            alt="nuvori logo" 
            className="h-16 w-auto brightness-0"
          />
        </motion.button>
        
        <motion.button
          onClick={() => {
            trackEvent('navbar_waitlist_click', { source: 'navbar' });
            window.open('https://calendly.com/sia-sanjeevaniai/30min', '_blank');
          }}
          className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl drop-shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Book a Call
        </motion.button>
      </div>
      
      <WaitlistDialog 
        open={waitlistOpen} 
        onOpenChange={setWaitlistOpen} 
      />
    </motion.nav>
  );
};

export default Navbar;