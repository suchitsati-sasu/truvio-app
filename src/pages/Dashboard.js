import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Dashboard() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#00c6ff' }}>Truvio Dashboard</h1>
        <button
          onClick={handleLogout}
          style={{ padding: '10px 20px', background: '#ff4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          Logout
        </button>
      </div>
      <div style={{ background: '#f8f9fa', padding: '30px', borderRadius: '12px' }}>
        <h2>Welcome! 👋</h2>
        <p>Email: {user?.email}</p>
        <p style={{ color: '#718096', marginTop: '20px' }}>Your dashboard will be here. Reviews, customers — everything will show up here!</p>
      </div>
    </div>
  )
}