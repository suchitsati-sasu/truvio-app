import { useState } from 'react'
import { supabase } from '../supabaseClient'
import Logo from '../components/Logo'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleUpdate = async () => {
    if (!password) return alert('Password enter karo!')
    if (password !== confirm) return alert('Passwords match nahi kar rahe!')
    if (password.length < 6) return alert('Password kam se kam 6 characters ka hona chahiye!')
    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)
    if (error) return alert('Error: ' + error.message)
    setDone(true)
    setTimeout(() => window.location.href = '/login', 2000)
  }

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Comic+Neue:wght@400;700&display=swap" rel="stylesheet" />
      <div style={{ minHeight: '100vh', background: '#0d0a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ width: '100%', maxWidth: '420px', background: '#1a1030', border: '3px solid rgba(124,58,237,0.4)', borderRadius: '16px', padding: '40px 32px', boxShadow: '5px 5px 0 rgba(124,58,237,0.3)' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <Logo />
          </div>
          {done ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '24px', color: '#00cc77', letterSpacing: '1px' }}>PASSWORD UPDATED!</div>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', fontWeight: 700, marginTop: '8px' }}>Redirecting to login...</p>
            </div>
          ) : (
            <>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '28px', color: 'white', letterSpacing: '1px', marginBottom: '8px', textAlign: 'center' }}>SET NEW PASSWORD</div>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: 700, marginBottom: '24px', textAlign: 'center' }}>Enter your new password below.</p>
              <input
                type="password"
                placeholder="New password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', background: '#0a0614', border: '2px solid rgba(124,58,237,0.3)', borderRadius: '8px', color: 'white', fontSize: '14px', marginBottom: '12px', boxSizing: 'border-box' }}
              />
              <input
                type="password"
                placeholder="Confirm password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', background: '#0a0614', border: '2px solid rgba(124,58,237,0.3)', borderRadius: '8px', color: 'white', fontSize: '14px', marginBottom: '16px', boxSizing: 'border-box' }}
              />
              <button onClick={handleUpdate} disabled={loading} style={{ width: '100%', padding: '14px', fontFamily: "'Bangers', cursive", fontSize: '20px', letterSpacing: '1px', background: '#7c3aed', color: 'white', border: '3px solid #111', borderRadius: '8px', cursor: 'pointer', boxShadow: '4px 4px 0 #111' }}>
                {loading ? '⏳ UPDATING...' : '🔐 UPDATE PASSWORD'}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}