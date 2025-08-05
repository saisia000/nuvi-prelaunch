import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Declare window.rdt for TypeScript
declare global {
  interface Window {
    rdt?: (action: string, event?: string, data?: any) => void;
  }
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms to continue",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface WaitlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const WaitlistDialog: React.FC<WaitlistDialogProps> = ({ open, onOpenChange }) => {
  const [step, setStep] = useState<"form" | "thank-you">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Submit to Supabase
      const { error } = await supabase
        .from('signups')
        .insert([{
          name: data.name,
          email: data.email,
          source: 'waitlist'
        }]);

      if (error) {
        console.error('Error submitting to waitlist:', error);
        toast({
          title: "Submission Failed",
          description: "There was an error submitting your information. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Track Reddit Pixel signup conversion
      if (window.rdt) {
        window.rdt('track', 'Lead');
      }

      // Show thank you step
      setStep("thank-you");
      
      // Trigger gentle confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff6b9d', '#ffc93c', '#07beb8', '#3dccc7', '#68d8f0'],
        gravity: 0.8,
        decay: 0.9,
        startVelocity: 15
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Submission Failed",
        description: "There was an unexpected error. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep("form");
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {step === "form" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-semibold text-foreground">
                Join the Waitlist
              </DialogTitle>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                 <FormField
                   control={form.control}
                   name="email"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel>Email</FormLabel>
                       <FormControl>
                         <Input type="email" placeholder="your@email.com" {...field} />
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
                 
                 <FormField
                   control={form.control}
                   name="agreeToTerms"
                   render={({ field }) => (
                     <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                       <FormControl>
                         <Checkbox
                           checked={field.value}
                           onCheckedChange={field.onChange}
                         />
                       </FormControl>
                       <div className="space-y-1 leading-none">
                         <FormLabel className="text-sm">
                           By clicking "Submit", I agree to the terms set in Nuvori's{" "}
                           <a href="/privacy" className="text-primary hover:text-primary-light underline" target="_blank">
                             Privacy Policy
                           </a>
                           {" "}and{" "}
                           <a href="/terms" className="text-primary hover:text-primary-light underline" target="_blank">
                             Terms of Service
                           </a>.
                         </FormLabel>
                         <FormMessage />
                       </div>
                     </FormItem>
                   )}
                 />
                 
                 <div className="text-xs text-muted-foreground text-center">
                   This site is protected by reCAPTCHA and the Google{" "}
                   <a href="https://policies.google.com/privacy" className="text-primary hover:text-primary-light underline" target="_blank">
                     Privacy Policy
                   </a>
                   {" "}and{" "}
                   <a href="https://policies.google.com/terms" className="text-primary hover:text-primary-light underline" target="_blank">
                     Terms of Service
                   </a>
                   {" "}apply.
                 </div>
                 
                 <Button 
                   type="submit" 
                   className="w-full" 
                   disabled={isSubmitting}
                 >
                   {isSubmitting ? "Submitting..." : "Submit"}
                 </Button>
              </form>
            </Form>
          </>
        )}

        {step === "thank-you" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-6 py-4"
          >
            <motion.h2 
              className="text-3xl font-bold text-foreground mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Thank you, truly.
            </motion.h2>
            
            <motion.div 
              className="space-y-4 text-foreground/80 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p>
                Your words have been received with care — and held with deep respect.
              </p>
              
              <p>
                Every thought you shared helps us shape Nuvori into something more human, 
                more understanding, and more capable of easing the weight you carry.
              </p>
              
              <p>
                If you feel comfortable, we'd be honored to spend 20 quiet minutes with you — 
                just to hear more, learn deeper, and shape Nuvori more gently. It's not research. 
                It's a conversation.
              </p>
              
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <p className="text-sm">
                  💬 If you're open to sharing, you can choose a time here:
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open('https://calendly.com/nuvori-team', '_blank')}
                >
                  📅 Schedule a Conversation
                </Button>
              </div>
              
              <p className="text-sm">
                And if you shared your email, we'll stay gently in touch — only when it matters.
              </p>
              
              <p className="font-medium">
                In the meantime, we hope you take a moment just for yourself. 
                You deserve that pause. You always have. <span className="inline-block" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}>🤍</span>
              </p>
            </motion.div>
            
            <Button 
              onClick={handleClose}
              className="mt-6"
              variant="outline"
            >
              Close
            </Button>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
};