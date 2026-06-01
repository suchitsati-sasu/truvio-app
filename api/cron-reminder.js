import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export default async function handler(req, res) {
  // Security check — sirf Vercel cron call kar sake
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const now = new Date()

  // Woh users jo Day 12 ya Day 13 pe hain (trial mein)
  const day12Start = new Date(now)
  day12Start.setDate(day12Start.getDate() - 13)
  day12Start.setHours(0, 0, 0, 0)

  const day12End = new Date(now)
  day12End.setDate(day12End.getDate() - 12)
  day12End.setHours(23, 59, 59, 999)

  // Profiles fetch karo jinka created_at Day 12-13 range mein hai
  const { data: users, error } = await supabase
    .from('profiles')
    .select('id, email, business_name, created_at, subscription_status')
    .gte('created_at', day12Start.toISOString())
    .lte('created_at', day12End.toISOString())
    .eq('subscription_status', 'trial')

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  if (!users || users.length === 0) {
    return res.status(200).json({ message: 'No users to remind today', count: 0 })
  }

  const results = []

  for (const user of users) {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/api/send-reminder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          business_name: user.business_name,
        }),
      })

      const data = await response.json()
      results.push({ email: user.email, status: 'sent', data })
    } catch (err) {
      results.push({ email: user.email, status: 'failed', error: err.message })
    }
  }

  return res.status(200).json({
    message: `Reminders sent to ${results.length} users`,
    results,
  })
}