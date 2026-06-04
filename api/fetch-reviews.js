const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { user_id, place_id } = req.body;

  if (!user_id || !place_id) {
    return res.status(400).json({ error: 'user_id and place_id required' });
  }

  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const url = `https://places.googleapis.com/v1/places/${place_id}?fields=reviews,displayName,rating&key=${apiKey}`;

    const response = await fetch(url, {
      headers: { 'X-Goog-Api-Key': apiKey }
    });

    const data = await response.json();

    if (!data.reviews || data.reviews.length === 0) {
      return res.status(200).json({ message: 'No reviews found', count: 0 });
    }

    const notifications = data.reviews.map((review) => ({
      user_id,
      type: 'review',
      customer_name: review.authorAttribution?.displayName || 'Someone',
      message: `left a ${review.rating}⭐ review on Google!`,
      source: 'google',
      created_at: new Date().toISOString(),
    }));

    const { error } = await supabase
      .from('notifications')
      .upsert(notifications, { onConflict: 'user_id,customer_name,source' });

    if (error) throw error;

    return res.status(200).json({ 
      message: 'Reviews fetched and saved!', 
      count: notifications.length 
    });

  } catch (err) {
    console.error('fetch-reviews error:', err);
    return res.status(500).json({ error: err.message });
  }
};