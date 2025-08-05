import { useState, useEffect } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
}

export const useAuth = () => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    session: null,
    loading: true
  })

  const [phoneVerificationStep, setPhoneVerificationStep] = useState<'phone' | 'otp' | 'verified'>('phone')
  const [pendingPhone, setPendingPhone] = useState<string>('')

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setAuth({
        user: session?.user ?? null,
        session,
        loading: false
      })
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setAuth({
          user: session?.user ?? null,
          session,
          loading: false
        })

        if (event === 'SIGNED_IN') {
          setPhoneVerificationStep('verified')
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signInWithPhone = async (phone: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        phone: phone,
      })
      
      if (error) throw error
      
      setPendingPhone(phone)
      setPhoneVerificationStep('otp')
      return { success: true }
    } catch (error) {
      console.error('Phone sign in error:', error)
      return { success: false, error }
    }
  }

  const verifyOTP = async (token: string) => {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: pendingPhone,
        token: token,
        type: 'sms'
      })
      
      if (error) throw error
      
      setPhoneVerificationStep('verified')
      return { success: true, user: data.user }
    } catch (error) {
      console.error('OTP verification error:', error)
      return { success: false, error }
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      setPhoneVerificationStep('phone')
      setPendingPhone('')
    }
    return { error }
  }

  return {
    ...auth,
    signInWithPhone,
    verifyOTP,
    signOut,
    phoneVerificationStep,
    pendingPhone
  }
}