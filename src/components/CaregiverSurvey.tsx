import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import PhoneVerification from "@/components/PhoneVerification";
import { submitSurvey, trackEvent } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";

interface SurveyData {
  name: string;
  email: string;
  phoneNumber: string;
  country: string;
  state: string;
  zipcode: string;
  whoCaringFor: string[];
  otherWhoCaringFor: string;
  emotionalChallenges: string;
  whatWouldSupport: string;
  aiHelpfulSupport: string;
  aiComfort: string;
  humanServicesOpenness: string;
  communicationPreference: string[];
  otherCommunicationPreference: string;
  urgencyLevel: string;
  finalThoughts: string;
}

const CaregiverSurvey = ({ onClose }: { onClose: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showEmpathy, setShowEmpathy] = useState(false);
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const [verifiedUserId, setVerifiedUserId] = useState<string | null>(null);
  const { toast } = useToast();
  const [surveyData, setSurveyData] = useState<SurveyData>({
    name: "",
    email: "",
    phoneNumber: "",
    country: "",
    state: "",
    zipcode: "",
    whoCaringFor: [],
    otherWhoCaringFor: "",
    emotionalChallenges: "",
    whatWouldSupport: "",
    aiHelpfulSupport: "",
    aiComfort: "",
    humanServicesOpenness: "",
    communicationPreference: [],
    otherCommunicationPreference: "",
    urgencyLevel: "",
    finalThoughts: "",
  });


  // Content filtering function
  const checkInappropriateContent = (text: string): boolean => {
    const inappropriateWords = [
      'hate', 'stupid', 'idiot', 'dumb', 'retard', 'moron', 'fuck', 'shit', 'damn', 'hell',
      'bitch', 'asshole', 'bastard', 'crap', 'piss', 'suck', 'loser', 'worthless'
    ];

    const lowerText = text.toLowerCase();
    return inappropriateWords.some(word => lowerText.includes(word));
  };

  const handleNext = async () => {
    // Validate mandatory fields on first step
    if (currentStep === 0) {
      if (!surveyData.name || !surveyData.email || !surveyData.country) {
        alert("Please fill in all required fields: Name, Email, and Country");
        return;
      }

      // Validate state for US and India
      if ((surveyData.country === "United States" || surveyData.country === "India") && !surveyData.state) {
        alert("Please select your state");
        return;
      }

      // Validate email format with more strict requirements
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(surveyData.email)) {
        alert("Please enter a valid email address (e.g., john@example.com)");
        return;
      }

      // Additional validation: ensure domain has at least 2 characters before the TLD
      const emailParts = surveyData.email.split('@');
      if (emailParts.length === 2) {
        const domain = emailParts[1];
        const domainParts = domain.split('.');
        if (domainParts.length >= 2 && domainParts[0].length < 2) {
          alert("Please enter a valid email address with a proper domain (e.g., john@example.com)");
          return;
        }
      }

      // Validate phone number format (only if phone number is provided)
      if (surveyData.phoneNumber) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanPhone = surveyData.phoneNumber.replace(/[\s\-\(\)]/g, '');
        if (!phoneRegex.test(cleanPhone)) {
          alert("Please enter a valid phone number");
          return;
        }
      }

      // Validate zipcode format based on country (only if zipcode is provided)
      if (surveyData.zipcode) {
        if (surveyData.country === "United States" && !/^\d{5}(-\d{4})?$/.test(surveyData.zipcode)) {
          alert("Please enter a valid US ZIP code (e.g., 12345 or 12345-6789)");
          return;
        }
        if (surveyData.country === "Canada" && !/^[A-Z]\d[A-Z] \d[A-Z]\d$/.test(surveyData.zipcode.toUpperCase())) {
          alert("Please enter a valid Canadian postal code (e.g., K1A 0A6)");
          return;
        }
      }
    }

    // Validate step 1 - Who are you caring for
    if (currentStep === 1) {
      if (surveyData.whoCaringFor.length === 0) {
        alert("Please select who you are currently caring for");
        return;
      }
      if (surveyData.whoCaringFor.includes("other") && !surveyData.otherWhoCaringFor.trim()) {
        alert("Please specify your other caregiving relationship");
        return;
      }
    }

    // Validate step 2 - Emotional challenges (open-ended)
    if (currentStep === 2) {
      if (!surveyData.emotionalChallenges.trim()) {
        alert("Please share your biggest emotional or practical challenges");
        return;
      }
      if (checkInappropriateContent(surveyData.emotionalChallenges)) {
        alert("Please use respectful language. We want to create a supportive environment for everyone.");
        return;
      }
    }

    // Validate step 3 - What would support you (open-ended)
    if (currentStep === 3) {
      if (!surveyData.whatWouldSupport.trim()) {
        alert("Please share what would make you feel more supported");
        return;
      }
      if (checkInappropriateContent(surveyData.whatWouldSupport)) {
        alert("Please use respectful language. We want to create a supportive environment for everyone.");
        return;
      }
    }

    // Validate step 4 - AI helpful support (open-ended)
    if (currentStep === 4) {
      if (!surveyData.aiHelpfulSupport.trim()) {
        alert("Please share what AI support would feel helpful to you");
        return;
      }
      if (checkInappropriateContent(surveyData.aiHelpfulSupport)) {
        alert("Please use respectful language. We want to create a supportive environment for everyone.");
        return;
      }
    }

    // Validate step 5 - AI comfort level
    if (currentStep === 5) {
      if (!surveyData.aiComfort) {
        alert("Please select your comfort level with AI tools");
        return;
      }
    }

    // Validate step 6 - Human services openness
    if (currentStep === 6) {
      if (!surveyData.humanServicesOpenness) {
        alert("Please select your preference for human support");
        return;
      }
    }

    // Validate step 7 - Communication preference
    if (currentStep === 7) {
      if (surveyData.communicationPreference.length === 0) {
        alert("Please select your preferred communication methods");
        return;
      }
      if (surveyData.communicationPreference.includes("other") && !surveyData.otherCommunicationPreference.trim()) {
        alert("Please specify your other communication preference");
        return;
      }
    }

    // Validate step 8 - Urgency level
    if (currentStep === 8) {
      if (!surveyData.urgencyLevel) {
        alert("Please select how urgent your support needs are");
        return;
      }
    }

    // Validate step 9 - Final thoughts (now mandatory)
    if (currentStep === 9) {
      if (!surveyData.finalThoughts.trim()) {
        alert("Please share any additional thoughts about your caregiving experience");
        return;
      }
      if (checkInappropriateContent(surveyData.finalThoughts)) {
        alert("Please use respectful language. We want to create a supportive environment for everyone.");
        return;
      }
    }

    if (currentStep < surveySteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Check if phone verification should be offered
      if (surveyData.phoneNumber && !verifiedUserId) {
        setShowPhoneVerification(true);
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = async () => {
    try {
      // Map the new survey data structure to database format
      const newSurveyData = {
        phone_number: surveyData.phoneNumber || '',
        relationship: surveyData.whoCaringFor.includes('other') ? surveyData.otherWhoCaringFor : surveyData.whoCaringFor.join(', '),
        care_duration: surveyData.urgencyLevel,
        support_areas: surveyData.communicationPreference,
        challenges: [surveyData.emotionalChallenges],
        goals: [surveyData.whatWouldSupport, surveyData.aiHelpfulSupport].filter(Boolean),
        tech_comfort: parseInt(surveyData.aiComfort) || 3,
        additional_comments: `Name: ${surveyData.name}, Email: ${surveyData.email}, Country: ${surveyData.country}, State: ${surveyData.state}, Communication: ${surveyData.communicationPreference.join(', ')}, Human Services: ${surveyData.humanServicesOpenness}, Final Thoughts: ${surveyData.finalThoughts}`
      };

      // Submit survey data to Supabase
      const result = await submitSurvey(newSurveyData, verifiedUserId);

      if (result.success) {
        console.log("Survey submitted successfully");
        // Track successful submission
        await trackEvent('survey_submission_success', {
          survey_type: 'caregiver',
          user_verified: !!verifiedUserId,
          caregiving_type: surveyData.whoCaringFor.join(', ')
        });
        setCurrentStep(surveySteps.length); // Show success message

        // Trigger confetti animation
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        console.error("Survey submission failed:", result.error);
        toast({
          title: "Submission Failed",
          description: "There was an error submitting your survey. Please try again.",
          variant: "destructive",
        });
        // Track failed submission
        await trackEvent('survey_submission_failed', {
          survey_type: 'caregiver',
          error: result.error?.message
        });
        return;
      }
    } catch (error) {
      console.error("Survey submission error:", error);
      toast({
        title: "Submission Failed",
        description: "There was an unexpected error. Please try again.",
        variant: "destructive",
      });
      return;
    }
  };

  const updateSurveyData = (field: keyof SurveyData, value: any) => {
    setSurveyData(prev => ({ ...prev, [field]: value }));
  };

  // Track step completion
  const trackStepCompletion = async (step: number) => {
    await trackEvent('survey_step_completed', {
      step_number: step,
      survey_type: 'caregiver',
      step_name: surveySteps[step]?.title
    });
  };

  const handlePhoneVerified = (userId: string) => {
    setVerifiedUserId(userId);
    setShowPhoneVerification(false);
    handleSubmit();
  };

  const handleSkipPhoneVerification = () => {
    setShowPhoneVerification(false);
    handleSubmit();
  };

  const surveySteps = [
    // Step 0: Basic Info (Mandatory)
    {
      title: "Let's start with the basics",
      subtitle: "All fields are required",
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
            <Input
              id="name"
              value={surveyData.name}
              onChange={(e) => updateSurveyData("name", e.target.value)}
              className="mt-1"
              placeholder="Your full name"
              required
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={surveyData.email}
              onChange={(e) => updateSurveyData("email", e.target.value)}
              className="mt-1"
              placeholder="john@example.com"
              required
            />
          </div>
          <div>
            <Label htmlFor="phoneNumber" className="text-sm font-medium">Phone Number (optional)</Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={surveyData.phoneNumber}
              onChange={(e) => updateSurveyData("phoneNumber", e.target.value)}
              className="mt-1"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div>
            <Label htmlFor="country" className="text-sm font-medium">Country *</Label>
            <Select
              value={surveyData.country}
              onValueChange={(value) => {
                updateSurveyData("country", value);
                // Clear state and zipcode when country changes
                updateSurveyData("state", "");
                updateSurveyData("zipcode", "");
              }}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-lg z-50 max-h-60">
                <SelectItem value="United States">United States</SelectItem>
                <SelectItem value="Canada">Canada</SelectItem>
                <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                <SelectItem value="Australia">Australia</SelectItem>
                <SelectItem value="Germany">Germany</SelectItem>
                <SelectItem value="France">France</SelectItem>
                <SelectItem value="India">India</SelectItem>
                <SelectItem value="Japan">Japan</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* State field for US and India */}
          {(surveyData.country === "United States" || surveyData.country === "India") && (
            <div>
              <Label htmlFor="state" className="text-sm font-medium">State *</Label>
              <Select
                value={surveyData.state}
                onValueChange={(value) => updateSurveyData("state", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg z-50 max-h-60">
                  {surveyData.country === "United States" && [
                    <SelectItem key="AL" value="Alabama">Alabama</SelectItem>,
                    <SelectItem key="AK" value="Alaska">Alaska</SelectItem>,
                    <SelectItem key="AZ" value="Arizona">Arizona</SelectItem>,
                    <SelectItem key="AR" value="Arkansas">Arkansas</SelectItem>,
                    <SelectItem key="CA" value="California">California</SelectItem>,
                    <SelectItem key="CO" value="Colorado">Colorado</SelectItem>,
                    <SelectItem key="CT" value="Connecticut">Connecticut</SelectItem>,
                    <SelectItem key="DE" value="Delaware">Delaware</SelectItem>,
                    <SelectItem key="FL" value="Florida">Florida</SelectItem>,
                    <SelectItem key="GA" value="Georgia">Georgia</SelectItem>,
                    <SelectItem key="HI" value="Hawaii">Hawaii</SelectItem>,
                    <SelectItem key="ID" value="Idaho">Idaho</SelectItem>,
                    <SelectItem key="IL" value="Illinois">Illinois</SelectItem>,
                    <SelectItem key="IN" value="Indiana">Indiana</SelectItem>,
                    <SelectItem key="IA" value="Iowa">Iowa</SelectItem>,
                    <SelectItem key="KS" value="Kansas">Kansas</SelectItem>,
                    <SelectItem key="KY" value="Kentucky">Kentucky</SelectItem>,
                    <SelectItem key="LA" value="Louisiana">Louisiana</SelectItem>,
                    <SelectItem key="ME" value="Maine">Maine</SelectItem>,
                    <SelectItem key="MD" value="Maryland">Maryland</SelectItem>,
                    <SelectItem key="MA" value="Massachusetts">Massachusetts</SelectItem>,
                    <SelectItem key="MI" value="Michigan">Michigan</SelectItem>,
                    <SelectItem key="MN" value="Minnesota">Minnesota</SelectItem>,
                    <SelectItem key="MS" value="Mississippi">Mississippi</SelectItem>,
                    <SelectItem key="MO" value="Missouri">Missouri</SelectItem>,
                    <SelectItem key="MT" value="Montana">Montana</SelectItem>,
                    <SelectItem key="NE" value="Nebraska">Nebraska</SelectItem>,
                    <SelectItem key="NV" value="Nevada">Nevada</SelectItem>,
                    <SelectItem key="NH" value="New Hampshire">New Hampshire</SelectItem>,
                    <SelectItem key="NJ" value="New Jersey">New Jersey</SelectItem>,
                    <SelectItem key="NM" value="New Mexico">New Mexico</SelectItem>,
                    <SelectItem key="NY" value="New York">New York</SelectItem>,
                    <SelectItem key="NC" value="North Carolina">North Carolina</SelectItem>,
                    <SelectItem key="ND" value="North Dakota">North Dakota</SelectItem>,
                    <SelectItem key="OH" value="Ohio">Ohio</SelectItem>,
                    <SelectItem key="OK" value="Oklahoma">Oklahoma</SelectItem>,
                    <SelectItem key="OR" value="Oregon">Oregon</SelectItem>,
                    <SelectItem key="PA" value="Pennsylvania">Pennsylvania</SelectItem>,
                    <SelectItem key="RI" value="Rhode Island">Rhode Island</SelectItem>,
                    <SelectItem key="SC" value="South Carolina">South Carolina</SelectItem>,
                    <SelectItem key="SD" value="South Dakota">South Dakota</SelectItem>,
                    <SelectItem key="TN" value="Tennessee">Tennessee</SelectItem>,
                    <SelectItem key="TX" value="Texas">Texas</SelectItem>,
                    <SelectItem key="UT" value="Utah">Utah</SelectItem>,
                    <SelectItem key="VT" value="Vermont">Vermont</SelectItem>,
                    <SelectItem key="VA" value="Virginia">Virginia</SelectItem>,
                    <SelectItem key="WA" value="Washington">Washington</SelectItem>,
                    <SelectItem key="WV" value="West Virginia">West Virginia</SelectItem>,
                    <SelectItem key="WI" value="Wisconsin">Wisconsin</SelectItem>,
                    <SelectItem key="WY" value="Wyoming">Wyoming</SelectItem>,
                    <SelectItem key="DC" value="District of Columbia">District of Columbia</SelectItem>
                  ]}
                  {surveyData.country === "India" && [
                    <SelectItem key="AP" value="Andhra Pradesh">Andhra Pradesh</SelectItem>,
                    <SelectItem key="AR" value="Arunachal Pradesh">Arunachal Pradesh</SelectItem>,
                    <SelectItem key="AS" value="Assam">Assam</SelectItem>,
                    <SelectItem key="BR" value="Bihar">Bihar</SelectItem>,
                    <SelectItem key="CG" value="Chhattisgarh">Chhattisgarh</SelectItem>,
                    <SelectItem key="GA" value="Goa">Goa</SelectItem>,
                    <SelectItem key="GJ" value="Gujarat">Gujarat</SelectItem>,
                    <SelectItem key="HR" value="Haryana">Haryana</SelectItem>,
                    <SelectItem key="HP" value="Himachal Pradesh">Himachal Pradesh</SelectItem>,
                    <SelectItem key="JH" value="Jharkhand">Jharkhand</SelectItem>,
                    <SelectItem key="KA" value="Karnataka">Karnataka</SelectItem>,
                    <SelectItem key="KL" value="Kerala">Kerala</SelectItem>,
                    <SelectItem key="MP" value="Madhya Pradesh">Madhya Pradesh</SelectItem>,
                    <SelectItem key="MH" value="Maharashtra">Maharashtra</SelectItem>,
                    <SelectItem key="MN" value="Manipur">Manipur</SelectItem>,
                    <SelectItem key="ML" value="Meghalaya">Meghalaya</SelectItem>,
                    <SelectItem key="MZ" value="Mizoram">Mizoram</SelectItem>,
                    <SelectItem key="NL" value="Nagaland">Nagaland</SelectItem>,
                    <SelectItem key="OR" value="Odisha">Odisha</SelectItem>,
                    <SelectItem key="PB" value="Punjab">Punjab</SelectItem>,
                    <SelectItem key="RJ" value="Rajasthan">Rajasthan</SelectItem>,
                    <SelectItem key="SK" value="Sikkim">Sikkim</SelectItem>,
                    <SelectItem key="TN" value="Tamil Nadu">Tamil Nadu</SelectItem>,
                    <SelectItem key="TS" value="Telangana">Telangana</SelectItem>,
                    <SelectItem key="TR" value="Tripura">Tripura</SelectItem>,
                    <SelectItem key="UP" value="Uttar Pradesh">Uttar Pradesh</SelectItem>,
                    <SelectItem key="UK" value="Uttarakhand">Uttarakhand</SelectItem>,
                    <SelectItem key="WB" value="West Bengal">West Bengal</SelectItem>,
                    <SelectItem key="AN" value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</SelectItem>,
                    <SelectItem key="CH" value="Chandigarh">Chandigarh</SelectItem>,
                    <SelectItem key="DH" value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</SelectItem>,
                    <SelectItem key="DL" value="Delhi">Delhi</SelectItem>,
                    <SelectItem key="JK" value="Jammu and Kashmir">Jammu and Kashmir</SelectItem>,
                    <SelectItem key="LA" value="Ladakh">Ladakh</SelectItem>,
                    <SelectItem key="LD" value="Lakshadweep">Lakshadweep</SelectItem>,
                    <SelectItem key="PY" value="Puducherry">Puducherry</SelectItem>
                  ]}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Zipcode field */}
          <div>
            <Label htmlFor="zipcode" className="text-sm font-medium">
              {surveyData.country === "United States" ? "ZIP Code" :
                surveyData.country === "Canada" ? "Postal Code" :
                  surveyData.country === "United Kingdom" ? "Postcode" :
                    "Postal Code"} (Optional)
            </Label>
            <Input
              id="zipcode"
              value={surveyData.zipcode}
              onChange={(e) => updateSurveyData("zipcode", e.target.value)}
              className="mt-1"
              placeholder={
                surveyData.country === "United States" ? "12345 or 12345-6789" :
                  surveyData.country === "Canada" ? "K1A 0A6" :
                    surveyData.country === "United Kingdom" ? "SW1A 1AA" :
                      "Enter postal code"
              }
            />
          </div>
        </div>
      )
    },
    // Step 1: Who are you currently caring for?
    {
      title: "Who are you currently caring for?",
      subtitle: "Select all that apply",
      content: (
        <div className="space-y-4">
          <div className="mb-6">
            <img
              src="/lovable-uploads/0f00d735-157a-4cc9-912c-19fca080d766.png"
              alt="Cartoon handshake illustration"
              className="w-full h-32 object-contain rounded-lg"
            />
          </div>
          <Label className="text-sm font-medium">Select all that apply *</Label>
          <div className="grid gap-3">
            {[
              { value: "spouse", label: "A spouse or partner" },
              { value: "parent", label: "A parent" },
              { value: "child", label: "A child (including special needs)" },
              { value: "sibling", label: "A sibling" },
              { value: "friend", label: "A friend or neighbor" },
              { value: "loved-one", label: "Another loved one" },
              { value: "self", label: "I'm caring for myself (e.g. chronic illness, mental health)" },
              { value: "not-caregiver", label: "I am not a caregiver right now" },
              { value: "other", label: "Other (please specify)" }
            ].map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={option.value}
                  checked={surveyData.whoCaringFor?.includes(option.value) || false}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      updateSurveyData("whoCaringFor", [...(surveyData.whoCaringFor || []), option.value]);
                    } else {
                      updateSurveyData("whoCaringFor", (surveyData.whoCaringFor || []).filter(p => p !== option.value));
                      if (option.value === "other") {
                        updateSurveyData("otherWhoCaringFor", "");
                      }
                    }
                  }}
                />
                <Label htmlFor={option.value} className="text-sm font-normal cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>

          {surveyData.whoCaringFor?.includes("other") && (
            <div className="mt-4">
              <Label htmlFor="otherWhoCaringFor" className="text-sm font-medium">Please specify *</Label>
              <Input
                id="otherWhoCaringFor"
                value={surveyData.otherWhoCaringFor}
                onChange={(e) => updateSurveyData("otherWhoCaringFor", e.target.value)}
                className="mt-1"
                placeholder="Please describe your caregiving relationship"
                required
              />
            </div>
          )}
        </div>
      )
    },
    // Step 2: Emotional/practical challenges
    {
      title: "What are the biggest emotional or practical challenges you face as a caregiver?",
      subtitle: "Help us understand your experience",
      content: (
        <div className="space-y-4">
          <Label htmlFor="emotionalChallenges" className="text-sm font-medium">Share your biggest challenges *</Label>
          <Textarea
            id="emotionalChallenges"
            value={surveyData.emotionalChallenges}
            onChange={(e) => updateSurveyData("emotionalChallenges", e.target.value)}
            placeholder="Please describe the emotional or practical challenges you face in your caregiving role. This could include stress, decision fatigue, isolation, time constraints, financial strain, or anything else..."
            className="min-h-32"
            rows={6}
            required
          />
        </div>
      )
    },
    // Step 3: What would make you feel more supported
    {
      title: "What would make you feel more supported, emotionally and practically, in your caregiving role?",
      subtitle: "Help us understand what you need",
      content: (
        <div className="space-y-4">
          <div className="mb-6">
            <img
              src="/lovable-uploads/1bcc7ad1-ffb5-4294-93aa-fbd09eaa368e.png"
              alt="Colorful flowers field illustration"
              className="w-full h-32 object-contain rounded-lg"
            />
          </div>
          <Label htmlFor="whatWouldSupport" className="text-sm font-medium">What would help you feel more supported? *</Label>
          <Textarea
            id="whatWouldSupport"
            value={surveyData.whatWouldSupport}
            onChange={(e) => updateSurveyData("whatWouldSupport", e.target.value)}
            placeholder="Tell us what would make you feel more supported in your caregiving role. This could be flexibility, validation, downtime, better systems, backup help, or anything else that comes to mind..."
            className="min-h-32"
            rows={6}
            required
          />
        </div>
      )
    },
    // Step 4: AI support helpful
    {
      title: "When thinking about AI support for caregiving, what would feel truly helpful to you?",
      subtitle: "Your ideas matter to us",
      content: (
        <div className="space-y-4">
          <div className="mb-6">
            <img
              src="/lovable-uploads/3dee328c-6e75-4885-99ef-f5f820c93ffd.png"
              alt="Happy cartoon face illustration"
              className="w-full h-32 object-contain rounded-lg"
            />
          </div>
          <Label htmlFor="aiHelpfulSupport" className="text-sm font-medium">What AI support would feel helpful? *</Label>
          <Textarea
            id="aiHelpfulSupport"
            value={surveyData.aiHelpfulSupport}
            onChange={(e) => updateSurveyData("aiHelpfulSupport", e.target.value)}
            placeholder="Share your thoughts on what kind of AI support would actually be helpful in your caregiving journey. There are no wrong answers - we want to understand what would genuinely make a difference for you..."
            className="min-h-32"
            rows={6}
            required
          />
        </div>
      )
    },
    // Step 5: AI comfort level
    {
      title: "How comfortable are you using AI tools?",
      subtitle: "Like chatbots, voice assistants, or AI-based scheduling",
      content: (
        <div className="space-y-4">
          <Label className="text-sm font-medium">Select your comfort level *</Label>
          <Select
            value={surveyData.aiComfort}
            onValueChange={(value) => updateSurveyData("aiComfort", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose your comfort level" />
            </SelectTrigger>
            <SelectContent className="bg-background border shadow-lg z-50">
              <SelectItem value="1">Not at all comfortable</SelectItem>
              <SelectItem value="2">Somewhat uncomfortable</SelectItem>
              <SelectItem value="3">Neutral</SelectItem>
              <SelectItem value="4">Somewhat comfortable</SelectItem>
              <SelectItem value="5">Very comfortable</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )
    },
    // Step 6: Human support preference
    {
      title: "If AI can't help with a task, would you want a human to step in?",
      subtitle: "Arranged automatically and covered by insurance",
      content: (
        <div className="space-y-4">
          <Label className="text-sm font-medium">Select your preference *</Label>
          <Select
            value={surveyData.humanServicesOpenness}
            onValueChange={(value) => updateSurveyData("humanServicesOpenness", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose your preference" />
            </SelectTrigger>
            <SelectContent className="bg-background border shadow-lg z-50">
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="maybe">Maybe / depends on the task</SelectItem>
              <SelectItem value="need-info">I'd need more information</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )
    },
    // Step 7: Communication preference
    {
      title: "How would you prefer to communicate with a caregiving assistant?",
      subtitle: "AI or human - select all that apply",
      content: (
        <div className="space-y-4">
          <Label className="text-sm font-medium">Select all that apply *</Label>
          <div className="grid gap-3">
            {[
              { value: "voice", label: "Voice (like Alexa/Siri)" },
              { value: "text", label: "Text chat (like WhatsApp/SMS)" },
              { value: "app", label: "App interface" },
              { value: "email", label: "Email" },
              { value: "phone", label: "Phone call with a real person" },
              { value: "in-person", label: "In-person / at-home support" },
              { value: "other", label: "Other (please specify)" }
            ].map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={option.value}
                  checked={surveyData.communicationPreference?.includes(option.value) || false}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      updateSurveyData("communicationPreference", [...(surveyData.communicationPreference || []), option.value]);
                    } else {
                      updateSurveyData("communicationPreference", (surveyData.communicationPreference || []).filter(p => p !== option.value));
                      if (option.value === "other") {
                        updateSurveyData("otherCommunicationPreference", "");
                      }
                    }
                  }}
                />
                <Label htmlFor={option.value} className="text-sm font-normal cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>

          {surveyData.communicationPreference?.includes("other") && (
            <div className="mt-4">
              <Label htmlFor="otherCommunicationPreference" className="text-sm font-medium">Please specify *</Label>
              <Input
                id="otherCommunicationPreference"
                value={surveyData.otherCommunicationPreference}
                onChange={(e) => updateSurveyData("otherCommunicationPreference", e.target.value)}
                className="mt-1"
                placeholder="Please describe your preferred communication method"
                required
              />
            </div>
          )}
        </div>
      )
    },
    // Step 8: Urgency level
    {
      title: "How urgent is the support you need right now?",
      subtitle: "Help us understand your timeline",
      content: (
        <div className="space-y-4">
          <Label className="text-sm font-medium">Select your situation *</Label>
          <Select
            value={surveyData.urgencyLevel}
            onValueChange={(value) => updateSurveyData("urgencyLevel", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose your current situation" />
            </SelectTrigger>
            <SelectContent className="bg-background border shadow-lg z-50">
              <SelectItem value="crisis">I'm in crisis / overwhelmed</SelectItem>
              <SelectItem value="ongoing">I need consistent, ongoing support</SelectItem>
              <SelectItem value="planning">I'm planning ahead</SelectItem>
              <SelectItem value="exploring">Not urgent — just exploring</SelectItem>
            </SelectContent>
          </Select>

          {surveyData.urgencyLevel === "crisis" && (
            <div className="mt-3 p-4 bg-red-50 border border-red-200 rounded-md space-y-2">
              <p className="text-xs text-red-700 flex items-start gap-2">
                <span>⚠️</span>
                <span>If you are experiencing a medical or emotional emergency, please call 911 or a local emergency service. Nuvori is not a crisis support platform.</span>
              </p>
              <p className="text-xs text-red-700 flex items-start gap-2">
                <span>🚨</span>
                <span>For 24/7 emotional support, you can contact the National Alliance for Caregiving Helpline or 988 Lifeline. (United States — for other countries, check local crisis lines.)</span>
              </p>
            </div>
          )}
        </div>
      )
    },
    // Step 9: Final thoughts
    {
      title: "Is there anything else you'd like to share?",
      subtitle: "About your experience as a caregiver or what you hope this support could offer",
      content: (
        <div className="space-y-4">
          <Label htmlFor="finalThoughts" className="text-sm font-medium">Share anything else on your mind *</Label>
          <Textarea
            id="finalThoughts"
            value={surveyData.finalThoughts}
            onChange={(e) => updateSurveyData("finalThoughts", e.target.value)}
            placeholder="Feel free to share any additional thoughts about your caregiving experience, what you hope this kind of support could offer, or anything else you'd like us to know..."
            className="min-h-24"
            rows={4}
          />
        </div>
      )
    }
  ];

  // Show phone verification if needed
  if (showPhoneVerification && surveyData.phoneNumber) {
    return (
      <PhoneVerification
        phone={surveyData.phoneNumber}
        onVerified={handlePhoneVerified}
        onSkip={handleSkipPhoneVerification}
      />
    );
  }


  // Success screen
  if (currentStep >= surveySteps.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Your responses help us build better support for caregivers like you.
        </p>
        <Button onClick={onClose} className="px-8 py-3">
          Close Survey
        </Button>
      </motion.div>
    );
  }

  const currentStepData = surveySteps[currentStep];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {surveySteps.length}
          </span>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ×
          </Button>
        </div>
        <div className="w-full bg-secondary rounded-full h-2 mb-4">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / surveySteps.length) * 100}%` }}
          ></div>
        </div>
        <CardTitle className="text-xl">{currentStepData.title}</CardTitle>
        <CardDescription>{currentStepData.subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStepData.content}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button onClick={handleNext}>
            {currentStep === surveySteps.length - 1 ? "Submit Survey" : "Next"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaregiverSurvey;