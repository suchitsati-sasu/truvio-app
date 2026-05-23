import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    const { data } = await supabase.from('reviews').select('*').order('created_at', { ascending: false })
    if (data) setReviews(data)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  const stars = (rating) => '⭐'.repeat(rating)

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#00c6ff' }}>Truvio Dashboard</h1>
        <button onClick={handleLogout} style={{ padding: '10px 20px', background: '#ff4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '12px', marginBottom: '30px' }}>
        <p>Welcome back! 👋 <strong>{user?.email}</strong></p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Reviews ({reviews.length})</h2>
        <a href="/review" style={{ padding: '10px 20px', background: '#00c6ff', color: 'white', borderRadius: '8px', textDecoration: 'none' }}>
          + Get Review Link
        </a>
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