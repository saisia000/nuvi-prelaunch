-- Update OTP expiry settings for better security
-- Set OTP token expiry to 5 minutes (300 seconds) instead of the default longer period
UPDATE auth.config 
SET value = '300' 
WHERE name = 'SMS_OTP_EXP';