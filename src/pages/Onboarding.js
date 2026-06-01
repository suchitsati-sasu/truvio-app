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

function generateNotifications(businessType, city, street, userId) {
  const salonNames = ['Anna','Mia','Laura','Sofia','Emma','Lena','Sara','Nina','Eva','Zara','Alisa','Diana','Kate','Julia','Maria']
  const cafeNames = ['Janis','Karlis','Andris','Peteris','Maris','Roberts','Edgars','Arnis','Uldis','Gints']
  const indianNames = ['Priya','Rahul','Anita','Vikram','Pooja','Amit','Sneha','Raj','Neha','Arjun']
  const euNames = ['Sophie','Lucas','Emma','Noah','Olivia','Liam','Isabella','Ethan','Mia','James']
  const allNames = [...salonNames, ...cafeNames, ...indianNames, ...euNames]
  const cityNearby = { 'Riga': ['Jurmala','Ogre'], 'Mumbai': ['Pune','Thane'], 'London': ['Oxford','Brighton'] }
  const euCities = ['Berlin','Paris','Amsterdam','Warsaw','Prague','Vienna']
  const actions = {
    salon: ['just made a booking! 💇', 'just reserved a slot! ✨', 'just booked an appointment! 🌟', 'just secured a spot! 💅', 'just scheduled a visit! 🌸'],
    cafe: ['just placed an order! ☕', 'just made a reservation! 🍽️', 'just booked a table! ✨', 'just placed a takeaway order! 🥡', 'just made a booking! 😊'],
    ecommerce: ['just placed an order! 🛍️', 'just made a purchase! ✨', 'just checked out! 🎉', 'just bought something! 💫', 'just completed an order! 🛒'],
    fitness: ['just booked a session! 💪', 'just reserved a spot! 🏋️', 'just signed up! 🔥', 'just made a booking! ⚡', 'just secured a slot! 🌟'],
    clinic: ['just booked an appointment! 🏥', 'just scheduled a visit! 📅', 'just reserved a slot! ✅', 'just made a booking! 💙', 'just confirmed an appointment! 🌟'],
    shop: ['just placed an order! 🛍️', 'just made a purchase! ✨', 'just bought something! 🎉', 'just completed a purchase! 💫', 'just shopped! 😊'],
    services: ['just made a booking! 🔧', 'just scheduled a service! ✅', 'just booked an appointment! 🌟', 'just reserved a slot! 💫', 'just confirmed a booking! 😊'],
    education: ['just enrolled! 🎓', 'just booked a session! 📚', 'just registered! ✨', 'just signed up! 🌟', 'just secured a spot! 💡'],
    other: ['just made a booking! 🌟', 'just placed an order! ✨', 'just visited! 😊', 'just signed up! 🎉', 'just confirmed a booking! 💫'],
  }
  const typeActions = actions[businessType] || actions['other']
  const notifications = []
  for (let i = 0; i < 150; i++) {
    const name = allNames[Math.floor(Math.random() * allNames.length)]
    const action = typeActions[Math.floor(Math.random() * typeActions.length)]
    let location
    const rand = Math.random()
    if (rand < 0.75) {
      location = street ? `${street}, ${city}` : city
    } else if (rand < 0.80) {
      const nearby = cityNearby[city] || [city]
      location = nearby[Math.floor(Math.random() * nearby.length)]
    } else {
      location = euCities[Math.floor(Math.random() * euCities.length)]
    }
    const minsAgo = Math.floor(Math.random() * 1440)
    notifications.push({
      user_id: userId,
      message: `${name} from ${location} ${action}`,
      business_type: businessType,
      created_at: new Date(Date.now() - minsAgo * 60000).toISOString(),
    })
  }
  return notifications
}

export default function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    business_name: '',
    business_type: '',
    city: '',
    country: '',
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
    if (step === 3 && !form.country.trim()) {
      alert('Please enter your country!')
      return
    }
    setStep(step + 1)
  }

  const handleFinish = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()

    await supabase.from('profiles').upsert({
      id: user.id,
      ...form,
      email: user.email,
      onboarding_done: true,
    })

    const notifications = generateNotifications(form.business_type, form.city, form.street, user.id)
    await supabase.from('notifications').insert(notifications)

    // Welcome email bhejo
    await fetch('/api/send-welcome', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, business_name: form.business_name, userId: user.id }),
    })

    // Stripe checkout
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, email: user.email }),
    })
    const data = await res.json()
    if (data.url) {
      window.location.href = data.url
    } else {
      navigate('/dashboard')
    }
    setLoading(false)
  }

  const inputStyle = {
    width: '100%',
    padding: '13px 16px',
    borderRadius: '8px',
    border: '3px solid #111',
    fontSize: '15px',
    marginTop: '8px',
    boxSizing: 'border-box',
    fontFamily: "'Comic Neue', cursive",
    fontWeight: 700,
    background: 'white',
    boxShadow: '3px 3px 0 #111',
    outline: 'none',
    color: '#111',
  }

  const labelStyle = {
    display: 'block',
    fontFamily: "'Bangers', cursive",
    fontSize: '14px',
    letterSpacing: '1px',
    color: 'white',
    marginTop: '16px',
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
        <a href="/" style={{ textDecoration: 'none', marginBottom: '24px', zIndex: 1 }}>
          <img src="/popproof-logo.png" alt="Popproof" style={{ height: '40px', objectFit: 'contain' }} />
        </a>

        {/* Card */}
        <div style={{
          background: 'white',
          border: '3px solid #111',
          borderRadius: '16px',
          padding: '40px',
          width: '100%',
          maxWidth: '520px',
          boxShadow: '7px 7px 0 #111',
          position: 'relative',
          zIndex: 1,
        }}>

          {/* Progress bar */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
            {[1, 2, 3, 4].map(s => (
              <div key={s} style={{
                flex: 1, height: '6px', borderRadius: '3px',
                background: s <= step ? '#7c3aed' : '#e0e0e0',
                border: s <= step ? '2px solid #111' : '2px solid #e0e0e0',
                transition: 'all 0.3s',
              }} />
            ))}
          </div>

          {/* Step 1 — Business Name */}
          {step === 1 && (
            <div>
              <h2 style={{ fontFamily: "'Bangers', cursive", fontSize: '28px', letterSpacing: '1px', marginBottom: '8px', color: '#111' }}>👋 WELCOME!</h2>
              <p style={{ color: '#666', marginBottom: '24px', fontWeight: 700, fontSize: '14px' }}>Let's set up your FOMO widget in 2 minutes.</p>
              <label style={{ ...labelStyle, color: '#111' }}>📛 BUSINESS NAME</label>
              <input
                style={inputStyle}
                placeholder="e.g. XYZ Business"
                value={form.business_name}
                onChange={e => setForm({ ...form, business_name: e.target.value })}
              />
            </div>
          )}

          {/* Step 2 — Business Type */}
          {step === 2 && (
            <div>
              <h2 style={{ fontFamily: "'Bangers', cursive", fontSize: '28px', letterSpacing: '1px', marginBottom: '8px', color: '#111' }}>🏢 BUSINESS TYPE</h2>
              <p style={{ color: '#666', marginBottom: '16px', fontWeight: 700, fontSize: '14px' }}>What kind of business do you run?</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '380px', overflowY: 'auto' }}>
                {BUSINESS_TYPES.map(bt => (
                  <div
                    key={bt.value}
                    onClick={() => setForm({ ...form, business_type: bt.value })}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: `3px solid ${form.business_type === bt.value ? '#7c3aed' : '#e0e0e0'}`,
                      background: form.business_type === bt.value ? '#f5f3ff' : 'white',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 700,
                      fontFamily: "'Comic Neue', cursive",
                      boxShadow: form.business_type === bt.value ? '3px 3px 0 #111' : 'none',
                      transition: 'all 0.15s',
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
              <h2 style={{ fontFamily: "'Bangers', cursive", fontSize: '28px', letterSpacing: '1px', marginBottom: '8px', color: '#111' }}>📍 YOUR LOCATION</h2>
              <p style={{ color: '#666', marginBottom: '8px', fontWeight: 700, fontSize: '14px' }}>We'll use this to generate hyper-local notifications.</p>

              <label style={{ ...labelStyle, color: '#111' }}>🌍 COUNTRY *</label>
              <input
                style={inputStyle}
                placeholder="e.g. Latvia, India, UK..."
                value={form.country}
                onChange={e => setForm({ ...form, country: e.target.value })}
              />

              <label style={{ ...labelStyle, color: '#111' }}>🏙️ CITY *</label>
              <input
                style={inputStyle}
                placeholder="e.g. Riga, Mumbai, London..."
                value={form.city}
                onChange={e => setForm({ ...form, city: e.target.value })}
              />

              <label style={{ ...labelStyle, color: '#111' }}>🛣️ STREET / AREA <span style={{ color: '#999', fontSize: '12px', fontFamily: 'sans-serif', letterSpacing: 0 }}>(optional)</span></label>
              <input
                style={inputStyle}
                placeholder="e.g. Main Street, Connaught Place..."
                value={form.street}
                onChange={e => setForm({ ...form, street: e.target.value })}
              />
              <p style={{ color: '#999', fontSize: '12px', marginTop: '8px', fontWeight: 700 }}>💡 Adding street makes notifications more hyper-local!</p>
            </div>
          )}

          {/* Step 4 — Confirm */}
          {step === 4 && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
              <h2 style={{ fontFamily: "'Bangers', cursive", fontSize: '28px', letterSpacing: '1px', marginBottom: '8px', color: '#111' }}>YOU'RE ALL SET!</h2>
              <p style={{ color: '#666', marginBottom: '24px', fontSize: '14px', fontWeight: 700 }}>
                We'll generate 150 customized notifications for <strong>{form.business_name}</strong> in <strong>{form.city}</strong>.
              </p>
              <div style={{ background: '#f5f3ff', border: '3px solid #7c3aed', borderRadius: '12px', padding: '16px', marginBottom: '8px', textAlign: 'left', boxShadow: '3px 3px 0 #111' }}>
                <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>📛 <strong>{form.business_name}</strong></div>
                <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>📊 {BUSINESS_TYPES.find(b => b.value === form.business_type)?.label}</div>
                <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>🌍 {form.country}</div>
                <div style={{ fontWeight: 700, fontSize: '14px' }}>📍 {form.city}{form.street ? `, ${form.street}` : ''}</div>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                style={{
                  padding: '12px 24px',
                  background: 'white',
                  border: '3px solid #111',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontFamily: "'Bangers', cursive",
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  boxShadow: '3px 3px 0 #111',
                }}
              >
                ← BACK
              </button>
            )}
            {step < 4 ? (
              <button
                onClick={handleNext}
                style={{
                  padding: '12px 28px',
                  background: '#7c3aed',
                  color: 'white',
                  border: '3px solid #111',
                  borderRadius: '8px',
                  fontSize: '18px',
                  fontFamily: "'Bangers', cursive",
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  marginLeft: 'auto',
                  boxShadow: '4px 4px 0 #111',
                }}
              >
                NEXT →
              </button>
            ) : (
              <button
                onClick={handleFinish}
                disabled={loading}
                style={{
                  padding: '12px 28px',
                  background: loading ? '#ccc' : '#7c3aed',
                  color: 'white',
                  border: '3px solid #111',
                  borderRadius: '8px',
                  fontSize: '18px',
                  fontFamily: "'Bangers', cursive",
                  letterSpacing: '1px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  marginLeft: 'auto',
                  boxShadow: loading ? 'none' : '4px 4px 0 #111',
                }}
              >
                {loading ? 'SETTING UP...' : '🚀 LAUNCH MY WIDGET!'}
              </button>
            )}
          </div>
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