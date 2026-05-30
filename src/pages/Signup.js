import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match!')
      return
    }
    if (password.length < 6) {
      setMessage('Password must be at least 6 characters!')
      return
    }
    setLoading(true)
    setMessage('')
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setMessage(error.message)
      setLoading(false)
    } else {
      navigate('/onboarding')
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '13px 16px',
    borderRadius: '8px',
    border: '3px solid #111',
    fontSize: '15px',
    boxSizing: 'border-box',
    fontFamily: "'Comic Neue', cursive",
    fontWeight: 700,
    background: 'white',
    boxShadow: '3px 3px 0 #111',
    outline: 'none',
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

        {/* Purple glow */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '600px', height: '300px', background: 'radial-gradient(ellipse,rgba(124,58,237,0.15) 0%,transparent 70%)', pointerEvents: 'none' }} />

        {/* Logo */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none', marginBottom: '32px', zIndex: 1 }}>
          <img src="/popproof-logo.png" alt="Popproof" style={{ height: '40px', objectFit: 'contain' }} />
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
          {/* Badge */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(124,58,237,0.1)', border: '2px solid rgba(124,58,237,0.3)', color: '#7c3aed', padding: '5px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, letterSpacing: '1px' }}>
              🎁 START A 14-DAY FREE TRIAL
            </div>
          </div>

          <h1 style={{ fontFamily: "'Bangers', cursive", fontSize: '32px', color: '#111', textAlign: 'center', letterSpacing: '1px', marginBottom: '6px' }}>
            CREATE YOUR ACCOUNT
          </h1>
          <p style={{ fontSize: '13px', color: '#888', textAlign: 'center', fontWeight: 700, marginBottom: '28px' }}>
            Join 500+ businesses using Popproof 🚀
          </p>

          {message && (
            <div style={{ background: '#fff1f2', border: '2px solid #ff4444', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px', fontSize: '13px', fontWeight: 700, color: '#ff4444', textAlign: 'center' }}>
              ⚠️ {message}
            </div>
          )}

          <form onSubmit={handleSignup}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontFamily: "'Bangers', cursive", fontSize: '14px', letterSpacing: '1px', marginBottom: '6px', color: '#111' }}>📧 EMAIL</label>
              <input
                type="email"
                placeholder="you@yourbusiness.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontFamily: "'Bangers', cursive", fontSize: '14px', letterSpacing: '1px', marginBottom: '6px', color: '#111' }}>🔒 PASSWORD</label>
              <input
                type="password"
                placeholder="Min. 6 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontFamily: "'Bangers', cursive", fontSize: '14px', letterSpacing: '1px', marginBottom: '6px', color: '#111' }}>🔒 CONFIRM PASSWORD</label>
              <input
                type="password"
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

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
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '6px 6px 0 #111' }}}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = loading ? 'none' : '4px 4px 0 #111' }}
            >
              {loading ? 'CREATING ACCOUNT...' : '🚀 START FREE TRIAL'}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '20px 0' }}>
            <div style={{ flex: 1, height: '2px', background: '#e5e7eb' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#bbb' }}>OR</span>
            <div style={{ flex: 1, height: '2px', background: '#e5e7eb' }} />
          </div>

          <p style={{ textAlign: 'center', fontSize: '13px', fontWeight: 700, color: '#555', margin: 0 }}>
            Already have an account?{' '}
            <a href="/login" style={{ color: '#7c3aed', textDecoration: 'none', fontWeight: 700 }}>Login →</a>
          </p>
        </div>

        {/* Trust badges */}
        <div style={{ display: 'flex', gap: '20px', marginTop: '24px', flexWrap: 'wrap', justifyContent: 'center', zIndex: 1 }}>
          {['✓ Start a 14-day free trial', '✓ Cancel anytime', '✓ GDPR compliant'].map((item, i) => (
            <span key={i} style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.5px' }}>{item}</span>
          ))}
        </div>
      </div>
    </>
  )
}