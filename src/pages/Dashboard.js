import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [reviews, setReviews] = useState([])
  const [copied, setCopied] = useState(false)
  const [reviewLinkCopied, setReviewLinkCopied] = useState(false)
  const [profile, setProfile] = useState(null)

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

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#00c6ff' }}>Popproof Dashboard</h1>
        <button onClick={handleLogout} style={{ padding: '10px 20px', background: '#ff4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '12px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p>Welcome back! 👋 <strong>{user?.email}</strong></p>
        <span style={{
          padding: '6px 14px',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: 'bold',
          background: profile?.subscription_status === 'active' ? '#00bb77' : trialExpired ? '#ff4444' : '#f59e0b',
          color: 'white'
        }}>
          {profile?.subscription_status === 'active' ? '✅ Active' : trialExpired ? '❌ Expired' : '⏳ Trial'}
        </span>
      </div>

      {trialExpired ? (
        <div style={{ background: '#fff5f5', border: '2px solid #ff4444', borderRadius: '12px', padding: '30px', marginBottom: '30px', textAlign: 'center' }}>
          <h2 style={{ color: '#ff4444', marginBottom: '12px' }}>⚠️ Your trial has expired!</h2>
          <p style={{ color: '#666', marginBottom: '20px' }}>Subscribe to continue using Popproof and keep your widget active.</p>
          <button
            onClick={() => window.location.href = '/pricing'}
            style={{ padding: '12px 30px', background: '#00c6ff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
          >
            🚀 Subscribe Now — €19/month
          </button>
        </div>
      ) : (
        <div style={{ background: 'white', border: '2px solid #00c6ff', borderRadius: '12px', padding: '24px', marginBottom: '30px' }}>
          <h2 style={{ marginBottom: '8px' }}>🚀 Your FOMO Widget</h2>
          <p style={{ color: '#666', marginBottom: '16px' }}>Paste this code before the closing &lt;/body&gt; tag on your website:</p>
          <div style={{ background: '#1a1a2e', borderRadius: '8px', padding: '16px', marginBottom: '12px', overflowX: 'auto' }}>
            <code style={{ color: '#00c6ff', fontSize: '13px', whiteSpace: 'nowrap' }}>
              {widgetCode}
            </code>
          </div>
          <button
            onClick={handleCopy}
            style={{ padding: '10px 24px', background: copied ? '#00bb77' : '#00c6ff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}
          >
            {copied ? '✅ Copied!' : '📋 Copy Code'}
          </button>
        </div>
      )}

      <div style={{ background: 'white', border: '2px solid #e2e8f0', borderRadius: '12px', padding: '24px', marginBottom: '30px' }}>
        <h2 style={{ marginBottom: '8px' }}>⭐ Your Review Link</h2>
        <p style={{ color: '#666', marginBottom: '16px' }}>Share this link with your customers to collect reviews:</p>
        <div style={{ background: '#f8f9fa', borderRadius: '8px', padding: '16px', marginBottom: '12px', overflowX: 'auto' }}>
          <code style={{ color: '#333', fontSize: '13px', whiteSpace: 'nowrap' }}>
            {reviewLink}
          </code>
        </div>
        <button
          onClick={handleCopyReviewLink}
          style={{ padding: '10px 24px', background: reviewLinkCopied ? '#00bb77' : '#00c6ff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}
        >
          {reviewLinkCopied ? '✅ Copied!' : '📋 Copy Review Link'}
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Reviews ({reviews.length})</h2>
      </div>
      {reviews.length === 0 ? (
        <p style={{ color: '#718096', textAlign: 'center', padding: '40px' }}>No reviews yet. Share your review link to get started!</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <strong>{review.customer_name}</strong>
              <span>{stars(review.rating)}</span>
            </div>
            <p style={{ color: '#4a5568', marginBottom: '8px' }}>{review.review_text}</p>
            <small style={{ color: '#718096' }}>{review.customer_email}</small>
          </div>
        ))
      )}
    </div>
  )
}