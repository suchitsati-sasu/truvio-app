const Stripe = require('stripe')
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end()

  const { user_id } = req.body
  if (!user_id) return res.status(400).json({ error: 'user_id required' })

  try {
    // Supabase se stripe_customer_id lo
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id, subscription_status')
      .eq('id', user_id)
      .single()

    if (!profile?.stripe_customer_id) {
      return res.status(400).json({ error: 'No subscription found' })
    }

    // Active subscription dhundo
    const subscriptions = await stripe.subscriptions.list({
      customer: profile.stripe_customer_id,
      status: 'all',
      limit: 1
    })

    if (!subscriptions.data.length) {
      return res.status(400).json({ error: 'No subscription found' })
    }

    const sub = subscriptions.data[0]

    // Period end pe cancel karo (abhi nahi, cycle end pe)
    await stripe.subscriptions.update(sub.id, {
      cancel_at_period_end: true
    })

    res.status(200).json({ 
      success: true, 
      cancel_at: sub.current_period_end 
    })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}