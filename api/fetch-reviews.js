const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end()

  const { user_id, place_id } = req.body
  if (!user_id || !place_id) {
    return res.status(400).json({ error: 'user_id and place_id required' })
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user_id)
    .single()

  if (profileError || !profile) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${place_id}`,
      {
        headers: {
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'reviews'
        }
      }
    )

    const data = await response.json()

    if (!data.reviews) {
      return res.status(404).json({ error: 'No reviews found' })
    }

    const filtered = data.reviews.filter(r => r.rating >= 4)

    const notifications = filtered.map(review => ({
      user_id,
      customer_name: review.authorAttribution?.displayName || 'Someone',
      message: `left a ${review.rating}⭐ review on Google!`,
      source: 'google',
      type: 'review',
      is_active: true,
      created_at: new Date().toISOString()
    }))

    const { error } = await supabase
      .from('notifications')
      .upsert(notifications, { onConflict: 'user_id,customer_name,source' })

    if (error) throw error

    return res.status(200).json({
      message: 'Reviews fetched and saved!',
      count: notifications.length
    })

  } catch (err) {
    console.error('fetch-reviews error:', err)
    return res.status(500).json({ error: err.message })
  }
}