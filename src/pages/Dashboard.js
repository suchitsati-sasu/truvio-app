import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [reviews, setReviews] = useState([])
  const [copied, setCopied] = useState(false)
  const [reviewLinkCopied, setReviewLinkCopied] = useState(false)
  const [profile, setProfile] = useState(null)
  const [placeId, setPlaceId] = useState('')
  const [connecting, setConnecting] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      if (data.user) {
        fetchReviews(data.user.id)
        fetchProfile(data.user.id)
      }
    })
  }, [])

  const fetchProfile = async (userId) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    if (data) {
      setProfile(data)
      if (!data.onboarding_done) {
        window.location.href = '/onboarding'
      }
    } else {
      window.location.href = '/onboarding'
    }
  }

  const fetchReviews = async (userId) => {
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (data) setReviews(data)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  const stars = (rating) => '⭐'.repeat(rating)

  const isTrialExpired = () => {
    if (!profile) return false
    if (profile.subscription_status === 'active') return false
    const createdAt = new Date(profile.created_at)
    const now = new Date()
    const diffDays = (now - createdAt) / (1000 * 60 * 60 * 24)
    return diffDays > 14
  }

  const trialDaysLeft = () => {
    if (!profile) return 14
    const createdAt = new Date(profile.created_at)
    const now = new Date()
    const diffDays = (now - createdAt) / (1000 * 60 * 60 * 24)
    return Math.max(0, 14 - Math.floor(diffDays))
  }

  const handleConnectGoogle = async () => {
    if (!placeId.trim()) return alert('Place ID enter karo!')
    setConnecting(true)
    try {
      const res = await fetch('/api/fetch-reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, place_id: placeId.trim() })
      })
      const data = await res.json()
      if (res.ok) {
        alert(`✅ ${data.count} reviews imported as FOMO notifications!`)
      } else {
        alert('❌ Error: ' + data.error)
      }
    } catch (e) {
      alert('❌ Network error')
    }
    setConnecting(false)
  }

  const widgetCode = user ? `<script src="https://popproof.io/widget.js" data-user-id="${user.id}"></script>` : 'Loading...'
  const reviewLink = user ? `https://popproof.io/review?uid=${user.id}` : ''

  const handleCopy = () => {
    navigator.clipboard.writeText(widgetCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopyReviewLink = () => {
    navigator.clipboard.writeText(reviewLink)
    setReviewLinkCopied(true)
    setTimeout(() => setReviewLinkCopied(false), 2000)
  }

  const trialExpired = isTrialExpired()
  const daysLeft = trialDaysLeft()

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Comic+Neue:wght@400;700&display=swap" rel="stylesheet" />
      <div style={{
        minHeight: '100vh',
        background: '#0d0a1a',
        backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.025) 1px,transparent 1px)',
        backgroundSize: '22px 22px',
      }}>

        {/* NAV */}
        <nav style={{ background: '#0d0a1a', borderBottom: '3px solid #111', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <img src="/popproof-logo.png" alt="Popproof" style={{ height: '34px', objectFit: 'contain' }} />
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>{user?.email}</span>
            <button onClick={handleLogout} style={{
              fontFamily: "'Bangers', cursive",
              fontSize: '16px',
              letterSpacing: '1px',
              padding: '8px 20px',
              background: 'transparent',
              color: 'white',
              border: '3px solid #ff4444',
              borderRadius: '6px',
              cursor: 'pointer',
              boxShadow: '3px 3px 0 #ff4444',
            }}>LOGOUT</button>
          </div>
        </nav>

        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '40px 24px' }}>

          {/* WELCOME BANNER */}
          <div style={{ background: '#1a1030', border: '3px solid rgba(124,58,237,0.4)', borderRadius: '14px', padding: '20px 24px', marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '22px', color: 'white', letterSpacing: '1px' }}>
                👋 WELCOME BACK!
              </div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontWeight: 700, marginTop: '4px' }}>
                {profile?.business_name ? `🏢 ${profile.business_name}` : user?.email}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {profile?.subscription_status === 'active' ? (
                <span style={{ fontFamily: "'Bangers', cursive", fontSize: '16px', letterSpacing: '1px', padding: '6px 16px', background: '#00bb77', border: '3px solid #111', borderRadius: '20px', color: 'white', boxShadow: '3px 3px 0 #111' }}>✅ ACTIVE</span>
              ) : trialExpired ? (
                <span style={{ fontFamily: "'Bangers', cursive", fontSize: '16px', letterSpacing: '1px', padding: '6px 16px', background: '#ff4444', border: '3px solid #111', borderRadius: '20px', color: 'white', boxShadow: '3px 3px 0 #111' }}>❌ EXPIRED</span>
              ) : (
                <span style={{ fontFamily: "'Bangers', cursive", fontSize: '16px', letterSpacing: '1px', padding: '6px 16px', background: '#f59e0b', border: '3px solid #111', borderRadius: '20px', color: 'white', boxShadow: '3px 3px 0 #111' }}>⏳ {daysLeft} DAYS LEFT</span>
              )}
            </div>
          </div>

          {/* TRIAL EXPIRED */}
          {trialExpired && (
            <div style={{ background: '#1a0a0a', border: '3px solid #ff4444', borderRadius: '14px', padding: '30px', marginBottom: '28px', textAlign: 'center', boxShadow: '5px 5px 0 #ff4444' }}>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '32px', color: '#ff4444', letterSpacing: '1px', marginBottom: '8px' }}>⚠️ TRIAL EXPIRED!</div>
              <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '20px', fontSize: '14px' }}>Subscribe to keep your widget active and keep converting visitors!</p>
              <button onClick={() => window.location.href = '/pricing'} style={{
                fontFamily: "'Bangers', cursive",
                fontSize: '20px',
                letterSpacing: '1px',
                padding: '12px 32px',
                background: '#7c3aed',
                color: 'white',
                border: '3px solid #111',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '5px 5px 0 #111',
              }}>🚀 SUBSCRIBE NOW — €19/MONTH</button>
            </div>
          )}

          {/* WIDGET CODE */}
          {!trialExpired && (
            <div style={{ background: '#1a1030', border: '3px solid rgba(124,58,237,0.4)', borderRadius: '14px', padding: '24px', marginBottom: '24px', boxShadow: '5px 5px 0 rgba(124,58,237,0.3)' }}>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '22px', color: 'white', letterSpacing: '1px', marginBottom: '6px' }}>🚀 YOUR FOMO WIDGET</div>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: 700, marginBottom: '16px' }}>Paste this code before the closing &lt;/body&gt; tag on your website:</p>
              <div style={{ background: '#0a0614', border: '2px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '16px', marginBottom: '14px', overflowX: 'auto' }}>
                <code style={{ color: '#a78bfa', fontSize: '12px', whiteSpace: 'nowrap', fontFamily: 'monospace' }}>
                  {widgetCode}
                </code>
              </div>
              <button onClick={handleCopy} style={{
                fontFamily: "'Bangers', cursive",
                fontSize: '16px',
                letterSpacing: '1px',
                padding: '10px 24px',
                background: copied ? '#00bb77' : '#7c3aed',
                color: 'white',
                border: '3px solid #111',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '3px 3px 0 #111',
                transition: 'all 0.15s',
              }}>
                {copied ? '✅ COPIED!' : '📋 COPY CODE'}
              </button>
            </div>
          )}

          {/* REVIEW LINK */}
          <div style={{ background: '#1a1030', border: '3px solid rgba(124,58,237,0.4)', borderRadius: '14px', padding: '24px', marginBottom: '24px', boxShadow: '5px 5px 0 rgba(124,58,237,0.3)' }}>
            <div style={{ fontFamily: "'Bangers', cursive", fontSize: '22px', color: 'white', letterSpacing: '1px', marginBottom: '6px' }}>⭐ YOUR REVIEW LINK</div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: 700, marginBottom: '16px' }}>Share this link with customers to collect reviews:</p>
            <div style={{ background: '#0a0614', border: '2px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '16px', marginBottom: '14px', overflowX: 'auto' }}>
              <code style={{ color: '#a78bfa', fontSize: '12px', whiteSpace: 'nowrap', fontFamily: 'monospace' }}>
                {reviewLink}
              </code>
            </div>
            <button onClick={handleCopyReviewLink} style={{
              fontFamily: "'Bangers', cursive",
              fontSize: '16px',
              letterSpacing: '1px',
              padding: '10px 24px',
              background: reviewLinkCopied ? '#00bb77' : '#7c3aed',
              color: 'white',
              border: '3px solid #111',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '3px 3px 0 #111',
              transition: 'all 0.15s',
            }}>
              {reviewLinkCopied ? '✅ COPIED!' : '📋 COPY REVIEW LINK'}
            </button>
          </div>

          {/* GOOGLE BUSINESS CONNECT */}
          <div style={{ background: '#1a1030', border: '3px solid rgba(255,224,51,0.4)', borderRadius: '14px', padding: '24px', marginBottom: '24px', boxShadow: '5px 5px 0 rgba(255,224,51,0.3)' }}>
            <div style={{ fontFamily: "'Bangers', cursive", fontSize: '22px', color: '#FFE033', letterSpacing: '1px', marginBottom: '6px' }}>🔗 CONNECT GOOGLE BUSINESS</div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>Enter your Google Place ID to import reviews as FOMO notifications.</p>
            <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '12px', marginBottom: '16px' }}>
              Find your Place ID at: <a href="https://developers.google.com/maps/documentation/places/web-service/place-id" target="_blank" rel="noreferrer" style={{ color: '#FFE033' }}>developers.google.com/maps/place-id</a>
            </p>
            <input
              type="text"
              placeholder="e.g. ChIJN1t_tDeuEmsRUsoyG83frY4"
              value={placeId}
              onChange={(e) => setPlaceId(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: '#0a0614',
                border: '2px solid rgba(255,224,51,0.3)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '13px',
                fontFamily: 'monospace',
                marginBottom: '14px',
                boxSizing: 'border-box',
              }}
            />
            <button
              onClick={handleConnectGoogle}
              disabled={connecting}
              style={{
                fontFamily: "'Bangers', cursive",
                fontSize: '16px',
                letterSpacing: '1px',
                padding: '10px 24px',
                background: connecting ? '#555' : '#FFE033',
                color: '#111',
                border: '3px solid #111',
                borderRadius: '8px',
                cursor: connecting ? 'not-allowed' : 'pointer',
                boxShadow: '3px 3px 0 #111',
              }}>
              {connecting ? '⏳ CONNECTING...' : '🔗 CONNECT & IMPORT REVIEWS'}
            </button>
          </div>

          {/* REVIEWS */}
          <div style={{ background: '#1a1030', border: '3px solid rgba(124,58,237,0.4)', borderRadius: '14px', padding: '24px', boxShadow: '5px 5px 0 rgba(124,58,237,0.3)' }}>
            <div style={{ fontFamily: "'Bangers', cursive", fontSize: '22px', color: 'white', letterSpacing: '1px', marginBottom: '16px' }}>
              ⭐ REVIEWS ({reviews.length})
            </div>
            {reviews.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>📭</div>
                <p style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 700, fontSize: '14px' }}>No reviews yet. Share your review link to get started!</p>
              </div>
            ) : (
              reviews.map((review) => (
                <div key={review.id} style={{ background: '#0a0614', border: '2px solid rgba(124,58,237,0.2)', borderRadius: '10px', padding: '16px', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                    <strong style={{ color: 'white', fontSize: '14px' }}>{review.customer_name}</strong>
                    <span>{stars(review.rating)}</span>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '6px', fontSize: '13px', lineHeight: 1.5 }}>{review.review_text}</p>
                  <small style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px' }}>{review.customer_email}</small>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </>
  )
}