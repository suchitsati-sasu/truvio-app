import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

const NOTIFICATION_TEMPLATES = {
  european: {
    names: ['Anna', 'Maria', 'Janis', 'Liga', 'Marta', 'Peters', 'Elina', 'Karlis', 'Ilze', 'Andris', 'Sophie', 'Lucas', 'Emma', 'Noah', 'Olivia', 'Liam', 'Isabella', 'Oliver', 'Ava', 'Elijah', 'Mia', 'James', 'Charlotte', 'Aiden', 'Amelia'],
    cities: {
      'Riga': ['Riga', 'Jurmala', 'Ogre', 'Salaspils', 'Sigulda'],
      'London': ['London', 'Greenwich', 'Hackney', 'Brixton', 'Shoreditch'],
      'Berlin': ['Berlin', 'Mitte', 'Prenzlauer Berg', 'Kreuzberg', 'Friedrichshain'],
      'Paris': ['Paris', 'Montmartre', 'Marais', 'Belleville', 'Bastille'],
      'Amsterdam': ['Amsterdam', 'Jordaan', 'De Pijp', 'Centrum', 'Oost'],
    }
  },
  indian: {
    names: ['Priya', 'Rahul', 'Anjali', 'Amit', 'Pooja', 'Raj', 'Neha', 'Vikram', 'Sunita', 'Arjun', 'Divya', 'Karan', 'Meera', 'Rohan', 'Sneha', 'Aditya', 'Kavya', 'Nikhil', 'Ishaan', 'Riya'],
    cities: {
      'Mumbai': ['Andheri', 'Bandra', 'Juhu', 'Thane', 'Borivali'],
      'Delhi': ['Connaught Place', 'Lajpat Nagar', 'Hauz Khas', 'Dwarka', 'Rohini'],
      'Bangalore': ['Koramangala', 'Indiranagar', 'Whitefield', 'HSR Layout', 'Jayanagar'],
    }
  }
}

const ACTIONS = [
  'just booked an appointment! ⭐',
  'left a 5★ review!',
  'just signed up!',
  'loved the service! 😍',
  'booked a slot! 🎉',
  'left a glowing review! ⭐⭐⭐⭐⭐',
  'just visited!',
  'recommended this place! 👍',
]

const TIMES = ['just now', '1 min ago', '2 mins ago', '3 mins ago', '5 mins ago', '8 mins ago', '10 mins ago']

function generateNotifications(city) {
  const notifications = []
  const europeanNames = [...NOTIFICATION_TEMPLATES.european.names]
  const indianNames = [...NOTIFICATION_TEMPLATES.indian.names]
  
  // Find cities list
  let europeanCities = ['Riga', 'Jurmala', 'Ogre']
  for (const [key, val] of Object.entries(NOTIFICATION_TEMPLATES.european.cities)) {
    if (city === key) europeanCities = val
  }

  let indianCities = ['Mumbai', 'Delhi', 'Bangalore']
  for (const [key, val] of Object.entries(NOTIFICATION_TEMPLATES.indian.cities)) {
    if (city === key) indianCities = val
  }

  // 130 European
  for (let i = 0; i < 130; i++) {
    const name = europeanNames[Math.floor(Math.random() * europeanNames.length)]
    const fromCity = europeanCities[Math.floor(Math.random() * europeanCities.length)]
    const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)]
    const time = TIMES[Math.floor(Math.random() * TIMES.length)]
    notifications.push(`${name} from ${fromCity} ${action} — ${time}`)
  }

  // 20 Indian
  for (let i = 0; i < 20; i++) {
    const name = indianNames[Math.floor(Math.random() * indianNames.length)]
    const fromCity = indianCities[Math.floor(Math.random() * indianCities.length)]
    const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)]
    const time = TIMES[Math.floor(Math.random() * TIMES.length)]
    notifications.push(`${name} from ${fromCity} ${action} — ${time}`)
  }

  return notifications.sort(() => Math.random() - 0.5)
}

export default function Notifications() {
  const [notifications, setNotifications] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [city, setCity] = useState('Riga')
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    const { data } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    setNotifications(data || [])
  }

  const handleGenerate = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    const msgs = generateNotifications(city)
    
    const rows = msgs.map(msg => ({ user_id: user.id, message: msg, is_active: true }))
    
    const { error } = await supabase.from('notifications').insert(rows)
    
    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      setMessage(`✅ ${msgs.length} notifications generated!`)
      setGenerated(true)
      fetchNotifications()
    }
    setLoading(false)
  }

  const handleAdd = async () => {
    if (!newMessage.trim()) return
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    
    await supabase.from('notifications').insert({
      user_id: user.id,
      message: newMessage,
      is_active: true
    })
    
    setNewMessage('')
    setMessage('✅ Notification added!')
    fetchNotifications()
    setLoading(false)
  }

  const handleDelete = async (id) => {
    await supabase.from('notifications').delete().eq('id', id)
    fetchNotifications()
  }

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>🔔 FOMO Notifications</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>Manage notifications shown on your widget</p>

      {/* Generate Section */}
      <div style={{ background: '#f0f9ff', border: '2px solid #00c6ff', borderRadius: '12px', padding: '24px', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>⚡ Auto-Generate 150 Notifications</h2>
        
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Your City/Region:</label>
            <select
              value={city}
              onChange={e => setCity(e.target.value)}
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '16px' }}
            >
              <optgroup label="🇱🇻 Latvia">
                <option value="Riga">Riga</option>
              </optgroup>
              <optgroup label="🇬🇧 UK">
                <option value="London">London</option>
              </optgroup>
              <optgroup label="🇩🇪 Germany">
                <option value="Berlin">Berlin</option>
              </optgroup>
              <optgroup label="🇫🇷 France">
                <option value="Paris">Paris</option>
              </optgroup>
              <optgroup label="🇳🇱 Netherlands">
                <option value="Amsterdam">Amsterdam</option>
              </optgroup>
              <optgroup label="🇮🇳 India">
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
              </optgroup>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || generated}
          style={{ padding: '12px 24px', background: generated ? '#ccc' : '#00c6ff', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: generated ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
        >
          {loading ? 'Generating...' : generated ? '✅ Already Generated' : '⚡ Generate 150 Notifications'}
        </button>
        
        {message && <p style={{ marginTop: '12px', color: '#00c6ff', fontWeight: 'bold' }}>{message}</p>}
      </div>

      {/* Add Custom */}
      <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '12px', padding: '24px', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>✏️ Add Custom Notification</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <input
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            placeholder="e.g. Sara just booked a haircut! ⭐"
            style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '16px' }}
          />
          <button
            onClick={handleAdd}
            disabled={loading}
            style={{ padding: '10px 20px', background: '#00c6ff', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Add
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '12px', padding: '24px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>📋 Your Notifications ({notifications.length})</h2>
        {notifications.length === 0 ? (
          <p style={{ color: '#999' }}>No notifications yet. Generate some above!</p>
        ) : (
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {notifications.map(n => (
              <div key={n.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #f0f0f0' }}>
                <span style={{ fontSize: '14px' }}>{n.message}</span>
                <button
                  onClick={() => handleDelete(n.id)}
                  style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', fontSize: '18px' }}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}