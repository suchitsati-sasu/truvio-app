import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

const BUSINESS_TYPES = [
  { value: 'salon', label: '💇 Salon / Spa' },
  { value: 'cafe', label: '☕ Cafe / Bar / Restaurant' },
  { value: 'ecommerce', label: '🛍️ eCommerce / Shopify' },
  { value: 'fitness', label: '🏋️ Gym / Fitness' },
  { value: 'clinic', label: '🏥 Clinic / Doctor' },
  { value: 'shop', label: '🏪 Local Shop (Grocery, Toys, etc.)' },
  { value: 'services', label: '🔧 Services (Plumber, Electrician, etc.)' },
  { value: 'education', label: '🎓 Education / Coaching' },
  { value: 'other', label: '🏢 Other Business' },
]

export default function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    business_name: '',
    business_type: '',
    city: '',
    street: '',
  })

  const handleNext = () => {
    if (step === 1 && !form.business_name.trim()) {
      alert('Please enter your business name!')
      return
    }
    if (step === 2 && !form.business_type) {
      alert('Please select your business type!')
      return
    }
    if (step === 3 && !form.city.trim()) {
      alert('Please enter your city!')
      return
    }
    setStep(step + 1)
  }

  const handleFinish = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()

    // Save profile
    await supabase.from('profiles').upsert({
      id: user.id,
      ...form,
      onboarding_done: true,
    })

    navigate('/dashboard')
    setLoading(false)
  }

  const inputStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '2px solid #e0e0e0',
    fontSize: '16px',
    marginTop: '8px',
    boxSizing: 'border-box',
  }

  return (
    <div style={{ maxWidth: '500px', margin: '60px auto', padding: '40px', background: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
      
      {/* Progress bar */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
        {[1, 2, 3, 4].map(s => (
          <div key={s} style={{ flex: 1, height: '4px', borderRadius: '2px', background: s <= step ? '#00c6ff' : '#e0e0e0' }} />
        ))}
      </div>

      {/* Step 1 — Business Name */}
      {step === 1 && (
        <div>
          <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>👋 Welcome!</h2>
          <p style={{ color: '#666', marginBottom: '24px' }}>Let's set up your FOMO widget in 2 minutes.</p>
          <label style={{ fontWeight: 'bold' }}>What's your business name?</label>
          <input
            style={inputStyle}
            placeholder="e.g. WoW Beauty Lounge"
            value={form.business_name}
            onChange={e => setForm({ ...form, business_name: e.target.value })}
          />
        </div>
      )}

      {/* Step 2 — Business Type */}
      {step === 2 && (
        <div>
          <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>🏢 Business Type</h2>
          <p style={{ color: '#666', marginBottom: '24px' }}>What kind of business do you run?</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {BUSINESS_TYPES.map(bt => (
              <div
                key={bt.value}
                onClick={() => setForm({ ...form, business_type: bt.value })}
                style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: `2px solid ${form.business_type === bt.value ? '#00c6ff' : '#e0e0e0'}`,
                  background: form.business_type === bt.value ? '#f0f9ff' : 'white',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: form.business_type === bt.value ? 'bold' : 'normal',
                }}
              >
                {bt.label}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 3 — Location */}
      {step === 3 && (
        <div>
          <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>📍 Your Location</h2>
          <p style={{ color: '#666', marginBottom: '24px' }}>We'll use this to generate local notifications.</p>
          
          <label style={{ fontWeight: 'bold' }}>City *</label>
          <input
            style={inputStyle}
            placeholder="e.g. Riga, Mumbai, London..."
            value={form.city}
            onChange={e => setForm({ ...form, city: e.target.value })}
          />

          <label style={{ fontWeight: 'bold', display: 'block', marginTop: '16px' }}>Street / Area <span style={{ color: '#999', fontWeight: 'normal' }}>(optional)</span></label>
          <input
            style={inputStyle}
            placeholder="e.g. Elizabetes iela, Connaught Place..."
            value={form.street}
            onChange={e => setForm({ ...form, street: e.target.value })}
          />
          <p style={{ color: '#999', fontSize: '13px', marginTop: '8px' }}>Adding street makes notifications more hyper-local and believable!</p>
        </div>
      )}

      {/* Step 4 — Ready */}
      {step === 4 && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
          <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>You're all set!</h2>
          <p style={{ color: '#666', marginBottom: '24px' }}>We'll generate 150 customized notifications for <strong>{form.business_name}</strong> in <strong>{form.city}</strong>.</p>
          
          <div style={{ background: '#f0f9ff', borderRadius: '12px', padding: '16px', marginBottom: '24px', textAlign: 'left' }}>
            <div>🏢 <strong>{form.business_name}</strong></div>
            <div style={{ marginTop: '8px' }}>📊 {BUSINESS_TYPES.find(b => b.value === form.business_type)?.label}</div>
            <div style={{ marginTop: '8px' }}>📍 {form.city}{form.street ? `, ${form.street}` : ''}</div>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            style={{ padding: '12px 24px', background: 'none', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}
          >
            ← Back
          </button>
        )}
        {step < 4 ? (
          <button
            onClick={handleNext}
            style={{ padding: '12px 24px', background: '#00c6ff', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold', marginLeft: 'auto' }}
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleFinish}
            disabled={loading}
            style={{ padding: '12px 24px', background: '#00c6ff', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold', marginLeft: 'auto' }}
          >
            {loading ? 'Setting up...' : '🚀 Launch My Widget!'}
          </button>
        )}
      </div>
    </div>
  )
}