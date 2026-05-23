import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await supabase.from('waitlist').insert([{ email }])
    setSubmitted(true)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center', padding: '40px', maxWidth: '600px' }}>
        <h1 style={{ fontSize: '48px', color: 'white', marginBottom: '20px' }}>Truvio</h1>
        <p style={{ fontSize: '20px', color: '#a0aec0', marginBottom: '40px' }}>
          Collect reviews automatically. Build trust. Grow faster.
        </p>
        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ padding: '14px 20px', borderRadius: '8px', border: 'none', fontSize: '16px', width: '300px' }}
            />
            <button
              type="submit"
              style={{ padding: '14px 28px', background: '#00c6ff', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}
            >
              Get Early Access
            </button>
          </form>
        ) : (
          <div style={{ background: 'rgba(0,198,255,0.1)', border: '1px solid #00c6ff', borderRadius: '12px', padding: '20px' }}>
            🎉 You're on the list! We'll notify you at launch.
          </div>
        )}
        <p style={{ marginTop: '20px', color: '#718096' }}>No spam. Just one email when we launch.</p>
        <div style={{ marginTop: '40px' }}>
          <a href="/login" style={{ color: '#00c6ff', marginRight: '20px' }}>Login</a>
          <a href="/signup" style={{ color: '#00c6ff' }}>Sign Up</a>
        </div>
      </div>
    </div>
  )
}