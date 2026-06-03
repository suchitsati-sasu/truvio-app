import { useState, useEffect } from 'react'

const isMobile = () => window.innerWidth <= 768

// ============ WIDGET ============
function FomoWidget() {
  const msgs = [
    { ico: '✂️', msg: 'Marta from Āgenskalns just booked a haircut!', time: 'Just now' },
    { ico: '☕', msg: 'Jānis added Popproof to his café!', time: '2 min ago' },
    { ico: '🛍️', msg: "Nina's store got 3 purchases!", time: '4 min ago' },
    { ico: '⭐', msg: 'Anna left a 5-star review!', time: '6 min ago' },
    { ico: '📈', msg: '89 conversions this week!', time: 'Live' },
    { ico: '🚀', msg: '12 businesses signed up today!', time: '8 min ago' },
  ]
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(false)
  const [animOut, setAnimOut] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVisible(true), 1500); return () => clearTimeout(t) }, [])
  useEffect(() => {
    if (!visible) return
    const interval = setInterval(() => {
      setAnimOut(true)
      setTimeout(() => { setIdx(i => (i + 1) % msgs.length); setAnimOut(false) }, 350)
    }, 5000)
    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])
  if (!visible) return null
  return (
    <div style={{ position: 'fixed', bottom: '16px', left: '16px', zIndex: 9999, background: 'white', border: '3px solid #111', borderRadius: '14px', padding: '12px 14px', maxWidth: '260px', boxShadow: '5px 5px 0 #111', transform: animOut ? 'translateX(-120%)' : 'translateX(0)', opacity: animOut ? 0 : 1, transition: 'all 0.35s ease' }}>
      <div style={{ position: 'absolute', top: '7px', right: '9px', cursor: 'pointer', fontSize: '13px', color: '#ccc', fontWeight: 700 }} onClick={() => setVisible(false)}>✕</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          <span style={{ fontFamily: "'Bangers', cursive", fontSize: '18px', color: '#111' }}>Pop</span>
          <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#ec4899)', border: '2px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="9" height="9" viewBox="0 0 9 9"><path d="M4.5 1L5.8 3.8L9 4.2L6.8 6.3L7.4 9.5L4.5 7.9L1.6 9.5L2.2 6.3L0 4.2L3.2 3.8Z" fill="white"/></svg>
          </div>
          <span style={{ fontFamily: "'Bangers', cursive", fontSize: '18px', color: '#111' }}>roof</span>
        </div>
        <span style={{ fontSize: '9px', color: '#bbb', fontWeight: 700, letterSpacing: '1px', marginLeft: '4px' }}>POWERED BY</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0, background: '#f5f3ff' }}>{msgs[idx].ico}</div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '12px', fontWeight: 700, color: '#111', lineHeight: 1.4, margin: 0 }}>{msgs[idx].msg}</p>
          <span style={{ fontSize: '10px', color: '#999' }}>{msgs[idx].time}</span>
        </div>
        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#00cc77', border: '2px solid #111', flexShrink: 0 }} />
      </div>
    </div>
  )
}

// ============ SCROLL BANNER ============
function ScrollBanner() {
  const items = ['⚡ REAL-TIME FOMO', '📍 HYPER-LOCAL', '🚀 5-MIN SETUP', '💜 14-DAY FREE TRIAL', '🔒 GDPR READY', '⭐ TRUSTED BY 500+ BUSINESSES', '✂️ SALONS', '☕ CAFÉS', '🛍️ ONLINE STORES']
  const repeated = [...items, ...items]
  return (
    <div style={{ background: '#7c3aed', borderBottom: '3px solid #111', padding: '10px 0', overflow: 'hidden', whiteSpace: 'nowrap' }}>
      <div style={{ display: 'inline-block', animation: 'scrollX 22s linear infinite' }}>
        <style>{`@keyframes scrollX{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
        {repeated.map((item, i) => (
          <span key={i} style={{ display: 'inline-block', margin: '0 28px', fontFamily: "'Bangers', cursive", fontSize: '14px', color: 'white', letterSpacing: '2px' }}>
            {item} <span style={{ color: '#FFE033', margin: '0 14px' }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ============ NAV ============
function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobile, setMobile] = useState(isMobile())
  useEffect(() => { const h = () => setMobile(isMobile()); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h) }, [])
  return (
    <nav style={{ background: '#0d0a1a', borderBottom: '3px solid #111', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
      <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontFamily: "'Bangers', cursive", fontSize: '22px', color: 'white', letterSpacing: '2px' }}>P</span>
          <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#ec4899)', border: '2px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontSize: '12px', fontWeight: 900 }}>✓</span>
          </div>
          <span style={{ fontFamily: "'Bangers', cursive", fontSize: '22px', color: 'white', letterSpacing: '2px' }}>P</span>
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '4px' }}>
            <span style={{ fontFamily: "'Bangers', cursive", fontSize: '16px', color: 'white', letterSpacing: '2px', lineHeight: 1 }}>PROOF</span>
            <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: '1px', lineHeight: 1 }}>BY NEXVIAN</span>
          </div>
        </div>
      </a>
      {mobile ? (
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: '2px solid rgba(255,255,255,0.3)', borderRadius: '6px', padding: '6px 10px', cursor: 'pointer', color: 'white', fontSize: '18px' }}>
          {menuOpen ? '✕' : '☰'}
        </button>
      ) : (
        <>
          <div style={{ display: 'flex', gap: '22px', alignItems: 'center' }}>
            {[['Home', ''], ['Features', 'features'], ['Pricing', 'pricing'], ['Stories', 'stories']].map(([label, id]) => (
              <button key={id} onClick={() => id ? document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) : window.scrollTo({ top: 0, behavior: 'smooth' })}
                style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', fontWeight: 700, cursor: 'pointer', background: 'none', border: 'none', fontFamily: "'Bangers', cursive", letterSpacing: '1px' }}
                onMouseEnter={e => e.target.style.color = '#FFE033'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}
              >{label}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <a href="/login" style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, fontSize: '13px', padding: '8px 18px', border: '3px solid #111', borderRadius: '6px', boxShadow: '3px 3px 0 #111', background: 'transparent', color: 'white', textDecoration: 'none' }}>Login</a>
            <a href="/signup" style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, fontSize: '13px', padding: '8px 18px', border: '3px solid #111', borderRadius: '6px', boxShadow: '3px 3px 0 #111', background: '#7c3aed', color: 'white', textDecoration: 'none' }}>Start Free!</a>
          </div>
        </>
      )}
      {mobile && menuOpen && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#0d0a1a', borderBottom: '3px solid #111', padding: '16px 20px', zIndex: 99, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[['Home', ''], ['Features', 'features'], ['Pricing', 'pricing'], ['Stories', 'stories']].map(([label, id]) => (
            <button key={id} onClick={() => { id ? document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) : window.scrollTo({ top: 0, behavior: 'smooth' }); setMenuOpen(false) }}
              style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', fontWeight: 700, cursor: 'pointer', background: 'none', border: 'none', fontFamily: "'Bangers', cursive", letterSpacing: '1px', textAlign: 'left', padding: '4px 0' }}
            >{label}</button>
          ))}
          <div style={{ display: 'flex', gap: '10px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <a href="/login" style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, fontSize: '13px', padding: '8px 18px', border: '3px solid #111', borderRadius: '6px', background: 'transparent', color: 'white', textDecoration: 'none' }}>Login</a>
            <a href="/signup" style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, fontSize: '13px', padding: '8px 18px', border: '3px solid #111', borderRadius: '6px', background: '#7c3aed', color: 'white', textDecoration: 'none' }}>Start Free!</a>
          </div>
        </div>
      )}
    </nav>
  )
}

// ============ HERO ============
function Hero() {
  const [mobile, setMobile] = useState(isMobile())
  useEffect(() => { const h = () => setMobile(isMobile()); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h) }, [])
  return (
    <section style={{ background: '#0d0a1a', padding: mobile ? '40px 20px' : '70px 32px 60px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize: '22px 22px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '600px', height: '300px', background: 'radial-gradient(ellipse,rgba(124,58,237,0.15) 0%,transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '960px', margin: '0 auto', display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: mobile ? '32px' : '48px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(124,58,237,0.12)', border: '2px solid rgba(124,58,237,0.3)', color: '#a78bfa', padding: '5px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', marginBottom: '20px' }}>⚡ SOCIAL PROOF THAT ACTUALLY CONVERTS</div>
          <h1 style={{ fontFamily: "'Bangers', cursive", fontSize: mobile ? '38px' : '54px', color: 'white', lineHeight: 1.05, marginBottom: '18px', letterSpacing: '1px' }}>
            TURN VISITORS INTO <span style={{ color: '#FFE033' }}>BELIEVERS</span> WITH <span style={{ color: '#ec4899' }}>REAL-TIME</span> SOCIAL PROOF
          </h1>
          <p style={{ fontSize: mobile ? '14px' : '16px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: '30px' }}>Show real bookings, purchases & reviews as they happen. Build trust, create FOMO, and watch your conversions explode — in 5 minutes.</p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '14px' }}>
            <a href="/signup" style={{ fontFamily: "'Bangers', cursive", fontSize: mobile ? '17px' : '20px', letterSpacing: '1px', padding: '13px 28px', background: '#7c3aed', color: 'white', border: '3px solid #111', borderRadius: '8px', boxShadow: '5px 5px 0 #111', textDecoration: 'none', display: 'inline-block' }}>🚀 START FREE TRIAL</a>
            <button onClick={() => document.getElementById('stories')?.scrollIntoView({ behavior: 'smooth' })} style={{ fontFamily: "'Bangers', cursive", fontSize: mobile ? '17px' : '20px', letterSpacing: '1px', padding: '13px 28px', background: 'transparent', color: 'white', border: '3px solid rgba(255,255,255,0.2)', borderRadius: '8px', cursor: 'pointer' }}>📖 SEE HOW IT WORKS</button>
          </div>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', fontWeight: 700 }}>✓ 14-day free trial &nbsp;·&nbsp; ✓ Cancel anytime</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ background: '#1a1030', border: '3px solid rgba(124,58,237,0.3)', borderRadius: '14px', padding: '16px' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.25)', letterSpacing: '2px', marginBottom: '10px' }}>LIVE NOTIFICATIONS</div>
            {[{ cls: 'p', ico: '✂️', msg: 'Marta from Āgenskalns just booked!', time: 'Just now' }, { cls: 'g', ico: '⭐', msg: 'Ilze left a 5-star review!', time: '2 min ago' }, { cls: 'y', ico: '🛍️', msg: 'Alise from Riga just purchased!', time: '4 min ago' }].map((n, i) => (
              <div key={i} style={{ background: '#120a20', border: '2px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '11px 13px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: i < 2 ? '7px' : 0 }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', flexShrink: 0, border: '2px solid rgba(255,255,255,0.1)', background: n.cls === 'p' ? 'rgba(124,58,237,0.2)' : n.cls === 'g' ? 'rgba(0,204,119,0.15)' : 'rgba(255,224,51,0.12)' }}>{n.ico}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.85)', fontWeight: 700, lineHeight: 1.3, margin: 0 }}>{n.msg}</p>
                  <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)' }}>{n.time}</span>
                </div>
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#00cc77', marginLeft: 'auto', flexShrink: 0 }} />
              </div>
            ))}
          </div>
          <div style={{ background: '#0a0614', border: '3px solid rgba(124,58,237,0.2)', borderRadius: '10px', padding: '14px' }}>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', letterSpacing: '1.5px', marginBottom: '8px', fontWeight: 700 }}>INSTALL IN 5 MINUTES</div>
            <pre style={{ fontSize: '11px', color: '#a78bfa', fontFamily: 'monospace', lineHeight: 1.7, margin: 0, overflowX: 'auto' }}>
              <span style={{ color: '#6ee7b7' }}>&lt;script</span>{' '}src="https://popproof.io/widget.js"{'\n'}
              {'  '}<span style={{ color: '#6ee7b7' }}>data-id</span>="YOUR_ID"{'\n'}
              <span style={{ color: '#6ee7b7' }}>&gt;&lt;/script&gt;</span>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============ TRUST BAR ============
function TrustBar() {
  return (
    <div style={{ background: '#FFE033', borderTop: '3px solid #111', borderBottom: '3px solid #111', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
      {[['500+', 'Businesses trust us'], ['2.4M+', 'Notifications shown'], ['38%', 'Avg conversion lift'], ['4.9★', 'Average rating']].map(([num, label], i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <strong style={{ fontFamily: "'Bangers', cursive", fontSize: '22px', color: '#111' }}>{num}</strong>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#555' }}>{label}</span>
        </div>
      ))}
    </div>
  )
}// ============ HERO SVG COMPONENT ============
function PopproofHero({ color1 = '#c4b5fd', color2 = '#f9a8d4', speechBg = '#7c3aed', speech = '', idSuffix = 'a' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
      <svg width="90" height="100" viewBox="0 0 90 100">
        <line x1="0" y1="30" x2="20" y2="38" stroke={color1} strokeWidth="2" strokeDasharray="4,3" opacity="0.6"/>
        <line x1="0" y1="45" x2="18" y2="48" stroke={color2} strokeWidth="2" strokeDasharray="4,3" opacity="0.6"/>
        <line x1="0" y1="60" x2="20" y2="58" stroke={color1} strokeWidth="2" strokeDasharray="4,3" opacity="0.6"/>
        <defs>
          <linearGradient id={`hg1-${idSuffix}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7c3aed"/>
            <stop offset="100%" stopColor="#ec4899"/>
          </linearGradient>
        </defs>
        <path d="M28 52 Q5 65 8 88 Q30 78 45 78 Q60 78 72 65 Q55 52 45 52 Z" fill={`url(#hg1-${idSuffix})`} stroke="#111" strokeWidth="2"/>
        <rect x="24" y="44" width="42" height="32" rx="8" fill={`url(#hg1-${idSuffix})`} stroke="#111" strokeWidth="2.5"/>
        <circle cx="45" cy="60" r="10" fill="white" stroke="#111" strokeWidth="1.5"/>
        <text x="40" y="65" fontFamily="Bangers,cursive" fontSize="13" fill="#7c3aed">P</text>
        <circle cx="45" cy="26" r="22" fill="#fde68a" stroke="#111" strokeWidth="2.5"/>
        <path d="M24 22 Q45 14 66 22 L66 29 Q45 22 24 29 Z" fill={`url(#hg1-${idSuffix})`} stroke="#111" strokeWidth="1.5"/>
        <text x="32" y="30" fontSize="10">⭐</text>
        <text x="48" y="30" fontSize="10">⭐</text>
        <path d="M36 38 Q45 46 54 38" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round"/>
        <rect x="64" y="35" width="16" height="13" rx="5" fill="#fde68a" stroke="#111" strokeWidth="2.2"/>
        <text x="68" y="20" fontSize="13">✨</text>
        <text x="72" y="36" fontSize="11">⚡</text>
        <rect x="28" y="74" width="12" height="16" rx="4" fill="#4c1d95" stroke="#111" strokeWidth="2"/>
        <rect x="50" y="74" width="12" height="16" rx="4" fill="#4c1d95" stroke="#111" strokeWidth="2"/>
      </svg>
      {speech && (
        <div style={{ background: speechBg, color: 'white', border: '2px solid #111', borderRadius: '10px', padding: '5px 9px', fontSize: '9px', fontWeight: 700, maxWidth: '170px', textAlign: 'center', lineHeight: 1.4 }}>
          {speech}
        </div>
      )}
    </div>
  )
}

function NotifPill({ badge, badgeBg, text, bg = 'white' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', background: bg, border: '1.5px solid #111', borderRadius: '6px', padding: '3px 7px' }}>
      <span style={{ background: badgeBg, color: 'white', padding: '1px 5px', borderRadius: '3px', fontSize: '8px', fontWeight: 700, flexShrink: 0 }}>{badge}</span>
      <span style={{ fontSize: '9px', fontWeight: 700 }}>{text}</span>
    </div>
  )
}

function Panel({ num, bg = 'white', caption, captionBg, children, isLast, mobile }) {
  return (
    <div style={{
      borderRight: mobile ? (num % 2 !== 0 ? '3px solid #111' : 'none') : (isLast ? 'none' : '3px solid #111'),
      borderBottom: mobile && num <= 2 ? '3px solid #111' : 'none',
      padding: '10px', minHeight: mobile ? '160px' : '210px',
      display: 'flex', flexDirection: 'column',
      background: bg, position: 'relative',
    }}>
      <div style={{ position: 'absolute', top: '5px', left: '7px', fontFamily: "'Bangers', cursive", fontSize: '12px', color: '#ddd' }}>{num}</div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
        {children}
      </div>
      <div style={{ padding: '6px 8px', fontSize: '10px', fontWeight: 700, color: 'white', textAlign: 'center', lineHeight: 1.4, background: captionBg }}>
        {caption}
      </div>
    </div>
  )
}

function ScriptBox({ borderColor, textColor, dataId, dataType }) {
  return (
    <div style={{ background: '#0d1117', border: `2.5px solid ${borderColor}`, borderRadius: '8px', padding: '8px 10px', fontSize: '9px', color: textColor, fontFamily: 'monospace', lineHeight: 1.8, width: '100%' }}>
      {'<script'}<br/>{'  src="popproof.io/widget.js"'}<br/>{`  data-id="${dataId}"`}<br/>{`  data-type="${dataType}">`}<br/>{'</script>'}
    </div>
  )
}// ============ BIZ STORIES ============
function BizStories() {
  const [active, setActive] = useState('salon')
  const [mobile, setMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handle = () => setMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handle)
    return () => window.removeEventListener('resize', handle)
  }, [])

  const tabs = [
    { key: 'salon', ico: '✂️', label: 'BEAUTY SALON', sub: "Ausma's Story", color: '#7c3aed', bg: '#f5f3ff' },
    { key: 'cafe', ico: '☕', label: 'CAFÉ', sub: "Carlos's Story", color: '#f97316', bg: '#fff7ed' },
    { key: 'shop', ico: '🛍️', label: 'ONLINE STORE', sub: "Nina's Story", color: '#0d9488', bg: '#f0fdfa' },
  ]

  return (
    <div id="stories">
      <div style={{ background: '#fffde7', padding: mobile ? '40px 16px' : '60px 32px', borderTop: '3px solid #111' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ fontFamily: "'Bangers', cursive", fontSize: '13px', letterSpacing: '3px', color: '#7c3aed', display: 'block', marginBottom: '8px' }}>PICK YOUR STORY</span>
          <h2 style={{ fontFamily: "'Bangers', cursive", fontSize: mobile ? '26px' : '38px', color: '#111', marginBottom: '8px' }}>WHICH BUSINESS ARE YOU?</h2>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '28px' }}>See exactly how Popproof works for your business</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {tabs.map(t => (
              <button key={t.key} onClick={() => setActive(t.key)} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                padding: mobile ? '12px 16px' : '18px 24px',
                border: `3px solid ${active === t.key ? t.color : '#111'}`,
                borderRadius: '12px', cursor: 'pointer', minWidth: mobile ? '90px' : '130px',
                background: active === t.key ? t.bg : 'white',
                boxShadow: active === t.key ? '3px 3px 0 #111' : '5px 5px 0 #111',
                transform: active === t.key ? 'translate(2px,2px)' : 'none',
                transition: 'all 0.15s',
              }}>
                <span style={{ fontSize: '28px' }}>{t.ico}</span>
                <span style={{ fontFamily: "'Bangers', cursive", fontSize: mobile ? '12px' : '16px', letterSpacing: '1px' }}>{t.label}</span>
                <span style={{ fontSize: '10px', color: '#888', fontWeight: 700 }}>{t.sub}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: '#fffde7', padding: mobile ? '0 12px 40px' : '0 32px 60px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>

          {active === 'salon' && (
            <>
              <div style={{ textAlign: 'center', padding: '20px 0 16px' }}>
                <div style={{ display: 'inline-block', background: '#7c3aed', color: 'white', border: '3px solid #111', borderRadius: '20px', padding: '6px 20px', fontFamily: "'Bangers', cursive", fontSize: '14px', letterSpacing: '2px', boxShadow: '3px 3px 0 #111' }}>✂️ SALON STORY — AUSMA'S EPIC JOURNEY</div>
              </div>
              <div style={{ border: '3px solid #111', borderRadius: '10px', overflow: 'hidden', boxShadow: '7px 7px 0 #111', marginBottom: '20px' }}>
                <div style={{ padding: '9px 18px', background: '#1a0a2e', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: "'Bangers', cursive", fontSize: mobile ? '11px' : '14px', color: 'white' }}>😭 CHAPTER 1 — THE STRUGGLE IS REAL</span>
                  <div style={{ display: 'flex', gap: '5px' }}>{[0,1,2].map(d => <div key={d} style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#ff3b3b' }} />)}</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)' }}>
                  <Panel num={1} bg="white" captionBg="#7c3aed" caption="Ausma opens her salon. She bought 3 new scissors. She is READY. 😤" mobile={mobile} isLast={false}>
                    <div style={{ background: '#FFE033', border: '2.5px solid #111', borderRadius: '12px', padding: '5px 9px', fontSize: '10px', fontWeight: 700, color: '#111', textAlign: 'center', maxWidth: '160px' }}>I built my salon website! Clients will flood in like crazy! 🎉</div>
                    <div style={{ fontSize: '48px' }}>💇‍♀️</div>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#9d174d' }}>Ausma — Salon Owner 💅</div>
                  </Panel>
                  <Panel num={2} bg="#fdf2f8" captionBg="#111" caption="One month. Zero bookings. Even crickets stopped showing up." mobile={mobile} isLast={false}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#888' }}>📅 Day 1... Day 7... Day 30...</div>
                    <div style={{ fontSize: '32px' }}>🦗</div>
                    <div style={{ fontFamily: "'Bangers', cursive", fontSize: '18px', color: '#bbb' }}>...nothing...</div>
                    <div style={{ fontFamily: "'Bangers', cursive", fontSize: '18px', color: '#999' }}>...STILL nothing!</div>
                  </Panel>
                  <Panel num={3} bg="white" captionBg="#ff3b3b" caption="Visitors arrive. See no social proof. Leave in 3 seconds flat!" mobile={mobile} isLast={false}>
                    <div style={{ fontSize: '36px' }}>🤔</div>
                    <div style={{ background: 'white', border: '2px solid #111', borderRadius: '7px', padding: '6px 9px', fontSize: '10px', fontWeight: 700 }}>❓ Has anyone else used this?</div>
                    <div style={{ fontSize: '32px' }}>🏃‍♀️💨</div>
                    <div style={{ fontFamily: "'Bangers', cursive", fontSize: '16px', color: '#ff3b3b' }}>BOUNCE!</div>
                  </Panel>
                  <Panel num={4} bg="#fff1f2" captionBg="#ff3b3b" caption="Ausma cries. This cannot continue!" mobile={mobile} isLast={true}>
                    <div style={{ background: '#fecdd3', border: '2.5px solid #111', borderRadius: '12px', padding: '5px 9px', fontSize: '10px', fontWeight: 700, color: '#111', textAlign: 'center', maxWidth: '160px' }}>Why won't anyone book?! Is my website broken?! 😭</div>
                    <div style={{ fontSize: '48px' }}>😭</div>
                    <div style={{ fontFamily: "'Bangers', cursive", fontSize: '22px', color: '#ff3b3b' }}>CRISIS!</div>
                  </Panel>
                </div>
              </div>
              <div style={{ border: '3px solid #111', borderRadius: '10px', overflow: 'hidden', boxShadow: '7px 7px 0 #111', marginBottom: '20px' }}>
                <div style={{ padding: '9px 18px', background: 'linear-gradient(90deg,#7c3aed,#ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: "'Bangers', cursive", fontSize: mobile ? '11px' : '14px', color: 'white' }}>🦸 CHAPTER 2 — A HERO FLIES IN!</span>
                  <div style={{ display: 'flex', gap: '5px' }}>{[0,1,2].map(d => <div key={d} style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#FFE033' }} />)}</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)' }}>
                  <Panel num={1} bg="#f5f3ff" captionBg="#111" caption="POPPROOF HERO crashes through the ceiling. Ausma screams. Hero apologizes for the ceiling." mobile={mobile} isLast={false}>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#7c3aed', textAlign: 'center' }}>SUDDENLY... FROM THE SKY!</div>
                    <PopproofHero idSuffix="s1" speech="FEAR NOT, AUSMA! I am POPPROOF MAN! I saw your tears from space! 🚀" speechBg="#7c3aed"/>
                  </Panel>
                  <Panel num={2} bg="#fdf4ff" captionBg="#7c3aed" caption="One script tag. That's literally it. Ausma stares in disbelief." mobile={mobile} isLast={false}>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#7c3aed', textAlign: 'center' }}>Hero types with superhero speed...</div>
                    <ScriptBox borderColor="#7c3aed" textColor="#a78bfa" dataId="AUSMA-SALON" dataType="salon"/>
                    <div style={{ fontFamily: "'Bangers', cursive", fontSize: '22px', color: '#7c3aed' }}>ZAP! ⚡</div>
                  </Panel>
                  <Panel num={3} bg="#fef3c7" captionBg="#ec4899" caption="Website comes ALIVE! Real bookings. Real reviews. Real proof!" mobile={mobile} isLast={false}>
                    <div style={{ fontFamily: "'Bangers', cursive", fontSize: '20px', color: '#7c3aed', WebkitTextStroke: '1.5px #111' }}>KA-POW! 💥</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', width: '100%' }}>
                      <NotifPill badge="LIVE" badgeBg="#7c3aed" text="Anna booked haircut! · Riga" bg="#fdf4ff"/>
                      <NotifPill badge="⭐" badgeBg="#15803d" text='Maria: "Best salon EVER!" ⭐⭐⭐⭐⭐' bg="#fdf4ff"/>
                    </div>
                  </Panel>
                  <Panel num={4} bg="white" captionBg="#15803d" caption="Ausma hired an assistant. The scissors are dry. Life is BEAUTIFUL! 🌸" mobile={mobile} isLast={true}>
                    <div style={{ background: '#dcfce7', border: '2.5px solid #111', borderRadius: '12px', padding: '5px 9px', fontSize: '9px', fontWeight: 700, color: '#111', textAlign: 'center', maxWidth: '160px' }}>12 BOOKINGS IN ONE DAY?! I'm crying but now it's HAPPY tears!! 😭💕</div>
                    <div style={{ fontSize: '48px' }}>🎉</div>
                    <div style={{ fontFamily: "'Bangers', cursive", fontSize: '18px', color: '#15803d' }}>FULLY BOOKED! 🎊</div>
                  </Panel>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: '14px', margin: '16px 0 24px' }}>
                {[{ num: '3X', label: 'More bookings monthly', color: '#7c3aed', bg: '#f5f3ff', ico: '📅' }, { num: '4.9★', label: 'Average star rating', color: '#ec4899', bg: '#fce7f3', ico: '⭐' }, { num: '€800+', label: 'Extra revenue monthly', color: '#15803d', bg: '#d1fae5', ico: '💰' }].map((r, i) => (
                  <div key={i} style={{ background: r.bg, border: '3px solid #111', borderRadius: '10px', padding: '18px', textAlign: 'center', boxShadow: '5px 5px 0 #111' }}>
                    <div style={{ fontSize: '24px', marginBottom: '6px' }}>{r.ico}</div>
                    <div style={{ fontFamily: "'Bangers', cursive", fontSize: '38px', lineHeight: 1, color: r.color }}>{r.num}</div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#555', marginTop: '4px' }}>{r.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
                <a href="/signup" style={{ fontFamily: "'Bangers', cursive", fontSize: '18px', letterSpacing: '1px', padding: '12px 28px', background: '#7c3aed', color: 'white', border: '3px solid #111', borderRadius: '8px', textDecoration: 'none', boxShadow: '4px 4px 0 #111' }}>Start YOUR free trial! ✂️</a>
              </div>
            </>
          )}{active === 'cafe' && (
            <>
              <div style={{ textAlign: 'center', padding: '20px 0 16px' }}>
                <div style={{ display: 'inline-block', background: '#f97316', color: 'white', border: '3px solid #111', borderRadius: '20px', padding: '6px 20px', fontFamily: "'Bangers', cursive", fontSize: '14px', letterSpacing: '2px', boxShadow: '3px 3px 0 #111' }}>☕ CAFE STORY — CARLOS' EPIC JOURNEY</div>
              </div>
              <div style={{ border: '3px solid #111', borderRadius: '10px', overflow: 'hidden', boxShadow: '7px 7px 0 #111', marginBottom: '20px' }}>
                <div style={{ padding: '9px 18px', background: '#431407', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: "'Bangers', cursive", fontSize: mobile ? '11px' : '14px', color: 'white' }}>😭 CHAPTER 1 — EMPTY TABLES, COLD COFFEE</span>
                  <div style={{ display: 'flex', gap: '5px' }}>{[0,1,2].map(d => <div key={d} style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#f97316' }} />)}</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)' }}>
                  <Panel num={1} bg="white" captionBg="#f97316" caption="Carlos opens his dream cafe. Best espresso in Riga. Zero customers." mobile={mobile} isLast={false}>
                    <div style={{ background: '#fed7aa', border: '2.5px solid #111', borderRadius: '12px', padding: '5px 9px', fontSize: '10px', fontWeight: 700, color: '#111', textAlign: 'center', maxWidth: '160px' }}>My espresso recipe is SECRET. My coffee is MAGIC! 😎</div>
                    <div style={{ fontSize: '40px' }}>☕</div>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#9a3412' }}>Carlos — Cafe Owner ☕</div>
                  </Panel>
                  <Panel num={2} bg="#fff7ed" captionBg="#111" caption="Weeks pass. The coffee gets cold. The chairs start crying too." mobile={mobile} isLast={false}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#888' }}>Tuesday 2:00 PM...</div>
                    <div style={{ fontSize: '36px' }}>🪑🪑🪑</div>
                    <div style={{ fontFamily: "'Bangers', cursive", fontSize: '18px', color: '#bbb' }}>empty... empty...</div>
                    <div style={{ fontSize: '28px' }}>😔</div>
                  </Panel>
                  <Panel num={3} bg="white" captionBg="#ff3b3b" caption="No reviews online = tourists walk straight past. Carlos watches from window." mobile={mobile} isLast={false}>
                    <div style={{ fontSize: '32px' }}>🔍</div>
                    <div style={{ background: 'white', border: '2px solid #111', borderRadius: '7px', padding: '6px 9px', fontSize: '10px', fontWeight: 700, textAlign: 'center' }}>No reviews, NO activity!</div>
                    <div style={{ fontSize: '32px' }}>🏃‍♂️💨</div>
                    <div style={{ fontFamily: "'Bangers', cursive", fontSize: '16px', color: '#ff3b3b' }}>THEY GO ELSEWHERE!</div>
                  </Panel>
                  <Panel num={4} bg="#fff1f2" captionBg="#ff3b3b" caption="Carlos cries. His tears taste like espresso. That's how good his coffee is!" mobile={mobile} isLast={true}>
                    <div style={{ background: '#fecdd3', border: '2.5px solid #111', borderRadius: '12px', padding: '5px 9px', fontSize: '10px', fontWeight: 700, color: '#111', textAlign: 'center', maxWidth: '160px' }}>I have the BEST coffee! Why does everyone go elsewhere?! 😤</div>
                    <div style={{ fontSize: '40px' }}>😭</div>
                    <div style={{ fontSize: '10px', color: '#991b1b', fontWeight: 700 }}>His moustache is drooping. Month 3.</div>
                  </Panel>
                </div>
              </div>
              <div style={{ border: '3px solid #111', borderRadius: '10px', overflow: 'hidden', boxShadow: '7px 7px 0 #111', marginBottom: '20px' }}>
                <div style={{ padding: '9px 18px', background: 'linear-gradient(90deg,#f97316,#f59e0b)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: "'Bangers', cursive", fontSize: mobile ? '10px' : '13px', color: 'white' }}>🦸 CHAPTER 2 — HERO ORDERS A COFFEE THEN SAVES THE DAY!</span>
                  <div style={{ display: 'flex', gap: '5px' }}>{[0,1,2].map(d => <div key={d} style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'white' }} />)}</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)' }}>
                  <Panel num={1} bg="#fff7ed" captionBg="#111" caption="Hero flies in, orders espresso, rates it 5 stars, then gets to work!" mobile={mobile} isLast={false}>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#ea580c', textAlign: 'center' }}>FROM THE SKY... AGAIN!</div>
                    <PopproofHero idSuffix="c1" color1="#fed7aa" color2="#fde68a" speechBg="#f97316" speech="Carlos! First — one espresso please. Second — I'm here to save your cafe! 🦸"/>
                  </Panel>
                  <Panel num={2} bg="white" captionBg="#f97316" caption="60 seconds. Carlos' website now shows REAL cafe activity!" mobile={mobile} isLast={false}>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#ea580c', textAlign: 'center' }}>Types script while drinking espresso...</div>
                    <ScriptBox borderColor="#f97316" textColor="#fed7aa" dataId="CARLOS-CAFE" dataType="cafe"/>
                    <div style={{ fontFamily: "'Bangers', cursive", fontSize: '20px', color: '#f97316' }}>SIZZLE! ☕⚡</div>
                  </Panel>
                  <Panel num={3} bg="#fef3c7" captionBg="#111" caption="Real visitors! Real reviews! Tourists see this and RUN to Carlos!" mobile={mobile} isLast={false}>
                    <div style={{ fontFamily: "'Bangers', cursive", fontSize: '20px', color: '#f97316', WebkitTextStroke: '1.5px #111' }}>BOOM!</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', width: '100%' }}>
                      <NotifPill badge="NOW" badgeBg="#f97316" text="8 people inside right now!" bg="#fff7ed"/>
                      <NotifPill badge="⭐" badgeBg="#15803d" text='Tom: "Best flat white EVER!"' bg="#fff7ed"/>
                      <NotifPill badge="HOT" badgeBg="#ff3b3b" text="Only 2 tables left today!" bg="#fff7ed"/>
                    </div>
                  </Panel>
                  <Panel num={4} bg="white" captionBg="#f97316" caption="Carlos now has a WAITING LIST. The moustache has fully recovered! 🎉" mobile={mobile} isLast={true}>
                    <div style={{ background: '#dcfce7', border: '2.5px solid #111', borderRadius: '12px', padding: '5px 9px', fontSize: '9px', fontWeight: 700, color: '#111', textAlign: 'center', maxWidth: '160px' }}>FULL HOUSE! There's a QUEUE outside! My moustache is proud again!! 😤☕</div>
                    <div style={{ fontSize: '40px' }}>🎉</div>
                    <div style={{ fontFamily: "'Bangers', cursive", fontSize: '18px', color: '#f97316' }}>WAITING LIST! 📋</div>
                  </Panel>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: '14px', margin: '16px 0 24px' }}>
                {[{ num: '4X', label: 'More daily visitors', color: '#f97316', bg: '#fff7ed', ico: '🍽️' }, { num: '67', label: 'New 5-star reviews', color: '#f97316', bg: '#fef3c7', ico: '⭐' }, { num: '€1,200+', label: 'Extra revenue monthly', color: '#15803d', bg: '#d1fae5', ico: '💸' }].map((r, i) => (
                  <div key={i} style={{ background: r.bg, border: '3px solid #111', borderRadius: '10px', padding: '18px', textAlign: 'center', boxShadow: '5px 5px 0 #111' }}>
                    <div style={{ fontSize: '24px', marginBottom: '6px' }}>{r.ico}</div>
                    <div style={{ fontFamily: "'Bangers', cursive", fontSize: '38px', lineHeight: 1, color: r.color }}>{r.num}</div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#555', marginTop: '4px' }}>{r.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
                <a href="/signup" style={{ fontFamily: "'Bangers', cursive", fontSize: '18px', letterSpacing: '1px', padding: '12px 28px', background: '#f97316', color: 'white', border: '3px solid #111', borderRadius: '8px', textDecoration: 'none', boxShadow: '4px 4px 0 #111' }}>Start YOUR free trial! ☕</a>
              </div>
            </>
          )}{active === 'shop' && (
            <>
              <div style={{ textAlign: 'center', padding: '20px 0 16px' }}>
                <div style={{ display: 'inline-block', background: '#0d9488', color: 'white', border: '3px solid #111', borderRadius: '20px', padding: '6px 20px', fontFamily: "'Bangers', cursive", fontSize: '14px', letterSpacing: '2px', boxShadow: '3px 3px 0 #111' }}>🛍️ ONLINE STORE STORY — NINA'S EPIC JOURNEY</div>
              </div>
              <div style={{ border: '3px solid #111', borderRadius: '10px', overflow: 'hidden', boxShadow: '7px 7px 0 #111', marginBottom: '20px' }}>
                <div style={{ padding: '9px 18px', background: '#134e4a', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: "'Bangers', cursive", fontSize: mobile ? '11px' : '14px', color: 'white' }}>😭 CHAPTER 1 — THE ABANDONED CART NIGHTMARE</span>
                  <div style={{ display: 'flex', gap: '5px' }}>{[0,1,2].map(d => <div key={d} style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#0d9488' }} />)}</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)' }}>
                  <Panel num={1} bg="white" captionBg="#0d9488" caption="Nina launches her online store! 200 products. Big plans. 😤" mobile={mobile} isLast={false}>
                    <div style={{ background: '#FFE033', border: '2.5px solid #111', borderRadius: '12px', padding: '5px 9px', fontSize: '10px', fontWeight: 700, color: '#111', textAlign: 'center', maxWidth: '160px' }}>My online store is LIVE! I'm going to be RICH by Friday!! 💻🚀</div>
                    <div style={{ fontSize: '40px' }}>💻</div>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#0f766e' }}>Nina — Online Store Owner 💻</div>
                  </Panel>
                  <Panel num={2} bg="#f0fdfa" captionBg="#111" caption="People fill their carts then disappear. Cart abandonment: 78%." mobile={mobile} isLast={false}>
                    <div style={{ fontSize: '36px' }}>🛒</div>
                    <div style={{ background: '#fee2e2', border: '2px solid #111', borderRadius: '5px', padding: '4px 10px', fontSize: '10px', fontWeight: 700, color: '#991b1b' }}>78% abandon rate!</div>
                    <div style={{ fontSize: '10px', color: '#999', fontWeight: 700 }}>200 products. 0 sales.</div>
                  </Panel>
                  <Panel num={3} bg="white" captionBg="#ff3b3b" caption="No social proof = buyer gets cold feet = buys from bigger store." mobile={mobile} isLast={false}>
                    <div style={{ fontSize: '28px' }}>👀</div>
                    <div style={{ background: '#ccfbf1', border: '2.5px solid #111', borderRadius: '12px', padding: '5px 9px', fontSize: '10px', fontWeight: 700, color: '#111', textAlign: 'center' }}>Is this shop legit? Has anyone bought here?</div>
                    <div style={{ fontSize: '28px' }}>🏃‍♀️💨</div>
                  </Panel>
                  <Panel num={4} bg="#f0fdfa" captionBg="#ff3b3b" caption="Nina cries. Her glasses fog up. Something must change!" mobile={mobile} isLast={true}>
                    <div style={{ background: '#fecdd3', border: '2.5px solid #111', borderRadius: '12px', padding: '5px 9px', fontSize: '10px', fontWeight: 700, color: '#111', textAlign: 'center', maxWidth: '160px' }}>I have AMAZING products! Why won't anyone TRUST ME?! 😭📦</div>
                    <div style={{ fontSize: '40px' }}>😭</div>
                    <div style={{ fontSize: '10px', color: '#0f766e', fontWeight: 700 }}>200 unsold products. Month 3. 😢</div>
                  </Panel>
                </div>
              </div>
              <div style={{ border: '3px solid #111', borderRadius: '10px', overflow: 'hidden', boxShadow: '7px 7px 0 #111', marginBottom: '20px' }}>
                <div style={{ padding: '9px 18px', background: 'linear-gradient(90deg,#0d9488,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: "'Bangers', cursive", fontSize: mobile ? '10px' : '13px', color: 'white' }}>🦸 CHAPTER 2 — HERO DELIVERS THE PACKAGE OF SALVATION!</span>
                  <div style={{ display: 'flex', gap: '5px' }}>{[0,1,2].map(d => <div key={d} style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#FFE033' }} />)}</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)' }}>
                  <Panel num={1} bg="#f0fdfa" captionBg="#111" caption='Hero flies in carrying a package labelled "Social Proof — Handle With Care"!' mobile={mobile} isLast={false}>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#0d9488', textAlign: 'center' }}>EXPRESS DELIVERY FROM THE SKY!</div>
                    <PopproofHero idSuffix="n1" color1="#99f6e4" color2="#6ee7b7" speechBg="#0d9488" speech="Nina! I've delivered SOCIAL PROOF! Your buyers need to SEE others buying! Watch this! 📦"/>
                  </Panel>
                  <Panel num={2} bg="white" captionBg="#0d9488" caption="One script. Store NOW shows real purchases, real viewers, real reviews!" mobile={mobile} isLast={false}>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#0d9488', textAlign: 'center' }}>Hero types while Nina watches open-mouthed...</div>
                    <ScriptBox borderColor="#0d9488" textColor="#99f6e4" dataId="NINA-SHOP" dataType="shop"/>
                    <div style={{ fontFamily: "'Bangers', cursive", fontSize: '20px', color: '#0d9488' }}>ACTIVATE! 🛍️⚡</div>
                  </Panel>
                  <Panel num={3} bg="#fef3c7" captionBg="#111" caption="Social proof + scarcity = buyers don't hesitate for ONE second!" mobile={mobile} isLast={false}>
                    <div style={{ fontFamily: "'Bangers', cursive", fontSize: '20px', color: '#0d9488', WebkitTextStroke: '1.5px #111' }}>BOOM! 🛍️</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', width: '100%' }}>
                      <NotifPill badge="LIVE" badgeBg="#0d9488" text="Emma from Berlin just bought!" bg="#f0fdfa"/>
                      <NotifPill badge="HOT" badgeBg="#ff3b3b" text="12 people viewing RIGHT NOW!" bg="#f0fdfa"/>
                      <NotifPill badge="LOW" badgeBg="#f97316" text="Only 3 left in stock!" bg="#f0fdfa"/>
                    </div>
                  </Panel>
                  <Panel num={4} bg="#f0fdfa" captionBg="#0d9488" caption="Nina quit her day job. Now she packs orders in her living room. Best problem ever! 📦" mobile={mobile} isLast={true}>
                    <div style={{ background: '#dcfce7', border: '2.5px solid #111', borderRadius: '12px', padding: '5px 9px', fontSize: '9px', fontWeight: 700, color: '#111', textAlign: 'center', maxWidth: '160px' }}>I have 47 orders overnight! I need to quit my day job!! 😱📦💰</div>
                    <div style={{ fontSize: '40px' }}>🎉</div>
                    <div style={{ fontFamily: "'Bangers', cursive", fontSize: '16px', color: '#0d9488' }}>47 ORDERS! 📦</div>
                  </Panel>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: '14px', margin: '16px 0 24px' }}>
                {[{ num: '-40%', label: 'Cart abandonment', color: '#0d9488', bg: '#f0fdfa', ico: '🛒' }, { num: '5X', label: 'More orders monthly', color: '#f97316', bg: '#fef3c7', ico: '📦' }, { num: '€3,000+', label: 'Extra revenue monthly', color: '#15803d', bg: '#d1fae5', ico: '💸' }].map((r, i) => (
                  <div key={i} style={{ background: r.bg, border: '3px solid #111', borderRadius: '10px', padding: '18px', textAlign: 'center', boxShadow: '5px 5px 0 #111' }}>
                    <div style={{ fontSize: '24px', marginBottom: '6px' }}>{r.ico}</div>
                    <div style={{ fontFamily: "'Bangers', cursive", fontSize: '38px', lineHeight: 1, color: r.color }}>{r.num}</div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#555', marginTop: '4px' }}>{r.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
                <a href="/signup" style={{ fontFamily: "'Bangers', cursive", fontSize: '18px', letterSpacing: '1px', padding: '12px 28px', background: '#0d9488', color: 'white', border: '3px solid #111', borderRadius: '8px', textDecoration: 'none', boxShadow: '4px 4px 0 #111' }}>Start YOUR free trial! 🛍️</a>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  )
}// ============ FEATURES ============
function Features() {
  const [mobile, setMobile] = useState(isMobile())
  useEffect(() => { const h = () => setMobile(isMobile()); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h) }, [])
  const feats = [
    { ico: '⚡', bg: '#FFE033', title: 'REAL-TIME NOTIFICATIONS', desc: 'Show live bookings, purchases, and reviews the moment they happen. Zero delay, maximum impact.' },
    { ico: '📍', bg: '#ede9fe', title: 'HYPER-LOCAL TARGETING', desc: '"Marta from your street just booked!" Ultra-relevant notifications that feel personal.' },
    { ico: '🎨', bg: '#d1fae5', title: '5-MINUTE SETUP', desc: 'Paste one line of code. Customize colors. Go live. No developer needed.' },
    { ico: '📊', bg: '#fce7f3', title: 'WORKS EVERYWHERE', desc: 'Salons, cafés, restaurants, online stores. Any website, any CMS, any platform.' },
    { ico: '🔒', bg: '#ede9fe', title: 'GDPR COMPLIANT', desc: 'Privacy-first. No personal data stored. Works across all EU markets without worry.' },
    { ico: '💬', bg: '#FFE033', title: 'REVIEW COLLECTION', desc: 'Automatically collect and display Google reviews. Build credibility on autopilot.' },
  ]
  return (
    <section id="features" style={{ background: 'white', padding: mobile ? '40px 16px' : '60px 32px', borderTop: '3px solid #111' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ fontFamily: "'Bangers', cursive", fontSize: '13px', letterSpacing: '3px', color: '#7c3aed', display: 'block', marginBottom: '8px' }}>WHAT YOU GET</span>
          <h2 style={{ fontFamily: "'Bangers', cursive", fontSize: mobile ? '28px' : '38px', color: '#111', letterSpacing: '1px' }}>EVERY SUPERPOWER INCLUDED ⚡</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: '14px' }}>
          {feats.map((f, i) => (
            <div key={i} style={{ background: 'white', border: '3px solid #111', borderRadius: '10px', padding: '18px', boxShadow: '5px 5px 0 #111' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '9px', border: '3px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', fontSize: '20px', background: f.bg }}>{f.ico}</div>
              <h3 style={{ fontFamily: "'Bangers', cursive", fontSize: '20px', letterSpacing: '0.5px', marginBottom: '6px' }}>{f.title}</h3>
              <p style={{ fontSize: '12px', color: '#555', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============ PRICING ============
function Pricing() {
  const [mobile, setMobile] = useState(isMobile())
  useEffect(() => { const h = () => setMobile(isMobile()); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h) }, [])
  return (
    <section id="pricing" style={{ background: '#FFE033', padding: mobile ? '40px 16px' : '60px 32px', borderTop: '3px solid #111', textAlign: 'center' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <span style={{ fontFamily: "'Bangers', cursive", fontSize: '13px', letterSpacing: '3px', color: '#7c3aed', display: 'block', marginBottom: '8px' }}>SIMPLE PRICING</span>
        <h2 style={{ fontFamily: "'Bangers', cursive", fontSize: mobile ? '26px' : '38px', color: '#111', letterSpacing: '1px', marginBottom: '32px' }}>ONE PLAN. EVERYTHING INCLUDED.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: '18px', textAlign: 'left' }}>
          <div style={{ background: 'white', border: '3px solid #111', borderRadius: '12px', padding: '26px', boxShadow: '5px 5px 0 #111' }}>
            <h3 style={{ fontFamily: "'Bangers', cursive", fontSize: '22px', marginBottom: '6px' }}>STARTER</h3>
            <div style={{ fontFamily: "'Bangers', cursive", fontSize: '44px', lineHeight: 1, marginBottom: '6px' }}>€0<sub style={{ fontSize: '13px', fontFamily: "'Comic Neue', cursive", fontWeight: 400 }}>/forever</sub></div>
            <ul style={{ listStyle: 'none', margin: '14px 0', padding: 0 }}>
              {['Up to 500 notifications/mo', 'Basic widget', '1 website', 'Email support'].map((item, i) => (
                <li key={i} style={{ fontSize: '12px', padding: '4px 0', display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ fontWeight: 900, color: '#7c3aed' }}>✓</span>{item}</li>
              ))}
            </ul>
            <a href="/signup" style={{ display: 'block', width: '100%', fontFamily: "'Bangers', cursive", fontSize: '18px', padding: '10px', border: '3px solid #111', borderRadius: '7px', marginTop: '8px', boxShadow: '4px 4px 0 #111', background: 'transparent', color: '#111', textAlign: 'center', textDecoration: 'none', boxSizing: 'border-box' }}>GET STARTED FREE</a>
          </div>
          <div style={{ background: '#7c3aed', border: '3px solid #111', borderRadius: '12px', padding: '26px', boxShadow: '6px 6px 0 #111' }}>
            <div style={{ display: 'inline-block', background: '#FFE033', color: '#111', border: '2px solid #111', fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '4px', marginBottom: '10px' }}>⭐ MOST POPULAR</div>
            <h3 style={{ fontFamily: "'Bangers', cursive", fontSize: '22px', marginBottom: '6px', color: 'white' }}>PRO</h3>
            <div style={{ fontFamily: "'Bangers', cursive", fontSize: '44px', lineHeight: 1, marginBottom: '6px', color: '#FFE033' }}>€19<sub style={{ fontSize: '13px', fontFamily: "'Comic Neue', cursive", fontWeight: 400, color: 'rgba(255,255,255,0.7)' }}>/month</sub></div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', fontWeight: 700, marginBottom: '8px' }}>🎁 14-day free trial</div>
            <ul style={{ listStyle: 'none', margin: '14px 0', padding: 0 }}>
              {['Unlimited notifications', 'Hyper-local targeting', 'All business types', 'Review collection', 'GDPR compliant', 'Priority support'].map((item, i) => (
                <li key={i} style={{ fontSize: '12px', padding: '4px 0', display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.9)' }}><span style={{ fontWeight: 900, color: '#FFE033' }}>✓</span>{item}</li>
              ))}
            </ul>
            <a href="/signup" style={{ display: 'block', width: '100%', fontFamily: "'Bangers', cursive", fontSize: '18px', padding: '10px', border: '3px solid #111', borderRadius: '7px', marginTop: '8px', boxShadow: '4px 4px 0 #111', background: 'white', color: '#7c3aed', textAlign: 'center', textDecoration: 'none', boxSizing: 'border-box' }}>🚀 START FREE TRIAL</a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============ TESTIMONIALS ============
function Testimonials() {
  const [mobile, setMobile] = useState(isMobile())
  useEffect(() => { const h = () => setMobile(isMobile()); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h) }, [])
  const tests = [
    { stars: 5, text: 'My booking rate went up 60% in the first month. The hyper-local notifications are genius — clients love seeing names from their own neighborhood.', name: 'Ieva K.', biz: 'Salon Owner, Riga', avatar: '💇‍♀️' },
    { stars: 5, text: 'Simple setup, real results. My Tuesday mornings are now fully booked. I tell every local business owner about Popproof.', name: 'Martins L.', biz: 'Café Owner, Jūrmala', avatar: '☕' },
    { stars: 5, text: 'Conversion went from 1.1% to 3.4%. Same traffic, way more sales. The live purchase bubbles create genuine urgency.', name: 'Zane B.', biz: 'Shopify Store Owner', avatar: '🛍️' },
  ]
  return (
    <section style={{ background: 'white', padding: mobile ? '40px 16px' : '60px 32px', borderTop: '3px solid #111' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ fontFamily: "'Bangers', cursive", fontSize: '13px', letterSpacing: '3px', color: '#7c3aed', display: 'block', marginBottom: '8px' }}>REAL RESULTS</span>
          <h2 style={{ fontFamily: "'Bangers', cursive", fontSize: mobile ? '28px' : '38px', color: '#111', letterSpacing: '1px' }}>BUSINESSES LOVE POPPROOF ⭐</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: '18px' }}>
          {tests.map((t, i) => (
            <div key={i} style={{ background: 'white', border: '3px solid #111', borderRadius: '10px', padding: '20px', boxShadow: '4px 4px 0 #111' }}>
              <div style={{ color: '#FFE033', fontSize: '16px', marginBottom: '8px' }}>{'★'.repeat(t.stars)}</div>
              <p style={{ fontSize: '13px', color: '#444', lineHeight: 1.6, marginBottom: '14px', fontStyle: 'italic' }}>"{t.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', border: '2px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>{t.avatar}</div>
                <div><div style={{ fontSize: '12px', fontWeight: 700 }}>{t.name}</div><div style={{ fontSize: '10px', color: '#999' }}>{t.biz}</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============ CTA ============
function CtaSection() {
  return (
    <section style={{ background: '#0d0a1a', padding: '70px 20px', borderTop: '3px solid #111', textAlign: 'center' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Bangers', cursive", fontSize: '44px', color: 'white', letterSpacing: '1px', marginBottom: '12px' }}>READY TO <span style={{ color: '#FFE033' }}>EXPLODE</span> YOUR CONVERSIONS? 🚀</h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.55)', marginBottom: '32px', lineHeight: 1.7 }}>Join 500+ local businesses already using Popproof to turn visitors into customers.</p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/signup" style={{ fontFamily: "'Bangers', cursive", fontSize: '22px', letterSpacing: '1px', padding: '14px 32px', background: '#7c3aed', color: 'white', border: '3px solid #111', borderRadius: '8px', boxShadow: '5px 5px 0 #111', textDecoration: 'none' }}>🚀 START FREE TRIAL</a>
          <a href="/login" style={{ fontFamily: "'Bangers', cursive", fontSize: '22px', letterSpacing: '1px', padding: '14px 32px', background: '#FFE033', color: '#111', border: '3px solid #111', borderRadius: '8px', boxShadow: '5px 5px 0 #111', textDecoration: 'none' }}>LOGIN →</a>
        </div>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '16px', fontWeight: 700 }}>✓ 14-day free trial &nbsp;·&nbsp; ✓ Cancel anytime</p>
      </div>
    </section>
  )
}

// ============ FOOTER ============
function Footer() {
  const [mobile, setMobile] = useState(isMobile())
  useEffect(() => { const h = () => setMobile(isMobile()); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h) }, [])
  return (
    <footer style={{ background: '#0d0a1a', borderTop: '3px solid #111', padding: mobile ? '32px 16px' : '40px 32px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', display: 'grid', gridTemplateColumns: mobile ? '1fr' : '2fr 1fr 1fr 1fr', gap: mobile ? '24px' : '32px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
            <span style={{ fontFamily: "'Bangers', cursive", fontSize: '20px', color: 'white', letterSpacing: '2px' }}>P</span>
            <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#ec4899)', border: '2px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontSize: '10px', fontWeight: 900 }}>✓</span>
            </div>
            <span style={{ fontFamily: "'Bangers', cursive", fontSize: '20px', color: 'white', letterSpacing: '2px' }}>P PROOF</span>
          </div>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: '240px' }}>Social proof & FOMO notifications for local businesses. Turn visitors into customers in 5 minutes.</p>
        </div>
        {[
          { title: 'PRODUCT', links: [['Features', '#features'], ['Pricing', '#pricing'], ['How it works', '#stories']] },
          { title: 'COMPANY', links: [['About', '#'], ['Blog', '#'], ['Contact', 'mailto:hello@popproof.io']] },
          { title: 'LEGAL', links: [['Privacy', '#'], ['Terms', '#'], ['GDPR', '#']] },
        ].map((col, i) => (
          <div key={i}>
            <h4 style={{ fontFamily: "'Bangers', cursive", fontSize: '14px', color: 'white', letterSpacing: '1px', marginBottom: '12px' }}>{col.title}</h4>
            {col.links.map(([label, href]) => (
              <a key={label} href={href} style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', marginBottom: '6px', fontWeight: 700 }}>{label}</a>
            ))}
          </div>
        ))}
      </div>
      <div style={{ maxWidth: '960px', margin: '24px auto 0', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>© 2025 Popproof · SIA Nexvian · Riga, Latvia</span>
        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>hello@popproof.io</span>
      </div>
    </footer>
  )
}

// ============ MAIN ============
export default function LandingPage() {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Comic+Neue:wght@400;700&display=swap" rel="stylesheet" />
      <div style={{ overflowX: 'hidden' }}>
        <ScrollBanner />
        <Nav />
        <Hero />
        <TrustBar />
        <BizStories />
        <Features />
        <Pricing />
        <Testimonials />
        <CtaSection />
        <Footer />
        <FomoWidget />
      </div>
    </>
  )
}