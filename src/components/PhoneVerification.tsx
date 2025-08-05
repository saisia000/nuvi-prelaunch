import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

interface PhoneVerificationProps {
  phone: string;
  onVerified: (userId: string) => void;
  onSkip: () => void;
}

const PhoneVerification = ({ phone, onVerified, onSkip }: PhoneVerificationProps) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signInWithPhone, verifyOTP, phoneVerificationStep } = useAuth();

  const handleSendOTP = async () => {
    setLoading(true);
    setError("");
    
    const result = await signInWithPhone(phone);
    
    if (!result.success) {
      setError("Failed to send verification code. Please try again.");
    }
    
    setLoading(false);
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setError("Please enter a 6-digit verification code");
      return;
    }

    setLoading(true);
    setError("");
    
    const result = await verifyOTP(otp);
    
    if (result.success && result.user) {
      onVerified(result.user.id);
    } else {
      setError("Invalid verification code. Please try again.");
    }
    
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto"
    >
      <Card className="border-primary/20 shadow-lg shadow-primary/10">
        <CardHeader className="text-center">
          <CardTitle className="text-primary">Phone Verification</CardTitle>
          <CardDescription>
            Verify your phone number to secure your account and show we care about your privacy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {phoneVerificationStep === 'phone' && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                We'll send a verification code to: <strong>{phone}</strong>
              </p>
              <Button
                onClick={handleSendOTP}
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {loading ? "Sending..." : "Send Verification Code"}
              </Button>
            </div>
          )}

          {phoneVerificationStep === 'otp' && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Enter the 6-digit code sent to: <strong>{phone}</strong>
              </p>
              <div>
                <Label htmlFor="otp">Verification Code</Label>
                <Input
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="123456"
                  className="text-center text-lg tracking-widest"
                  maxLength={6}
                />
              </div>
              <Button
                onClick={handleVerifyOTP}
                disabled={loading || otp.length !== 6}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {loading ? "Verifying..." : "Verify Phone Number"}
              </Button>
              <Button
                onClick={handleSendOTP}
                variant="outline"
                disabled={loading}
                className="w-full"
              >
                Resend Code
              </Button>
            </div>
          )}

          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}

          <div className="pt-4 border-t">
            <Button
              onClick={onSkip}
              variant="ghost"
              className="w-full text-muted-foreground"
            >
              Skip for now
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              You can verify your phone number later in your account settings
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PhoneVerification;