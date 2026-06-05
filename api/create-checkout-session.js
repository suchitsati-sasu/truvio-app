const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end()

  const { userId, email } = req.body

  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('had_trial')
      .eq('id', userId)
      .single()

    const alreadyHadTrial = profile?.had_trial === true

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: email,
      metadata: { userId },
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      subscription_data: {
        ...(alreadyHadTrial ? {} : { trial_period_days: 14 }),
        metadata: { userId },
      },
      success_url: `${process.env.REACT_APP_URL}/dashboard?payment=success`,
      cancel_url: `${process.env.REACT_APP_URL}/pricing?payment=cancelled`,
    })

    if (!alreadyHadTrial) {
      await supabase
        .from('profiles')
        .update({ had_trial: true })
        .eq('id', userId)
    }

    res.json({ url: session.url })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}