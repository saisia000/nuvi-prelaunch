import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";

interface CollaboratorData {
  name: string;
  organization: string;
  role: string;
  collaboration: string;
  email: string;
}

const CollaboratorForm = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState<CollaboratorData>({
    name: "",
    organization: "",
    role: "",
    collaboration: "",
    email: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Submit to Supabase
      const { data, error } = await supabase
        .from('collaborator_submissions')
        .insert([formData]);

      if (error) {
        console.error("Collaborator submission failed:", error);
        toast({
          title: "Submission Failed",
          description: "There was an error submitting your information. Please try again.",
          variant: "destructive",
        });
        return;
      }

      console.log("Collaborator form submitted successfully:", data);
      setIsSubmitted(true);
      
      // Trigger confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (error) {
      console.error("Collaborator submission error:", error);
      toast({
        title: "Submission Failed",
        description: "There was an unexpected error. Please try again.",
        variant: "destructive",
      });
    }
  };

  const updateFormData = (field: keyof CollaboratorData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 max-w-md mx-auto"
      >
        <div className="text-4xl">🤝</div>
        <h3 className="text-xl font-semibold">Thank you for your interest!</h3>
        <p className="text-muted-foreground">
          We're excited about the possibility of collaborating with you. Our team will review your information and get back to you within 2-3 business days.
        </p>
        <Button onClick={onClose} variant="outline" className="mt-6">
          Return to Home
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-lg mx-auto"
    >
      <Card className="border-secondary/30 shadow-lg shadow-secondary/10">
        <CardHeader className="text-center">
          <CardTitle className="text-secondary-foreground">Collaborate to Transform Care</CardTitle>
          <CardDescription>
            Are you a provider, nonprofit, or innovator? Let's co-create seamless AI and human support for caregivers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="collaborator-name" className="text-sm font-medium">Name</Label>
              <Input
                id="collaborator-name"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
                className="mt-1"
                placeholder="Your full name"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="organization" className="text-sm font-medium">Organization</Label>
              <Input
                id="organization"
                value={formData.organization}
                onChange={(e) => updateFormData("organization", e.target.value)}
                className="mt-1"
                placeholder="Company, nonprofit, or institution"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="role" className="text-sm font-medium">Your Role</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => updateFormData("role", e.target.value)}
                className="mt-1"
                placeholder="e.g., CEO, Program Director, Researcher"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="collaboration" className="text-sm font-medium">
                How would you like to collaborate?
              </Label>
              <Textarea
                id="collaboration"
                value={formData.collaboration}
                onChange={(e) => updateFormData("collaboration", e.target.value)}
                className="mt-1 min-h-24"
                placeholder="Tell us about your interest in partnering with Nuvori. Are you interested in pilots, API integration, co-research, or something else?"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="collaborator-email" className="text-sm font-medium">Email</Label>
              <Input
                id="collaborator-email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                className="mt-1"
                placeholder="your@email.com"
                required
              />
            </div>
            
            <div className="space-y-4 pt-4">
              <div className="text-center">
                <h4 className="font-medium mb-2">Partnership Opportunities</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Pilot programs with your organization</li>
                  <li>• API integration for seamless care coordination</li>
                  <li>• Co-research on caregiver support effectiveness</li>
                  <li>• White-label solutions for your community</li>
                  <li>• Joint grant applications and funding opportunities</li>
                </ul>
              </div>
              
              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  Let's Talk Collaboration
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CollaboratorForm;