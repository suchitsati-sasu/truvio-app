import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

const TEMPLATES = {
  salon: ['just booked a haircut! ✂️', 'just booked a blow dry! 💇', 'just booked a hair color! 🎨', 'just booked a manicure! 💅', 'just booked a facial! ✨', 'left a 5★ review! ⭐', 'just booked an appointment! 📅', 'loved the service! 😍'],
  cafe: ['just visited! 😊', 'left a 5★ review! ⭐', 'just placed an order! 🛍️', 'just checked in! 📍', 'loved the experience! 😍', 'recommended this place! 👍', 'just made a reservation! 📅', 'had an amazing time! 🎉'],
  ecommerce: ['just purchased! 🛍️', 'just placed an order! 📦', 'left a 5★ review! ⭐', 'just bought this! 🔥', 'added to cart! 🛒', 'loved the product! 😍'],
  fitness: ['just booked a class! 💪', 'just joined! 🏋️', 'left a 5★ review! ⭐', 'just completed a session! ✅', 'loved the workout! 🔥'],
  clinic: ['just booked an appointment! 📅', 'left a 5★ review! ⭐', 'just checked in! 📍', 'loved the service! 😍', 'highly recommended! 👍'],
  other: ['just visited! 😊', 'just signed up! 🎉', 'left a 5★ review! ⭐', 'just joined! ✅', 'loved the experience! 😍', 'highly recommended! 👍']
}

const REGIONS = {
  europe: {
    names: ['Anna', 'Janis', 'Liga', 'Marta', 'Peters', 'Sophie', 'James', 'Emma', 'Oliver', 'Lena', 'Felix', 'Hannah', 'Lukas', 'Camille', 'Lucas', 'Sem', 'Julia', 'Daan', 'Lotte', 'Lars', 'Marie', 'Leon', 'Elina', 'Karlis', 'Ilze'],
    keywords: ['riga', 'latvia', 'london', 'uk', 'england', 'berlin', 'germany', 'paris', 'france', 'amsterdam', 'netherlands', 'madrid', 'spain', 'rome', 'italy', 'vienna', 'austria', 'warsaw', 'poland', 'stockholm', 'sweden', 'oslo', 'norway', 'copenhagen', 'denmark', 'helsinki', 'finland', 'zurich', 'switzerland', 'brussels', 'belgium', 'lisbon', 'portugal', 'prague', 'czech', 'budapest', 'hungary', 'bucharest', 'romania', 'sofia', 'bulgaria', 'athens', 'greece', 'zagreb', 'croatia', 'europe', 'salzburg', 'graz', 'innsbruck', 'munich', 'hamburg', 'frankfurt', 'cologne', 'milan', 'florence', 'barcelona', 'seville', 'lyon', 'marseille'],
    nearbyCities: {
      'vienna': ['Salzburg', 'Graz', 'Innsbruck', 'Linz', 'Klagenfurt'],
      'riga': ['Jurmala', 'Ogre', 'Salaspils', 'Sigulda', 'Jelgava'],
      'london': ['Greenwich', 'Hackney', 'Brixton', 'Shoreditch', 'Richmond'],
      'berlin': ['Potsdam', 'Mitte', 'Kreuzberg', 'Prenzlauer Berg', 'Spandau'],
      'paris': ['Versailles', 'Montmartre', 'Marais', 'Belleville', 'Saint-Denis'],
      'amsterdam': ['Haarlem', 'Utrecht', 'Leiden', 'Delft', 'Rotterdam'],
      'madrid': ['Toledo', 'Segovia', 'Alcala', 'Getafe', 'Leganes'],
      'rome': ['Vatican', 'Tivoli', 'Ostia', 'Frascati', 'Albano'],
      'barcelona': ['Badalona', 'Sabadell', 'Terrassa', 'Hospitalet', 'Mataro'],
      'munich': ['Augsburg', 'Ingolstadt', 'Regensburg', 'Freising', 'Landshut'],
      'milan': ['Monza', 'Bergamo', 'Brescia', 'Pavia', 'Como'],
      'warsaw': ['Lodz', 'Krakow', 'Poznan', 'Gdansk', 'Wroclaw'],
      'stockholm': ['Uppsala', 'Vasteras', 'Orebro', 'Linkoping', 'Norrkoping'],
    }
  },
  south_asia: {
    names: ['Priya', 'Rahul', 'Aditi', 'Rohan', 'Pooja', 'Amit', 'Neha', 'Vikram', 'Anjali', 'Karan', 'Divya', 'Arjun', 'Sneha', 'Aditya', 'Meera', 'Ishaan', 'Riya', 'Aarav', 'Ananya', 'Karthik'],
    keywords: ['mumbai', 'delhi', 'bangalore', 'india', 'kolkata', 'chennai', 'hyderabad', 'pune', 'ahmedabad', 'jaipur', 'karachi', 'pakistan', 'dhaka', 'bangladesh', 'colombo', 'sri lanka', 'kathmandu', 'nepal'],
    nearbyCities: {
      'mumbai': ['Andheri', 'Bandra', 'Juhu', 'Thane', 'Borivali'],
      'delhi': ['Connaught Place', 'Lajpat Nagar', 'Hauz Khas', 'Dwarka', 'Noida'],
      'bangalore': ['Koramangala', 'Indiranagar', 'Whitefield', 'HSR Layout', 'Jayanagar'],
      'pune': ['Kothrud', 'Hinjewadi', 'Baner', 'Koregaon Park', 'Viman Nagar'],
      'chennai': ['Adyar', 'Anna Nagar', 'T Nagar', 'Mylapore', 'Velachery'],
      'hyderabad': ['Banjara Hills', 'Jubilee Hills', 'Gachibowli', 'Madhapur', 'Kukatpally'],
    }
  },
  middle_east: {
    names: ['Mohammed', 'Fatima', 'Ahmed', 'Aisha', 'Omar', 'Sara', 'Ali', 'Nour', 'Hassan', 'Layla', 'Khalid', 'Maryam', 'Yusuf', 'Hana', 'Ibrahim'],
    keywords: ['dubai', 'abu dhabi', 'uae', 'saudi', 'riyadh', 'jeddah', 'kuwait', 'qatar', 'doha', 'bahrain', 'muscat', 'oman', 'beirut', 'lebanon', 'amman', 'jordan', 'cairo', 'egypt'],
    nearbyCities: {
      'dubai': ['Dubai Marina', 'Downtown Dubai', 'Jumeirah', 'Deira', 'Business Bay'],
      'riyadh': ['Al Malaz', 'Al Olaya', 'Al Sulaimaniyah', 'Diriyah', 'Al Rawdah'],
      'cairo': ['Zamalek', 'Maadi', 'Heliopolis', 'Nasr City', 'New Cairo'],
    }
  },
  east_asia: {
    names: ['Wei', 'Yuki', 'Min', 'Sakura', 'Hiroshi', 'Ji', 'Mei', 'Kenji', 'Soo', 'Yuna', 'Taro', 'Hana', 'Ryu', 'Mio', 'Park'],
    keywords: ['tokyo', 'japan', 'beijing', 'shanghai', 'china', 'seoul', 'korea', 'taipei', 'taiwan', 'hong kong', 'singapore', 'bangkok', 'thailand', 'jakarta', 'indonesia', 'manila', 'philippines', 'kuala lumpur', 'malaysia'],
    nearbyCities: {
      'tokyo': ['Yokohama', 'Kawasaki', 'Saitama', 'Chiba', 'Osaka'],
      'beijing': ['Tianjin', 'Hebei', 'Langfang', 'Baoding', 'Zhangjiakou'],
      'seoul': ['Incheon', 'Suwon', 'Seongnam', 'Goyang', 'Bucheon'],
      'singapore': ['Jurong', 'Tampines', 'Woodlands', 'Ang Mo Kio', 'Bedok'],
    }
  },
  africa: {
    names: ['Amara', 'Kwame', 'Zara', 'Kofi', 'Nia', 'Seun', 'Adaeze', 'Chidi', 'Fatou', 'Moussa', 'Amina', 'Yaw', 'Abena', 'Emeka', 'Afia'],
    keywords: ['nigeria', 'lagos', 'abuja', 'ghana', 'accra', 'kenya', 'nairobi', 'south africa', 'johannesburg', 'cape town', 'ethiopia', 'addis ababa', 'tanzania', 'senegal', 'dakar', 'africa'],
    nearbyCities: {
      'lagos': ['Ikeja', 'Victoria Island', 'Lekki', 'Surulere', 'Yaba'],
      'nairobi': ['Westlands', 'Karen', 'Eastleigh', 'Kibera', 'Kasarani'],
      'johannesburg': ['Sandton', 'Soweto', 'Randburg', 'Midrand', 'Pretoria'],
    }
  },
  americas: {
    names: ['Carlos', 'Emma', 'Lucas', 'Sofia', 'Mateo', 'Isabella', 'Sebastian', 'Valentina', 'Liam', 'Olivia', 'Noah', 'Ava', 'William', 'Charlotte', 'James'],
    keywords: ['new york', 'usa', 'america', 'los angeles', 'chicago', 'houston', 'toronto', 'canada', 'vancouver', 'montreal', 'mexico', 'sao paulo', 'brazil', 'rio', 'buenos aires', 'argentina', 'bogota', 'colombia', 'lima', 'peru', 'santiago', 'chile'],
    nearbyCities: {
      'new york': ['Brooklyn', 'Queens', 'Bronx', 'Jersey City', 'Newark'],
      'toronto': ['Mississauga', 'Brampton', 'Scarborough', 'North York', 'Etobicoke'],
      'sao paulo': ['Guarulhos', 'Santo Andre', 'Osasco', 'Campinas', 'Santos'],
      'los angeles': ['Hollywood', 'Santa Monica', 'Pasadena', 'Long Beach', 'Burbank'],
    }
  }
}

const OTHER_EUROPEAN_CITIES = ['London', 'Paris', 'Berlin', 'Amsterdam', 'Madrid', 'Rome', 'Barcelona', 'Munich', 'Warsaw', 'Stockholm', 'Oslo', 'Copenhagen', 'Helsinki', 'Zurich', 'Brussels', 'Lisbon', 'Prague', 'Budapest', 'Vienna', 'Milan']

const TIMES = ['just now', '1 min ago', '2 mins ago', '3 mins ago', '5 mins ago', '8 mins ago', '10 mins ago']

function detectRegion(city) {
  const cityLower = city.toLowerCase()
  for (const [region, data] of Object.entries(REGIONS)) {
    if (data.keywords.some(k => cityLower.includes(k))) {
      return region
    }
  }
  return 'europe'
}

function getNearbyCities(city, region) {
  const cityLower = city.toLowerCase()
  const regionData = REGIONS[region]
  for (const [key, cities] of Object.entries(regionData.nearbyCities || {})) {
    if (cityLower.includes(key)) return cities
  }
  return null
}

function generateNotifications(businessType, city) {
  const notifications = []
  const region = detectRegion(city)
  const names = REGIONS[region].names
  const actions = TEMPLATES[businessType] || TEMPLATES.other
  const nearbyCities = getNearbyCities(city, region)

  for (let i = 0; i < 150; i++) {
    const name = names[Math.floor(Math.random() * names.length)]
    const action = actions[Math.floor(Math.random() * actions.length)]
    const time = TIMES[Math.floor(Math.random() * TIMES.length)]

    const rand = Math.random()
    let fromCity

    if (rand < 0.75) {
      // 75% same city
      fromCity = city
    } else if (rand < 0.80 && nearbyCities) {
      // 5% nearby cities
      fromCity = nearbyCities[Math.floor(Math.random() * nearbyCities.length)]
    } else {
      // 20% other European/global cities
      const otherCities = OTHER_EUROPEAN_CITIES.filter(c => c.toLowerCase() !== city.toLowerCase())
      fromCity = otherCities[Math.floor(Math.random() * otherCities.length)]
    }

    notifications.push(`${name} from ${fromCity} ${action} — ${time}`)
  }

  return notifications.sort(() => Math.random() - 0.5)
}

export default function Notifications() {
  const [notifications, setNotifications] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [businessType, setBusinessType] = useState('salon')
  const [city, setCity] = useState('')
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
    if (!city.trim()) {
      setMessage('⚠️ Please enter your city first!')
      return
    }
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()

    // Delete old notifications first
    await supabase.from('notifications').delete().eq('user_id', user.id)

    const msgs = generateNotifications(businessType, city)
    const rows = msgs.map(msg => ({ user_id: user.id, message: msg, is_active: true }))
    const { error } = await supabase.from('notifications').insert(rows)

    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      setMessage(`✅ 150 notifications generated for ${businessType} in ${city}!`)
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
      user_id: user.id, message: newMessage, is_active: true
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
      <p style={{ color: '#666', marginBottom: '30px' }}>Customized for your business type and location</p>

      <div style={{ background: '#f0f9ff', border: '2px solid #00c6ff', borderRadius: '12px', padding: '24px', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>⚡ Auto-Generate 150 Notifications</h2>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Business Type:</label>
            <select value={businessType} onChange={e => { setBusinessType(e.target.value); setGenerated(false) }}
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '16px' }}>
              <option value="salon">💇 Salon / Spa</option>
              <option value="cafe">☕ Cafe / Bar / Restaurant</option>
              <option value="ecommerce">🛍️ eCommerce / Shopify</option>
              <option value="fitness">🏋️ Gym / Fitness</option>
              <option value="clinic">🏥 Clinic / Doctor</option>
              <option value="other">🏪 Other Business</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Your City:</label>
            <input
              value={city}
              onChange={e => { setCity(e.target.value); setGenerated(false) }}
              placeholder="e.g. Riga, Mumbai, Dubai..."
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '16px', width: '200px' }}
            />
          </div>
        </div>

        <button onClick={handleGenerate} disabled={loading || generated}
          style={{ padding: '12px 24px', background: generated ? '#ccc' : '#00c6ff', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: generated ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}>
          {loading ? 'Generating...' : generated ? '✅ Already Generated' : '⚡ Generate 150 Notifications'}
        </button>

        {message && <p style={{ marginTop: '12px', color: message.includes('⚠️') ? 'orange' : '#00c6ff', fontWeight: 'bold' }}>{message}</p>}
      </div>

      <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '12px', padding: '24px', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>✏️ Add Custom Notification</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <input value={newMessage} onChange={e => setNewMessage(e.target.value)}
            placeholder="e.g. Sara just booked a haircut! ✂️"
            style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '16px' }} />
          <button onClick={handleAdd} disabled={loading}
            style={{ padding: '10px 20px', background: '#00c6ff', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }}>
            Add
          </button>
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '12px', padding: '24px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>📋 Your Notifications ({notifications.length})</h2>
        {notifications.length === 0 ? (
          <p style={{ color: '#999' }}>No notifications yet. Generate some above!</p>
        ) : (
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {notifications.map(n => (
              <div key={n.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #f0f0f0' }}>
                <span style={{ fontSize: '14px' }}>{n.message}</span>
                <button onClick={() => handleDelete(n.id)}
                  style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', fontSize: '18px' }}>
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