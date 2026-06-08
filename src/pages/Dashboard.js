import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [reviews, setReviews] = useState([])
  const [copied, setCopied] = useState(false)
  const [reviewLinkCopied, setReviewLinkCopied] = useState(false)
  const [profile, setProfile] = useState(null)
  const [placeId, setPlaceId] = useState('')
  const [connecting, setConnecting] = useState(false)
  const [cancelling, setCancelling] = useState(false)
  const [activePlatform, setActivePlatform] = useState('html')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      if (data.user) {
        fetchReviews(data.user.id)
        fetchProfile(data.user.id)
      }
    })
  }, [])

  const fetchProfile = async (userId) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    if (data) {
      setProfile(data)
      if (!data.onboarding_done) {
        window.location.href = '/onboarding'
      }
    } else {
      window.location.href = '/onboarding'
    }
  }

  const fetchReviews = async (userId) => {
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (data) setReviews(data)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  const handleCancelSubscription = async () => {
    const confirm = window.confirm('Are you sure you want to cancel? Your subscription will remain active until the end of the billing period.')
    if (!confirm) return
    setCancelling(true)
    try {
      const res = await fetch('/api/cancel-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id })
      })
      const data = await res.json()
      if (res.ok) {
        alert('✅ Subscription cancelled. You can use Popproof until the end of your billing period.')
      } else {
        alert('❌ Error: ' + data.error)
      }
    } catch (e) {
      alert('❌ Network error')
    }
    setCancelling(false)
  }

  const stars = (rating) => '⭐'.repeat(rating)

  const isTrialExpired = () => {
    if (!profile) return false
    if (profile.subscription_status === 'active') return false
    const createdAt = new Date(profile.created_at)
    const now = new Date()
    const diffDays = (now - createdAt) / (1000 * 60 * 60 * 24)
    return diffDays > 14
  }

  const trialDaysLeft = () => {
    if (!profile) return 14
    const createdAt = new Date(profile.created_at)
    const now = new Date()
    const diffDays = (now - createdAt) / (1000 * 60 * 60 * 24)
    return Math.max(0, 14 - Math.floor(diffDays))
  }

  const handleConnectGoogle = async () => {
    if (!placeId.trim()) return alert('Please enter your Place ID!')
    setConnecting(true)
    try {
      const res = await fetch('/api/fetch-reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, place_id: placeId.trim() })
      })
      const data = await res.json()
      if (res.ok) {
        alert(`✅ ${data.count} reviews imported as FOMO notifications!`)
      } else {
        alert('❌ Error: ' + data.error)
      }
    } catch (e) {
      alert('❌ Network error')
    }
    setConnecting(false)
  }

  const widgetCode = user ? `<script src="https://popproof.io/widget.js" data-user-id="${user.id}"></script>` : 'Loading...'
  const reviewLink = user ? `https://popproof.io/review?uid=${user.id}` : ''

  const handleCopy = () => {
    navigator.clipboard.writeText(widgetCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopyReviewLink = () => {
    navigator.clipboard.writeText(reviewLink)
    setReviewLinkCopied(true)
    setTimeout(() => setReviewLinkCopied(false), 2000)
  }

  const trialExpired = isTrialExpired()
  const daysLeft = trialDaysLeft()

  const platforms = [
    { id: 'html', label: '🌐 HTML' },
    { id: 'wordpress', label: '📝 WordPress' },
    { id: 'shopify', label: '🛍️ Shopify' },
    { id: 'wix', label: '🎨 Wix' },
    { id: 'squarespace', label: '⬜ Squarespace' },
    { id: 'webflow', label: '🔷 Webflow' },
    { id: 'framer', label: '⚡ Framer' },
    { id: 'weebly', label: '🟦 Weebly' },
    { id: 'godaddy', label: '🌍 GoDaddy' },
    { id: 'react', label: '⚛️ React / Next.js' },
  ]

  const installSteps = {
    html: [
      { step: 1, title: 'Open your HTML file', desc: 'Open your website\'s main HTML file (usually index.html) in any text editor such as VS Code, Notepad++, or Sublime Text.' },
      { step: 2, title: 'Find the closing </body> tag', desc: 'Use Ctrl+F (or Cmd+F on Mac) to search for </body>. This tag is usually near the very bottom of your file.' },
      { step: 3, title: 'Paste your widget code', desc: 'Copy your Popproof widget code above and paste it on the line directly before </body>.' },
      { step: 4, title: 'Save and upload', desc: 'Save your file (Ctrl+S), then re-upload it to your hosting provider (e.g. cPanel File Manager, FTP client like FileZilla). Your widget is now live!' },
    ],
    wordpress: [
      { step: 1, title: 'Install the WPCode plugin', desc: 'Go to your WordPress Admin → Plugins → Add New. Search for "WPCode — Insert Headers and Footers". Install and activate it. This is the safest way to add code without editing theme files.' },
      { step: 2, title: 'Open WPCode settings', desc: 'In your WordPress Admin sidebar, go to Code Snippets → Header & Footer.' },
      { step: 3, title: 'Paste in the Footer section', desc: 'Find the "Footer" text area. Paste your Popproof widget code here. This ensures it loads before </body> on every page.' },
      { step: 4, title: 'Save changes', desc: 'Click "Save Changes". Your widget will now appear on all pages of your WordPress site automatically.' },
    ],
    shopify: [
      { step: 1, title: 'Go to your Shopify Admin', desc: 'Log in to your Shopify store. In the left sidebar, click Online Store → Themes.' },
      { step: 2, title: 'Open the theme code editor', desc: 'Find your active theme and click the "..." (more actions) button → Edit Code. This opens the theme file editor.' },
      { step: 3, title: 'Open theme.liquid', desc: 'In the left panel under "Layout", click on theme.liquid. This is the main template file for your entire store.' },
      { step: 4, title: 'Find </body> and paste', desc: 'Use Ctrl+F to search for </body>. Paste your Popproof widget code on the line just before it.' },
      { step: 5, title: 'Save', desc: 'Click the "Save" button in the top right corner. Your widget is now live on your entire Shopify store.' },
    ],
    wix: [
      { step: 1, title: 'Go to your Wix Dashboard', desc: 'Log in to Wix and go to your site\'s Dashboard (not the Editor). Make sure your site has a connected custom domain — custom code requires a paid plan.' },
      { step: 2, title: 'Open Custom Code settings', desc: 'In the left sidebar, click Settings → scroll down to find "Custom Code" under the Advanced section.' },
      { step: 3, title: 'Add new custom code', desc: 'Click "+ Add Custom Code" in the top right. A panel will open where you can paste your code.' },
      { step: 4, title: 'Configure and paste', desc: 'Paste your Popproof widget code in the text box. Give it a name like "Popproof Widget". Under "Place Code in", select Body — End. Set "Add Code to Pages" to All Pages.' },
      { step: 5, title: 'Apply and publish', desc: 'Click Apply. Then publish your site for the changes to go live.' },
    ],
    squarespace: [
      { step: 1, title: 'Go to your Squarespace settings', desc: 'Log in to Squarespace. In the left sidebar, click Settings.' },
      { step: 2, title: 'Open Advanced settings', desc: 'Scroll down and click Advanced → Code Injection. Note: Code Injection is only available on Business plan and above.' },
      { step: 3, title: 'Paste in the Footer field', desc: 'Find the "Footer" text area. Paste your Popproof widget code here. This injects the code before </body> on every page.' },
      { step: 4, title: 'Save', desc: 'Click Save. Your widget is now live across your entire Squarespace site.' },
    ],
    webflow: [
      { step: 1, title: 'Open your Webflow Project Settings', desc: 'Log in to Webflow. Open your project and click the "W" logo or go to Project Settings from the Designer.' },
      { step: 2, title: 'Go to Custom Code tab', desc: 'In Project Settings, click the "Custom Code" tab at the top.' },
      { step: 3, title: 'Paste in Footer Code', desc: 'Scroll down to the "Footer Code" section. Paste your Popproof widget code here. This loads the widget on every page of your site.' },
      { step: 4, title: 'Save and publish', desc: 'Click Save Changes, then go back to the Designer and click Publish. Select your domain and publish. Your widget is now live.' },
    ],
    framer: [
      { step: 1, title: 'Open your Framer project', desc: 'Log in to Framer and open the project where you want to add the widget.' },
      { step: 2, title: 'Go to Site Settings', desc: 'Click the Settings icon (gear ⚙️) in the top right corner of the Framer editor to open Site Settings.' },
      { step: 3, title: 'Open the General tab', desc: 'In Site Settings, click the "General" tab. Scroll down to find the "Custom Code" section.' },
      { step: 4, title: 'Paste in End of <body>', desc: 'Find the field labeled "End of <body>". Paste your Popproof widget code here.' },
      { step: 5, title: 'Publish', desc: 'Click Publish in the top right. Your widget will now appear on your live Framer site.' },
    ],
    weebly: [
      { step: 1, title: 'Open your Weebly Editor', desc: 'Log in to Weebly and open the site editor for your website.' },
      { step: 2, title: 'Go to Settings → SEO', desc: 'In the top navigation, click Settings → SEO.' },
      { step: 3, title: 'Paste in Footer Code', desc: 'Scroll down to find the "Footer Code" field. Paste your Popproof widget code here. This adds the code before </body> on every page.' },
      { step: 4, title: 'Save and publish', desc: 'Click Save, then click Publish in the top right corner. Your widget is now live.' },
    ],
    godaddy: [
      { step: 1, title: 'Open your GoDaddy Website Builder', desc: 'Log in to GoDaddy and go to My Products → Websites → Edit Site to open the Website Builder editor.' },
      { step: 2, title, desc: 'In the editor, look for Settings or the gear icon. Navigate to Website Settings → Custom Code or Custom HTML section.' },
      { step: 3, title: 'Paste your widget code', desc: 'Paste your Popproof widget code in the "Footer" or "Body" code field. If there is no such field, use the HTML element and place it at the bottom of your last section.' },
      { step: 4, title: 'Save and publish', desc: 'Click Save, then Publish. Your widget is now live on your GoDaddy website.' },
    ],
    react: [
      { step: 1, title: 'Open your main App file', desc: 'Open your project in VS Code. Navigate to src/App.js (or app/layout.js if using Next.js App Router).' },
      { step: 2, title: 'Import useEffect', desc: 'At the top of your file, make sure useEffect is imported: import { useEffect } from "react"' },
      { step: 3, title: 'Add the script dynamically', desc: 'Inside your component, add this code:\n\nuseEffect(() => {\n  const script = document.createElement("script")\n  script.src = "https://popproof.io/widget.js"\n  script.setAttribute("data-user-id", "YOUR_USER_ID")\n  document.body.appendChild(script)\n}, [])' },
      { step: 4, title: 'Replace YOUR_USER_ID', desc: 'Replace "YOUR_USER_ID" with your actual user ID shown in your widget code above.' },
      { step: 5, title: 'Save and deploy', desc: 'Save the file and deploy your app. The widget will load automatically on every page.' },
    ],
  }

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Comic+Neue:wght@400;700&display=swap" rel="stylesheet" />
      <div style={{ minHeight: '100vh', background: '#0d0a1a', backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize: '22px 22px' }}>

        {/* NAV */}
        <nav style={{ background: '#0d0a1a', borderBottom: '3px solid #111', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <img src="/popproof-logo.png" alt="Popproof" style={{ height: '34px', objectFit: 'contain' }} />
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>{user?.email}</span>
            <button onClick={handleLogout} style={{ fontFamily: "'Bangers', cursive", fontSize: '16px', letterSpacing: '1px', padding: '8px 20px', background: 'transparent', color: 'white', border: '3px solid #ff4444', borderRadius: '6px', cursor: 'pointer', boxShadow: '3px 3px 0 #ff4444' }}>LOGOUT</button>
          </div>
        </nav>

        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '40px 24px' }}>

          {/* WELCOME BANNER */}
          <div style={{ background: '#1a1030', border: '3px solid rgba(124,58,237,0.4)', borderRadius: '14px', padding: '20px 24px', marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '22px', color: 'white', letterSpacing: '1px' }}>👋 WELCOME BACK!</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontWeight: 700, marginTop: '4px' }}>
                {profile?.business_name ? `🏢 ${profile.business_name}` : user?.email}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              {profile?.subscription_status === 'active' ? (
                <span style={{ fontFamily: "'Bangers', cursive", fontSize: '16px', letterSpacing: '1px', padding: '6px 16px', background: '#00bb77', border: '3px solid #111', borderRadius: '20px', color: 'white', boxShadow: '3px 3px 0 #111' }}>✅ ACTIVE</span>
              ) : trialExpired ? (
                <span style={{ fontFamily: "'Bangers', cursive", fontSize: '16px', letterSpacing: '1px', padding: '6px 16px', background: '#ff4444', border: '3px solid #111', borderRadius: '20px', color: 'white', boxShadow: '3px 3px 0 #111' }}>❌ EXPIRED</span>
              ) : (
                <span style={{ fontFamily: "'Bangers', cursive", fontSize: '16px', letterSpacing: '1px', padding: '6px 16px', background: '#f59e0b', border: '3px solid #111', borderRadius: '20px', color: 'white', boxShadow: '3px 3px 0 #111' }}>⏳ {daysLeft} DAYS LEFT</span>
              )}
              {profile?.subscription_status === 'active' && (
                <button onClick={handleCancelSubscription} disabled={cancelling} style={{ fontFamily: "'Bangers', cursive", fontSize: '14px', letterSpacing: '1px', padding: '6px 14px', background: 'transparent', color: '#ff4444', border: '2px solid #ff4444', borderRadius: '20px', cursor: 'pointer' }}>
                  {cancelling ? '⏳ CANCELLING...' : 'CANCEL PLAN'}
                </button>
              )}
            </div>
          </div>

          {/* TRIAL EXPIRED */}
          {trialExpired && (
            <div style={{ background: '#1a0a0a', border: '3px solid #ff4444', borderRadius: '14px', padding: '30px', marginBottom: '28px', textAlign: 'center', boxShadow: '5px 5px 0 #ff4444' }}>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '32px', color: '#ff4444', letterSpacing: '1px', marginBottom: '8px' }}>⚠️ TRIAL EXPIRED!</div>
              <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '20px', fontSize: '14px' }}>Subscribe to keep your widget active and keep converting visitors!</p>
              <button onClick={() => window.location.href = '/pricing'} style={{ fontFamily: "'Bangers', cursive", fontSize: '20px', letterSpacing: '1px', padding: '12px 32px', background: '#7c3aed', color: 'white', border: '3px solid #111', borderRadius: '8px', cursor: 'pointer', boxShadow: '5px 5px 0 #111' }}>🚀 SUBSCRIBE NOW — €19/MONTH</button>
            </div>
          )}

          {/* WIDGET CODE */}
          {!trialExpired && (
            <div style={{ background: '#1a1030', border: '3px solid rgba(124,58,237,0.4)', borderRadius: '14px', padding: '24px', marginBottom: '24px', boxShadow: '5px 5px 0 rgba(124,58,237,0.3)' }}>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '22px', color: 'white', letterSpacing: '1px', marginBottom: '6px' }}>🚀 YOUR FOMO WIDGET</div>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: 700, marginBottom: '16px' }}>Paste this code before the closing &lt;/body&gt; tag on your website:</p>
              <div style={{ background: '#0a0614', border: '2px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '16px', marginBottom: '14px', overflowX: 'auto' }}>
                <code style={{ color: '#a78bfa', fontSize: '12px', whiteSpace: 'nowrap', fontFamily: 'monospace' }}>{widgetCode}</code>
              </div>
              <button onClick={handleCopy} style={{ fontFamily: "'Bangers', cursive", fontSize: '16px', letterSpacing: '1px', padding: '10px 24px', background: copied ? '#00bb77' : '#7c3aed', color: 'white', border: '3px solid #111', borderRadius: '8px', cursor: 'pointer', boxShadow: '3px 3px 0 #111', transition: 'all 0.15s' }}>
                {copied ? '✅ COPIED!' : '📋 COPY CODE'}
              </button>
            </div>
          )}

          {/* INSTALLATION GUIDE */}
          {!trialExpired && (
            <div style={{ background: '#1a1030', border: '3px solid rgba(0,204,119,0.4)', borderRadius: '14px', padding: '24px', marginBottom: '24px', boxShadow: '5px 5px 0 rgba(0,204,119,0.3)' }}>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '22px', color: '#00cc77', letterSpacing: '1px', marginBottom: '6px' }}>📖 HOW TO INSTALL</div>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: 700, marginBottom: '20px' }}>Select your platform below for step-by-step installation instructions:</p>

              {/* Platform Tabs */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                {platforms.map(p => (
                  <button key={p.id} onClick={() => setActivePlatform(p.id)} style={{ fontFamily: "'Comic Neue', cursive", fontSize: '13px', fontWeight: 700, padding: '8px 14px', background: activePlatform === p.id ? '#00cc77' : '#0a0614', color: activePlatform === p.id ? '#111' : 'rgba(255,255,255,0.6)', border: activePlatform === p.id ? '2px solid #111' : '2px solid rgba(255,255,255,0.1)', borderRadius: '20px', cursor: 'pointer', boxShadow: activePlatform === p.id ? '3px 3px 0 #111' : 'none', transition: 'all 0.15s' }}>
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Steps */}
              <div>
                {installSteps[activePlatform]?.map((item) => (
                  <div key={item.step} style={{ display: 'flex', gap: '16px', marginBottom: '20px', alignItems: 'flex-start' }}>
                    <div style={{ minWidth: '32px', height: '32px', background: '#00cc77', border: '2px solid #111', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111', fontWeight: 700, fontSize: '14px', flexShrink: 0, boxShadow: '2px 2px 0 #111' }}>
                      {item.step}
                    </div>
                    <div>
                      <div style={{ color: 'white', fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>{item.title}</div>
                      <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Need help */}
              <div style={{ marginTop: '8px', padding: '14px 18px', background: '#0a0614', border: '2px solid rgba(0,204,119,0.2)', borderRadius: '10px' }}>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', margin: 0 }}>
                  💬 <strong style={{ color: 'white' }}>Need help installing?</strong> Email us at <a href="mailto:hello@popproof.io" style={{ color: '#00cc77' }}>hello@popproof.io</a> and we'll set it up for you for free.
                </p>
              </div>
            </div>
          )}

          {/* REVIEW LINK */}
          <div style={{ background: '#1a1030', border: '3px solid rgba(124,58,237,0.4)', borderRadius: '14px', padding: '24px', marginBottom: '24px', boxShadow: '5px 5px 0 rgba(124,58,237,0.3)' }}>
            <div style={{ fontFamily: "'Bangers', cursive", fontSize: '22px', color: 'white', letterSpacing: '1px', marginBottom: '6px' }}>⭐ YOUR REVIEW LINK</div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: 700, marginBottom: '16px' }}>Share this link with customers to collect reviews:</p>
            <div style={{ background: '#0a0614', border: '2px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '16px', marginBottom: '14px', overflowX: 'auto' }}>
              <code style={{ color: '#a78bfa', fontSize: '12px', whiteSpace: 'nowrap', fontFamily: 'monospace' }}>{reviewLink}</code>
            </div>
            <button onClick={handleCopyReviewLink} style={{ fontFamily: "'Bangers', cursive", fontSize: '16px', letterSpacing: '1px', padding: '10px 24px', background: reviewLinkCopied ? '#00bb77' : '#7c3aed', color: 'white', border: '3px solid #111', borderRadius: '8px', cursor: 'pointer', boxShadow: '3px 3px 0 #111', transition: 'all 0.15s' }}>
              {reviewLinkCopied ? '✅ COPIED!' : '📋 COPY REVIEW LINK'}
            </button>
          </div>

          {/* GOOGLE BUSINESS CONNECT */}
          <div style={{ background: '#1a1030', border: '3px solid rgba(255,224,51,0.4)', borderRadius: '14px', padding: '24px', marginBottom: '24px', boxShadow: '5px 5px 0 rgba(255,224,51,0.3)' }}>
            <div style={{ fontFamily: "'Bangers', cursive", fontSize: '22px', color: '#FFE033', letterSpacing: '1px', marginBottom: '6px' }}>🔗 CONNECT GOOGLE BUSINESS</div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>Enter your Google Place ID to import reviews as FOMO notifications.</p>
            <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '12px', marginBottom: '16px' }}>
              Find your Place ID at: <a href="https://developers.google.com/maps/documentation/places/web-service/place-id" target="_blank" rel="noreferrer" style={{ color: '#FFE033' }}>developers.google.com/maps/place-id</a>
            </p>
            <input type="text" placeholder="e.g. ChIJN1t_tDeuEmsRUsoyG83frY4" value={placeId} onChange={(e) => setPlaceId(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', background: '#0a0614', border: '2px solid rgba(255,224,51,0.3)', borderRadius: '8px', color: 'white', fontSize: '13px', fontFamily: 'monospace', marginBottom: '14px', boxSizing: 'border-box' }}
            />
            <button onClick={handleConnectGoogle} disabled={connecting} style={{ fontFamily: "'Bangers', cursive", fontSize: '16px', letterSpacing: '1px', padding: '10px 24px', background: connecting ? '#555' : '#FFE033', color: '#111', border: '3px solid #111', borderRadius: '8px', cursor: connecting ? 'not-allowed' : 'pointer', boxShadow: '3px 3px 0 #111' }}>
              {connecting ? '⏳ CONNECTING...' : '🔗 CONNECT & IMPORT REVIEWS'}
            </button>
          </div>

          {/* REVIEWS */}
          <div style={{ background: '#1a1030', border: '3px solid rgba(124,58,237,0.4)', borderRadius: '14px', padding: '24px', boxShadow: '5px 5px 0 rgba(124,58,237,0.3)' }}>
            <div style={{ fontFamily: "'Bangers', cursive", fontSize: '22px', color: 'white', letterSpacing: '1px', marginBottom: '16px' }}>⭐ REVIEWS ({reviews.length})</div>
            {reviews.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>📭</div>
                <p style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 700, fontSize: '14px' }}>No reviews yet. Share your review link to get started!</p>
              </div>
            ) : (
              reviews.map((review) => (
                <div key={review.id} style={{ background: '#0a0614', border: '2px solid rgba(124,58,237,0.2)', borderRadius: '10px', padding: '16px', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                    <strong style={{ color: 'white', fontSize: '14px' }}>{review.customer_name}</strong>
                    <span>{stars(review.rating)}</span>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '6px', fontSize: '13px', lineHeight: 1.5 }}>{review.review_text}</p>
                  <small style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px' }}>{review.customer_email}</small>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </>
  )
}