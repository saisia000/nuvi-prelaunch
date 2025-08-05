import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import AnimatedBackground from "@/components/AnimatedBackground";
import NuvoriLogo from "@/components/NuvoriLogo";
import RotatingTagline from "@/components/RotatingTagline";
import CaregiverSurvey from "@/components/CaregiverSurvey";
import CollaboratorForm from "@/components/CollaboratorForm";
import { trackEvent } from "@/lib/supabase";

type ViewType = "home" | "selection" | "caregiver" | "collaborator";

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>("home");

  const handleViewChange = (view: ViewType) => {
    // Track navigation events
    trackEvent('navigation_click', {
      from: currentView,
      to: view,
      source: 'main_page'
    });
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-1 px-4 py-8">
          <AnimatePresence mode="wait">
            {currentView === "home" && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto text-center"
              >
                {/* Hero Section */}
                <div className="mb-24 pt-12 md:pt-20">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-tight text-black px-4 text-center"
                    style={{
                      textShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 8px 30px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    No one built AI for caregivers
                  </motion.h1>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-tight px-4 text-center"
                  >
                    <span className="text-black font-bold" style={{
                      textShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 8px 30px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.2)'
                    }}>
                      So we're building one that truly understands
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <NuvoriLogo onClick={() => handleViewChange("home")} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                  >
                    <RotatingTagline />
                  </motion.div>
                </div>

                {/* CTA 1 - After rotating taglines */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                  className="text-center mb-2 px-4"
                >
                  <div className="mb-4">
                    <h2 className="text-lg md:text-xl font-semibold text-black mb-2" style={{
                      textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
                    }}>
                      We're building this with caregivers, not just for them.
                    </h2>
                    <p className="text-sm md:text-base text-black/80 mb-2" style={{
                      textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
                    }}>
                      💬 This survey is designed for caregivers, but care recipients are welcome to share too.
                    </p>
                    <p className="text-sm md:text-base text-black/80 mb-2" style={{
                      textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
                    }}>
                      We'll ask you about your caregiving experience, emotional needs, and preferences for support — no technical knowledge needed.
                    </p>
                    <p className="text-xs md:text-sm text-black/60 mb-4">
                      "I'm so exhausted, I just want something that understands how hard this is." – Cancer caregiver
                    </p>
                  </div>
                  <Button
                    onClick={() => handleViewChange("selection")}
                    size="lg"
                    className="bg-[#D4A5A5] hover:bg-[#C89595] text-black px-8 md:px-12 py-4 md:py-6 rounded-full text-lg md:text-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-black/20 mb-2"
                  >
                    Share Your Voice
                    <span className="text-sm ml-2 opacity-75">(2 minutes)</span>
                  </Button>
                  <p className="text-xs text-black/60 mt-2">
                    🛡️ Your responses are anonymous. We never sell your data.
                  </p>
                </motion.div>

                {/* Visual anchor and main illustration */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1.0 }}
                  className="mt-12 md:mt-16 lg:mt-20 max-w-4xl mx-auto px-4"
                >
                  {/* Visual anchor heading */}
                  <div className="text-center mb-8">
                    <h3 className="text-xl md:text-2xl font-bold text-black mb-4" style={{
                      textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
                    }}>
                      💡 How Nuvori Works
                    </h3>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-[#D4A5A5] to-[#C89595] mx-auto"></div>
                  </div>

                  <img
                    src="/lovable-uploads/86c30b9d-a096-4605-9a2a-309d404907e6.png"
                    alt="AI and human coordination illustration showing caregiving support"
                    className="w-full max-w-3xl mx-auto object-contain"
                    loading="lazy"
                  />
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1.2 }}
                  className="text-center mb-16 px-4 mt-8 md:mt-10"
                >
                  <Button
                    onClick={() => handleViewChange("selection")}
                    size="lg"
                    className="bg-[#D4A5A5] hover:bg-[#C89595] text-black px-8 md:px-12 py-4 md:py-6 rounded-full text-lg md:text-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-black/20 mb-2"
                  >
                    Share Your Voice
                    <span className="text-sm ml-2 opacity-75">(2 minutes)</span>
                  </Button>
                  <p className="text-xs text-black/60 mt-2">
                    🛡️ Your responses are anonymous. We never sell your data.
                  </p>
                </motion.div>


                {/* Privacy Statement Widget */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1.8 }}
                  className="max-w-4xl mx-auto mb-12 px-4 mt-12 md:mt-16 lg:mt-20"
                >
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 md:p-6 shadow-lg">
                    <p className="text-center text-sm md:text-lg lg:text-xl leading-relaxed text-black"
                      style={{
                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
                      }}>
                      <span className="font-bold">Your privacy is our utmost priority.</span> All your data is securely encrypted and will <span className="font-bold">NEVER</span> be sold to third parties or government entities. We use your data solely to improve your personalized nuvori experience.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {currentView === "selection" && (
              <motion.div
                key="selection"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="pt-24"
              >
                <div className="max-w-2xl mx-auto text-center">
                  {/* Back Button */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8 text-left"
                  >
                    <Button
                      onClick={() => handleViewChange("home")}
                      variant="ghost"
                      className="text-black hover:bg-white/10 px-4 py-2"
                    >
                      ← Back to Home
                    </Button>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-4xl font-bold mb-8 text-black"
                    style={{
                      textShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 8px 30px rgba(0, 0, 0, 0.3), 0 0 40px hsl(var(--primary) / 0.3)'
                    }}
                  >
                    How would you like to join nuvori?
                  </motion.h2>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                  >
                    <Button
                      onClick={() => handleViewChange("caregiver")}
                      size="lg"
                      className="w-full max-w-md bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      I'm a Caregiver
                    </Button>

                    <Button
                      onClick={() => handleViewChange("collaborator")}
                      variant="secondary"
                      size="lg"
                      className="w-full max-w-md bg-secondary hover:bg-secondary/90 text-black px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      I'm a Collaborator/Partner
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {currentView === "caregiver" && (
              <motion.div
                key="caregiver"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="pt-24"
              >
                <CaregiverSurvey onClose={() => handleViewChange("selection")} />
              </motion.div>
            )}

            {currentView === "collaborator" && (
              <motion.div
                key="collaborator"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="pt-24"
              >
                <CollaboratorForm onClose={() => handleViewChange("selection")} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="py-8 px-4 text-sm text-muted-foreground backdrop-blur-sm"
        >
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-center sm:text-left">
              <p className="mb-2">
                Your information is never sold or shared. All responses are confidential.
              </p>
              <p>
                ©2025 nuvori.ai product of SANJEEVANIAI LLC
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 text-center sm:text-right">
              <a
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-conditions"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Terms and Conditions
              </a>
              <a
                href="/consumer-data-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Consumer Data Policy
              </a>
            </div>
          </div>

          {/* Team signature - very bottom */}
          <div className="mt-8 text-center border-t border-white/10 pt-6">
            <p className="text-xs text-muted-foreground">
              With heart,<br />
              — The Nuvori Team<br />
              (fellow caregivers, engineers, and humans who care)
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;