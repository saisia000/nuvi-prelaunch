import { supabase } from '@/integrations/supabase/client'

// Phone authentication
export const sendPhoneOTP = async (phone: string) => {
  const { data, error } = await supabase.auth.signInWithOtp({
    phone: phone,
  })
  return { data, error }
}

export const verifyPhoneOTP = async (phone: string, token: string) => {
  const { data, error } = await supabase.auth.verifyOtp({
    phone: phone,
    token: token,
    type: 'sms'
  })
  return { data, error }
}

// Analytics tracking
export const trackEvent = async (eventName: string, properties: Record<string, any> = {}) => {
  try {
    // For now, just log analytics events since we don't have an analytics table
    console.log('Analytics Event:', eventName, properties);
  } catch (err) {
    console.error('Failed to track event:', err)
  }
}

// Survey submission
export const submitSurvey = async (surveyData: any, userId?: string): Promise<{ success: boolean, error?: any }> => {
  try {
    const { data, error } = await supabase
      .from('survey_responses')
      .insert([surveyData]);

    if (error) {
      console.error('Error submitting survey:', error);
      return { success: false, error };
    }

    // Track successful submission
    await trackEvent('survey_completed', { userId });
    
    return { success: true };
  } catch (error) {
    console.error('Error submitting survey:', error);
    return { success: false, error };
  }
}

export { supabase };