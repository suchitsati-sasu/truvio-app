import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
    } else {
      window.location.href = '/dashboard'
    }
    setLoading(false)
  }

  const inputStyle = {
    width: '100%',
    padding: '13px 16px',
    borderRadius: '8px',
    border: '3px solid #111',
    fontSize: '15px',
    marginBottom: '16px',
    boxSizing: 'border-box',
    fontFamily: "'Comic Neue', cursive",
    fontWeight: 700,
    background: 'white',
    boxShadow: '3px 3px 0 #111',
    outline: 'none',
    color: '#111',
  }

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Comic+Neue:wght@400;700&display=swap" rel="stylesheet" />
      <div style={{
        minHeight: '100vh',
        background: '#0d0a1a',
        backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.025) 1px,transparent 1px)',
        backgroundSize: '22px 22px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        position: 'relative',
      }}>

        {/* Glow */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '600px', height: '300px', background: 'radial-gradient(ellipse,rgba(124,58,237,0.15) 0%,transparent 70%)', pointerEvents: 'none' }} />

        {/* Logo */}
        <a href="/" style={{ textDecoration: 'none', marginBottom: '24px', zIndex: 1, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontFamily: "'Bangers', cursive", fontSize: '22px', color: 'white', letterSpacing: '2px' }}>P</span>
          <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#ec4899)', border: '2px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontSize: '12px', fontWeight: 900 }}>✓</span>
          </div>
          <span style={{ fontFamily: "'Bangers', cursive", fontSize: '22px', color: 'white', letterSpacing: '2px' }}>P</span>
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '4px' }}>
            <span style={{ fontFamily: "'Bangers', cursive", fontSize: '16px', color: 'white', letterSpacing: '2px', lineHeight: 1 }}>PROOF</span>
            <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: '1px', lineHeight: 1 }}>BY NEXVIAN</span>
          </div>
        </a>

        {/* Card */}
        <div style={{
          background: 'white',
          border: '3px solid #111',
          borderRadius: '16px',
          padding: '40px',
          width: '100%',
          maxWidth: '440px',
          boxShadow: '7px 7px 0 #111',
          position: 'relative',
          zIndex: 1,
        }}>
          <h2 style={{ fontFamily: "'Bangers', cursive", fontSize: '32px', letterSpacing: '1px', marginBottom: '6px', color: '#111', textAlign: 'center' }}>
            👋 WELCOME BACK!
          </h2>
          <p style={{ color: '#666', marginBottom: '28px', fontWeight: 700, fontSize: '14px', textAlign: 'center' }}>
            Log in to your Popproof account
          </p>

          {error && (
            <div style={{ background: '#fff0f0', border: '3px solid #ff4444', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px', boxShadow: '3px 3px 0 #111' }}>
              <p style={{ color: '#cc0000', fontWeight: 700, fontSize: '14px', margin: 0, fontFamily: "'Comic Neue', cursive" }}>⚠️ {error}</p>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <label style={{ display: 'block', fontFamily: "'Bangers', cursive", fontSize: '14px', letterSpacing: '1px', color: '#111', marginBottom: '4px' }}>
              📧 EMAIL
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />

            <label style={{ display: 'block', fontFamily: "'Bangers', cursive", fontSize: '14px', letterSpacing: '1px', color: '#111', marginBottom: '4px' }}>
              🔒 PASSWORD
            </label>
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ ...inputStyle, marginBottom: '24px' }}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                background: loading ? '#ccc' : '#7c3aed',
                color: 'white',
                border: '3px solid #111',
                borderRadius: '8px',
                fontSize: '20px',
                fontFamily: "'Bangers', cursive",
                letterSpacing: '1px',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: loading ? 'none' : '4px 4px 0 #111',
                transition: 'all 0.15s',
              }}
            >
              {loading ? 'LOGGING IN...' : '🚀 LOGIN'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '20px', fontWeight: 700, fontSize: '14px', fontFamily: "'Comic Neue', cursive", color: '#555' }}>
            Don't have an account?{' '}
            <a href="/signup" style={{ color: '#7c3aed', fontWeight: 700, textDecoration: 'none', borderBottom: '2px solid #7c3aed' }}>
              Sign Up
            </a>
          </p>
        </div>

        {/* Trust badges */}
        <div style={{ display: 'flex', gap: '20px', marginTop: '24px', flexWrap: 'wrap', justifyContent: 'center', zIndex: 1 }}>
          {['✓ 14-day free trial', '✓ Cancel anytime', '✓ GDPR compliant'].map((item, i) => (
            <span key={i} style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.35)' }}>{item}</span>
          ))}
        </div>
      </div>
    </>
  )
}