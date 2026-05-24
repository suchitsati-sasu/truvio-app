import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Pricing() {
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    setLoading(true)
    
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      window.location.href = '/login'
      return
    }

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          email: user.email,
        }),
      })

      const { url, error } = await res.json()
      if (error) throw new Error(error)
      window.location.href = url

    } catch (err) {
      alert('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '500px', margin: '80px auto', textAlign: 'center', padding: '40px' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>Simple Pricing</h1>
      <p style={{ color: '#666', marginBottom: '40px' }}>Start free, cancel anytime</p>

      <div style={{ border: '2px solid #00c6ff', borderRadius: '16px', padding: '40px' }}>
        <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#00c6ff' }}>€19</div>
        <div style={{ color: '#666', marginBottom: '20px' }}>/month after free trial</div>

        <div style={{ textAlign: 'left', marginBottom: '30px' }}>
          {['✅ 14 days free trial', '✅ Unlimited reviews', '✅ Email automation', '✅ FOMO widget', '✅ Cancel anytime'].map(f => (
            <div key={f} style={{ padding: '8px 0', fontSize: '16px' }}>{f}</div>
          ))}
        </div>

        <button
          onClick={handleSubscribe}
          disabled={loading}
          style={{ width: '100%', padding: '14px', background: '#00c6ff', color: 'white', border: 'none', borderRadius: '8px', fontSize: '18px', cursor: 'pointer', fontWeight: 'bold', opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Redirecting...' : 'Start Free Trial 🚀'}
        </button>

        <p style={{ color: '#999', fontSize: '14px', marginTop: '15px' }}>No credit card required for trial</p>
      </div>
    </div>
  )
}