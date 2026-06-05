import { useState } from 'react'
import { supabase } from '../supabaseClient'
import Logo from '../components/Logo'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleReset = async () => {
    if (!email) return alert('Email enter karo!')
    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    })
    setLoading(false)
    if (error) return alert('Error: ' + error.message)
    setSent(true)
  }

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Comic+Neue:wght@400;700&display=swap" rel="stylesheet" />
      <div style={{ minHeight: '100vh', background: '#0d0a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ width: '100%', maxWidth: '420px', background: '#1a1030', border: '3px solid rgba(124,58,237,0.4)', borderRadius: '16px', padding: '40px 32px', boxShadow: '5px 5px 0 rgba(124,58,237,0.3)' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <Logo />
          </div>
          {sent ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📧</div>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '24px', color: '#00cc77', letterSpacing: '1px', marginBottom: '8px' }}>EMAIL SENT!</div>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', fontWeight: 700 }}>Check your inbox for the password reset link.</p>
              <a href="/login" style={{ display: 'inline-block', marginTop: '20px', color: '#a78bfa', fontSize: '13px', fontWeight: 700 }}>← Back to Login</a>
            </div>
          ) : (
            <>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '28px', color: 'white', letterSpacing: '1px', marginBottom: '8px', textAlign: 'center' }}>FORGOT PASSWORD?</div>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: 700, marginBottom: '24px', textAlign: 'center' }}>Enter your email and we'll send you a reset link.</p>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', background: '#0a0614', border: '2px solid rgba(124,58,237,0.3)', borderRadius: '8px', color: 'white', fontSize: '14px', marginBottom: '16px', boxSizing: 'border-box' }}
              />
              <button onClick={handleReset} disabled={loading} style={{ width: '100%', padding: '14px', fontFamily: "'Bangers', cursive", fontSize: '20px', letterSpacing: '1px', background: '#7c3aed', color: 'white', border: '3px solid #111', borderRadius: '8px', cursor: 'pointer', boxShadow: '4px 4px 0 #111' }}>
                {loading ? '⏳ SENDING...' : '📧 SEND RESET LINK'}
              </button>
              <div style={{ textAlign: 'center', marginTop: '16px' }}>
                <a href="/login" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', fontWeight: 700 }}>← Back to Login</a>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}