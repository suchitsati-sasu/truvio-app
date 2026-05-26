import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

export default function ReviewForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [rating, setRating] = useState(5)
  const [reviewText, setReviewText] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [ownerId, setOwnerId] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const uid = params.get('uid')
    if (uid) setOwnerId(uid)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('reviews').insert([{
      customer_name: name,
      customer_email: email,
      rating: rating,
      review_text: reviewText,
      user_id: ownerId
    }])
    if (!error) {
      await supabase.functions.invoke('send-review-email', {
        body: {
          customerName: name,
          rating: rating,
          reviewText: reviewText,
          ownerEmail: 'suchitsati@gmail.com'
        }
      })
      setSubmitted(true)
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <div style={{ maxWidth: '500px', margin: '100px auto', textAlign: 'center', padding: '40px' }}>
        <h2 style={{ color: '#00c6ff' }}>Thank you! 🎉</h2>
        <p>Your review has been submitted successfully!</p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '40px', boxShadow: '0 0 20px rgba(0,0,0,0.1)', borderRadius: '12px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Leave a Review</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
        <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Rating: {rating} ⭐</label>
          <input type="range" min="1" max="5" value={rating} onChange={(e) => setRating(parseInt(e.target.value))} style={{ width: '100%' }} />
        </div>
        <textarea placeholder="Write your review here..." value={reviewText} onChange={(e) => setReviewText(e.target.value)} required rows={4} style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box', resize: 'vertical' }} />
        <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', background: '#00c6ff', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}>
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  )
}
