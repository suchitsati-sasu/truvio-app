import { useState, useEffect } from 'react'

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

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!visible) return
    const interval = setInterval(() => {
      setAnimOut(true)
      setTimeout(() => {
        setIdx(i => (i + 1) % msgs.length)
        setAnimOut(false)
      }, 350)
    }, 5000)
    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', bottom: '24px', left: '24px', zIndex: 9999,
      background: 'white', border: '3px solid #111', borderRadius: '14px',
      padding: '14px 16px', maxWidth: '290px', boxShadow: '5px 5px 0 #111',
      transform: animOut ? 'translateX(-120%)' : 'translateX(0)',
      opacity: animOut ? 0 : 1,
      transition: 'all 0.35s ease',
    }}>
      <div style={{ position: 'absolute', top: '7px', right: '9px', cursor: 'pointer', fontSize: '13px', color: '#ccc', fontWeight: 700, lineHeight: 1 }}
        onClick={() => setVisible(false)}>✕</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          <span style={{ fontFamily: "'Bangers', cursive", fontSize: '18px', color: '#111', lineHeight: 1 }}>Pop</span>
          <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#ec4899)', border: '2px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="9" height="9" viewBox="0 0 9 9"><path d="M4.5 1L5.8 3.8L9 4.2L6.8 6.3L7.4 9.5L4.5 7.9L1.6 9.5L2.2 6.3L0 4.2L3.2 3.8Z" fill="white"/></svg>
          </div>
          <span style={{ fontFamily: "'Bangers', cursive", fontSize: '18px', color: '#111', lineHeight: 1 }}>roof</span>
        </div>
        <span style={{ fontSize: '9px', color: '#bbb', fontWeight: 700, letterSpacing: '1px', marginLeft: '4px' }}>POWERED BY</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0, background: '#f5f3ff' }}>
          {msgs[idx].ico}
        </div>
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
function Nav({ onNavigate }) {
  return (
    <nav style={{ background: '#0d0a1a', borderBottom: '3px solid #111', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
      <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none' }}>
        <img src="/popproof-logo.png" alt="Popproof" style={{ height: '34px', objectFit: 'contain' }} />
      </a>
      <div style={{ display: 'flex', gap: '22px', alignItems: 'center' }}>
        {[['Features', 'features'], ['Pricing', 'pricing'], ['Stories', 'stories']].map(([label, id]) => (
          <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
            style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', fontWeight: 700, textDecoration: 'none', cursor: 'pointer' }}
            onMouseEnter={e => e.target.style.color = '#FFE033'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}
          >{label}</button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <a href="/login" style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, fontSize: '13px', padding: '8px 18px', border: '3px solid #111', borderRadius: '6px', cursor: 'pointer', boxShadow: '3px 3px 0 #111', background: 'transparent', color: 'white', textDecoration: 'none' }}>Login</a>
        <a href="/signup" style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, fontSize: '13px', padding: '8px 18px', border: '3px solid #111', borderRadius: '6px', cursor: 'pointer', boxShadow: '3px 3px 0 #111', background: '#7c3aed', color: 'white', textDecoration: 'none' }}>Start Free!</a>
      </div>
    </nav>
  )
}

// ============ HERO ============
function Hero() {
  return (
    <section style={{ background: '#0d0a1a', padding: '70px 32px 60px', position: 'relative', overflow: 'hidden' }}>
      {/* dots */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize: '22px 22px', pointerEvents: 'none' }} />
      {/* glow */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '600px', height: '300px', background: 'radial-gradient(ellipse,rgba(124,58,237,0.15) 0%,transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '960px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        {/* LEFT */}
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(124,58,237,0.12)', border: '2px solid rgba(124,58,237,0.3)', color: '#a78bfa', padding: '5px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', marginBottom: '20px' }}>
            ⚡ SOCIAL PROOF THAT ACTUALLY CONVERTS
          </div>
          <h1 style={{ fontFamily: "'Bangers', cursive", fontSize: '54px', color: 'white', lineHeight: 1.05, marginBottom: '18px', letterSpacing: '1px' }}>
            TURN VISITORS INTO{' '}
            <span style={{ color: '#FFE033' }}>BELIEVERS</span>{' '}
            WITH <span style={{ color: '#ec4899' }}>REAL-TIME</span> SOCIAL PROOF
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: '30px', maxWidth: '480px' }}>
            Show real bookings, purchases & reviews as they happen. Build trust, create FOMO, and watch your conversions explode — in 5 minutes.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '14px' }}>
            <a href="/signup" style={{ fontFamily: "'Bangers', cursive", fontSize: '20px', letterSpacing: '1px', padding: '13px 28px', background: '#7c3aed', color: 'white', border: '3px solid #111', borderRadius: '8px', cursor: 'pointer', boxShadow: '5px 5px 0 #111', textDecoration: 'none', display: 'inline-block' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '7px 7px 0 #111' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '5px 5px 0 #111' }}>
              🚀 START FREE TRIAL
            </a>
            <button onClick={() => document.getElementById('stories')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ fontFamily: "'Bangers', cursive", fontSize: '20px', letterSpacing: '1px', padding: '13px 28px', background: 'transparent', color: 'white', border: '3px solid rgba(255,255,255,0.2)', borderRadius: '8px', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>
              📖 SEE HOW IT WORKS
            </button>
          </div>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', fontWeight: 700 }}>✓ 14-day free trial &nbsp;·&nbsp; ✓ No credit card &nbsp;·&nbsp; ✓ Cancel anytime</p>
        </div>

        {/* RIGHT — notification preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ background: '#1a1030', border: '3px solid rgba(124,58,237,0.3)', borderRadius: '14px', padding: '16px' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.25)', letterSpacing: '2px', marginBottom: '10px' }}>LIVE NOTIFICATIONS</div>
            {[
              { cls: 'p', ico: '✂️', msg: 'Marta from Āgenskalns just booked!', time: 'Just now' },
              { cls: 'g', ico: '⭐', msg: 'Ilze left a 5-star review!', time: '2 min ago' },
              { cls: 'y', ico: '🛍️', msg: 'Alise from Riga just purchased!', time: '4 min ago' },
            ].map((n, i) => (
              <div key={i} style={{ background: '#120a20', border: '2px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '11px 13px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: i < 2 ? '7px' : 0 }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', flexShrink: 0, border: '2px solid rgba(255,255,255,0.1)', background: n.cls === 'p' ? 'rgba(124,58,237,0.2)' : n.cls === 'g' ? 'rgba(0,204,119,0.15)' : 'rgba(255,224,51,0.12)' }}>
                  {n.ico}
                </div>
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
            <pre style={{ fontSize: '11px', color: '#a78bfa', fontFamily: 'monospace', lineHeight: 1.7, margin: 0 }}>
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
    <div style={{ background: '#FFE033', borderTop: '3px solid #111', borderBottom: '3px solid #111', padding: '12px 32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
      {[['500+', 'Businesses trust us'], ['2.4M+', 'Notifications shown'], ['38%', 'Avg conversion lift'], ['4.9★', 'Average rating']].map(([num, label], i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <strong style={{ fontFamily: "'Bangers', cursive", fontSize: '22px', color: '#111', letterSpacing: '0.5px' }}>{num}</strong>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#555' }}>{label}</span>
          {i < 3 && <span style={{ fontSize: '18px', color: 'rgba(0,0,0,0.2)', marginLeft: '20px' }}>|</span>}
        </div>
      ))}
    </div>
  )
}

// ============ BIZ SELECTOR + STORIES ============
const STORIES = {
  salon: {
    label: 'BEAUTY SALON', ico: '✂️', sub: 'Sofia\'s Story',
    color: '#7c3aed', bg: '#f5f3ff', borderColor: '#7c3aed',
    chapters: [
      {
        title: '😭 CHAPTER 1 — THE STRUGGLE IS REAL', hdrBg: '#1a0a2e', dotColor: '#ff3b3b',
        panels: [
          { bg: 'white', caption: { bg: '#7c3aed', text: 'Sofia opens her salon website. She is READY. 😤' }, content: () => (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <div style={{ background: '#FFE033', border: '2.5px solid #111', borderRadius: '14px', padding: '6px 11px', fontSize: '11px', fontWeight: 700, color: '#111', textAlign: 'center', maxWidth: '175px', position: 'relative' }}>
                I built my salon website! Clients will flood in like crazy! 🎉
              </div>
              <div style={{ fontSize: '48px' }}>💇‍♀️</div>
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#9d174d' }}>Sofia — Salon Owner 💅</div>
            </div>
          )},
          { bg: '#fdf2f8', caption: { bg: '#111', text: 'One month. Zero bookings. Even crickets stopped showing up.' }, content: () => (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#888' }}>📅 Day 1... Day 7... Day 30...</div>
              <div style={{ fontSize: '32px' }}>🦗</div>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '18px', color: '#bbb', letterSpacing: '2px', textAlign: 'center' }}>...nothing...</div>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '18px', color: '#999', letterSpacing: '2px', textAlign: 'center' }}>...STILL nothing!</div>
            </div>
          )},
          { bg: 'white', caption: { bg: '#374151', text: 'Visitors come. They look. They leave. No trust. No proof.' }, content: () => (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#555', textAlign: 'center' }}>A visitor finds Sofia's site...</div>
              <div style={{ fontSize: '36px' }}>🤔</div>
              <div style={{ background: 'white', border: '2px solid #111', borderRadius: '7px', padding: '6px 9px', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                ❓ Has anyone else used this?
              </div>
              <div style={{ fontSize: '32px' }}>🏃‍♀️💨</div>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '16px', color: '#ff3b3b' }}>BOUNCE!</div>
            </div>
          )},
          { bg: '#fff1f2', caption: { bg: '#ff3b3b', text: 'Sofia is desperate. She almost gives up. 😢' }, content: () => (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <div style={{ background: '#fecdd3', border: '2.5px solid #111', borderRadius: '14px', padding: '6px 11px', fontSize: '11px', fontWeight: 700, color: '#111', textAlign: 'center', maxWidth: '175px' }}>
                Why won't anyone book?! Is my website broken?! 😭
              </div>
              <div style={{ fontSize: '48px' }}>😭</div>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '22px', color: '#ff3b3b', letterSpacing: '2px' }}>CRISIS!</div>
            </div>
          )},
        ]
      },
      {
        title: '💡 CHAPTER 2 — ENTER POPPROOF', hdrBg: '#1e1b4b', dotColor: '#FFE033',
        panels: [
          { bg: '#f5f3ff', caption: { bg: '#7c3aed', text: 'Sofia discovers Popproof. One script tag. 5 minutes.' }, content: () => (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <div style={{ fontSize: '40px' }}>💡</div>
              <div style={{ background: '#FFE033', border: '2.5px solid #111', borderRadius: '14px', padding: '6px 11px', fontSize: '11px', fontWeight: 700, color: '#111', textAlign: 'center' }}>
                Wait... Popproof shows real bookings to my visitors?! 😲
              </div>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '24px', color: '#7c3aed', letterSpacing: '2px' }}>AHA! 💥</div>
            </div>
          )},
          { bg: '#fdf2f8', caption: { bg: '#ec4899', text: 'A live bubble appears: "Marta from Āgenskalns just booked!"' }, content: () => (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <div style={{ background: 'white', border: '2px solid #111', borderRadius: '10px', padding: '8px 12px', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '3px 3px 0 #111' }}>
                <span>✂️</span><span>Marta from Āgenskalns just booked!</span><span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00cc77', flexShrink: 0 }} />
              </div>
              <div style={{ fontSize: '32px' }}>😮</div>
              <div style={{ background: '#FFE033', border: '2.5px solid #111', borderRadius: '14px', padding: '6px 11px', fontSize: '11px', fontWeight: 700, color: '#111', textAlign: 'center' }}>
                People can SEE that others are booking! 🔥
              </div>
            </div>
          )},
          { bg: '#f0fdf4', caption: { bg: '#15803d', text: 'FOMO kicks in. Visitors think: "If others book — it must be great!"' }, content: () => (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <div style={{ fontSize: '36px' }}>🤩</div>
              <div style={{ background: '#dcfce7', border: '2.5px solid #111', borderRadius: '14px', padding: '6px 11px', fontSize: '11px', fontWeight: 700, color: '#111', textAlign: 'center' }}>
                Marta booked... Ilze booked... I should book too! 👇
              </div>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '22px', color: '#15803d', letterSpacing: '2px' }}>FOMO! 🔥</div>
            </div>
          )},
          { bg: '#fefce8', caption: { bg: '#854d0e', text: 'Click. Book. Pay. BOOM! Sofia has her first client! 🎉' }, content: () => (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <div style={{ fontSize: '40px' }}>📅✅</div>
              <div style={{ background: '#FFE033', border: '2.5px solid #111', borderRadius: '14px', padding: '6px 11px', fontSize: '11px', fontWeight: 700, color: '#111', textAlign: 'center' }}>
                NEW BOOKING! Ieva — Monday 10am! 🎉
              </div>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '28px', color: '#854d0e', letterSpacing: '2px' }}>KA-CHING! 💰</div>
            </div>
          )},
        ]
      },
      {
        title: '🏆 CHAPTER 3 — FULLY BOOKED!', hdrBg: '#14532d', dotColor: '#00cc77',
        panels: [
          { bg: '#f0fdf4', caption: { bg: '#15803d', text: 'Week 1: Calendar starts filling up!' }, content: () => (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '4px' }}>
                {['✅','✅','⬜','✅','⬜','✅','⬜','✅','✅','⬜'].map((s,i) => <div key={i} style={{ fontSize: '16px', textAlign: 'center' }}>{s}</div>)}
              </div>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '18px', color: '#15803d' }}>WEEK 1: 7 bookings!</div>
            </div>
          )},
          { bg: '#f5f3ff', caption: { bg: '#7c3aed', text: 'Week 2: Monday & Tuesday — FULLY BOOKED!' }, content: () => (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '4px' }}>
                {['✅','✅','✅','✅','✅','✅','✅','✅','✅','✅'].map((s,i) => <div key={i} style={{ fontSize: '16px', textAlign: 'center' }}>{s}</div>)}
              </div>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '18px', color: '#7c3aed' }}>WEEK 2: FULLY BOOKED!</div>
            </div>
          )},
          { bg: '#fefce8', caption: { bg: '#854d0e', text: 'Month 1: Sofia hires a second stylist! 💪' }, content: () => (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <div style={{ fontSize: '40px' }}>👯‍♀️</div>
              <div style={{ background: '#FFE033', border: '2.5px solid #111', borderRadius: '14px', padding: '6px 11px', fontSize: '11px', fontWeight: 700, color: '#111', textAlign: 'center' }}>
                I had to hire a 2nd stylist! Popproof changed everything! 🙏
              </div>
            </div>
          )},
          { bg: '#f0fdf4', caption: { bg: '#15803d', text: 'Zero ad spend. Just social proof. 📈' }, content: () => (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '36px', color: '#15803d', lineHeight: 1 }}>+60%</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#555', textAlign: 'center' }}>bookings in 30 days</div>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '36px', color: '#7c3aed', lineHeight: 1 }}>€0</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#555', textAlign: 'center' }}>ad spend</div>
            </div>
          )},
        ]
      }
    ]
  },
  cafe: {
    label: 'CAFÉ / RESTAURANT', ico: '☕', sub: "Carlos's Story",
    color: '#f97316', bg: '#fff7ed', borderColor: '#f97316',
    chapters: [
      {
        title: '😤 CHAPTER 1 — DEAD WEEKDAYS', hdrBg: '#431407', dotColor: '#f97316',
        panels: [
          { bg: 'white', caption: { bg: '#f97316', text: 'Carlos has an amazing café. Weekends? PACKED.' }, content: () => (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <div style={{ fontSize: '40px' }}>☕</div>
              <div style={{ background: '#fed7aa', border: '2.5px solid #111', borderRadius: '14px', padding: '6px 11px', fontSize: '11px', fontWeight: 700, color: '#111', textAlign: 'center' }}>
                Saturday = 60 covers! Sunday = SLAMMED! 🎉
              </div>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '20px', color: '#f97316' }}>WEEKEND WARRIOR! 💪</div>
            </div>
          )},
          { bg: '#fff7ed', caption: { bg: '#111', text: 'But Tuesday? 12 empty tables. 1 sad barista.' }, content: () => (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#888' }}>Tuesday 2:00 PM...</div>
              <div style={{ fontSize: '36px' }}>🪑🪑🪑</div>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '20px', color: '#bbb', letterSpacing: '2px' }}>empty... empty... empty...</div>
              <div style={{ fontSize: '28px' }}>😔</div>
            </div>
          )},
          { bg: 'white', caption: { bg: '#374151', text: 'No online presence = no weekday traffic.' }, content: () => (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <div style={{ fontSize: '32px' }}>🔍</div>
              <div style={{ background: 'white', border: '2px solid #111', borderRadius: '7px', padding: '6px 9px', fontSize: '10px', fontWeight: 700, textAlign: 'center' }}>
                People search "café near me"... but see NO reviews, NO activity!
              </div>
              <div style={{ fontSize: '32px' }}>🏃‍♂️💨</div>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '18px', color: '#ff3b3b' }}>THEY PICK SOMEONE ELSE!</div>
            </div>
          )},
          { bg: '#fff1f2', caption: { bg: '#ff3b3b', text: 'Carlos is losing €800/month on dead weekdays.' }, content: () => (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '36px', color: '#ff3b3b', lineHeight: 1 }}>-€800</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#555' }}>lost every month</div>
              <div style={{ background: '#fecdd3', border: '2.5px solid #111', borderRadius: '14px', padding: '6px 11px', fontSize: '11px', fontWeight: 700, color: '#111', textAlign: 'center' }}>
                I can't survive on weekends alone! 😤
              </div>
            </div>
          )},
        ]
      },
      {
        title: '💡 CHAPTER 2 — POPPROOF TO THE RESCUE', hdrBg: '#1c1917', dotColor: '#FFE033',
        panels: [
          { bg: '#fff7ed', caption: { bg: '#f97316', text: 'Popproof shows live check-ins & reviews on his website.' }, content: () => (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <div style={{ background: 'white', border: '2px solid #111', borderRadius: '10px', padding: '8px 12px', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '3px 3px 0 #111' }}>
                <span>☕</span><span>Jānis from Pārdaugava just visited!</span>
              </div>
              <div style={{ background: 'white', border: '2px solid #111', borderRadius: '10px', padding: '8px 12px', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '3px 3px 0 #111' }}>
                <span>⭐</span><span>Kristīne left a 5★ review!</span>
              </div>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '20px', color: '#f97316' }}>SOCIAL PROOF! 🔥</div>
            </div>
          )},
          { bg: '#fefce8', caption: { bg: '#854d0e', text: '"8 people visited today" — instant credibility!' }, content: () => (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '32px', color: '#854d0e', lineHeight: 1 }}>8 👥</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#555' }}>people visited today</div>
              <div style={{ background: '#FFE033', border: '2.5px solid #111', borderRadius: '14px', padding: '6px 11px', fontSize: '11px', fontWeight: 700, color: '#111', textAlign: 'center' }}>
                This place is ALIVE on a Tuesday! I should check it out! 🤩
              </div>
            </div>
          )},
          { bg: '#f0fdf4', caption: { bg: '#15803d', text: 'Word spreads. Regulars bring friends on weekdays!' }, content: () => (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <div style={{ fontSize: '36px' }}>👥 → 👥👥</div>
              <div style={{ background: '#dcfce7', border: '2.5px solid #111', borderRadius: '14px', padding: '6px 11px', fontSize: '11px', fontWeight: 700, color: '#111', textAlign: 'center' }}>
                "My regulars started bringing friends. It snowballed!" — Carlos 📣
              </div>
            </div>
          )},
          { bg: '#fefce8', caption: { bg: '#854d0e', text: 'Weekday revenue up 40%. Same café. More trust.' }, content: () => (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '44px', color: '#15803d', lineHeight: 1 }}>+40%</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#555' }}>weekday revenue</div>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '24px', color: '#f97316', letterSpacing: '2px' }}>KA-CHING! 💰</div>
            </div>
          )},
        ]
      }
    ]
  },
  shop: {
    label: 'ONLINE STORE', ico: '🛍️', sub: "Nina's Story",
    color: '#0d9488', bg: '#f0fdfa', borderColor: '#0d9488',
    chapters: [
      {
        title: '😰 CHAPTER 1 — TRAFFIC. ZERO SALES.', hdrBg: '#042f2e', dotColor: '#00cc77',
        panels: [
          { bg: 'white', caption: { bg: '#0d9488', text: 'Nina has 500 monthly visitors. Only 4 buy.' }, content: () => (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '32px', color: '#0d9488', lineHeight: 1 }}>500</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#555' }}>monthly visitors</div>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '32px', color: '#ff3b3b', lineHeight: 1 }}>4</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#555' }}>purchases 😭</div>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '20px', color: '#ff3b3b' }}>0.8% CONVERSION!</div>
            </div>
          )},
          { bg: '#f0fdfa', caption: { bg: '#111', text: 'They browse. They hesitate. They leave.' }, content: () => (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <div style={{ fontSize: '28px' }}>👀</div>
              <div style={{ background: '#ccfbf1', border: '2.5px solid #111', borderRadius: '14px', padding: '6px 11px', fontSize: '11px', fontWeight: 700, color: '#111', textAlign: 'center' }}>
                Hmm... is this shop legit? Has anyone actually bought from here?
              </div>
              <div style={{ fontSize: '28px' }}>🏃‍♀️💨</div>
            </div>
          )},
          { bg: 'white', caption: { bg: '#374151', text: 'The problem? Zero social proof. Zero trust.' }, content: () => (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <div style={{ fontSize: '40px' }}>🔒</div>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '20px', color: '#ff3b3b', textAlign: 'center' }}>NO TRUST = NO SALES!</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#555', textAlign: 'center', lineHeight: 1.5 }}>Visitors need to SEE others buying before they buy.</div>
            </div>
          )},
          { bg: '#fff1f2', caption: { bg: '#ff3b3b', text: 'Nina tried ads. Spent €300. Got 2 more sales. 😤' }, content: () => (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '28px', color: '#ff3b3b' }}>-€300 ADS</div>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '20px', color: '#555' }}>= +2 sales</div>
              <div style={{ background: '#fecdd3', border: '2.5px solid #111', borderRadius: '14px', padding: '6px 11px', fontSize: '11px', fontWeight: 700, color: '#111', textAlign: 'center' }}>
                There HAS to be a better way! 😡
              </div>
            </div>
          )},
        ]
      },
      {
        title: '💡 CHAPTER 2 — THE TRUST MACHINE', hdrBg: '#042f2e', dotColor: '#FFE033',
        panels: [
          { bg: '#f0fdfa', caption: { bg: '#0d9488', text: 'Popproof shows live purchases on her store.' }, content: () => (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <div style={{ background: 'white', border: '2px solid #111', borderRadius: '10px', padding: '8px 12px', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '3px 3px 0 #111' }}>
                <span>🛍️</span><span>Alise from Riga just purchased the Linen Set!</span>
              </div>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '20px', color: '#0d9488' }}>INSTANT TRUST! ✅</div>
            </div>
          )},
          { bg: '#fefce8', caption: { bg: '#854d0e', text: '"Only 3 left!" + live buyer = FOMO explosion!' }, content: () => (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <div style={{ background: '#ff3b3b', border: '2.5px solid #111', borderRadius: '14px', padding: '6px 11px', fontSize: '11px', fontWeight: 700, color: 'white', textAlign: 'center' }}>
                ⚠️ Only 3 left in stock!
              </div>
              <div style={{ background: '#FFE033', border: '2.5px solid #111', borderRadius: '14px', padding: '6px 11px', fontSize: '11px', fontWeight: 700, color: '#111', textAlign: 'center' }}>
                Someone from Jūrmala just added this to cart! 🛒
              </div>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '22px', color: '#ff3b3b' }}>FOMO OVERLOAD! ⚡</div>
            </div>
          )},
          { bg: '#f0fdf4', caption: { bg: '#15803d', text: 'Hesitation gone. Checkout button gets clicked!' }, content: () => (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <div style={{ fontSize: '36px' }}>🖱️</div>
              <div style={{ background: '#0d9488', color: 'white', border: '3px solid #111', borderRadius: '8px', padding: '8px 20px', fontFamily: "'Bangers', cursive", fontSize: '16px', boxShadow: '3px 3px 0 #111' }}>BUY NOW →</div>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '22px', color: '#15803d' }}>CLICK! 💥</div>
            </div>
          )},
          { bg: '#fefce8', caption: { bg: '#854d0e', text: 'Same traffic. 0.8% → 3.2% conversion. 4x revenue!' }, content: () => (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '40px', color: '#15803d', lineHeight: 1 }}>3.2%</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#555' }}>conversion (was 0.8%)</div>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '28px', color: '#0d9488' }}>4× REVENUE! 💸</div>
            </div>
          )},
        ]
      }
    ]
  }
}

function ResultsGrid({ items }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px', margin: '24px 0' }}>
      {items.map(({ num, label, color }, i) => (
        <div key={i} style={{ background: 'white', border: '3px solid #111', borderRadius: '10px', padding: '18px', textAlign: 'center', boxShadow: '5px 5px 0 #111' }}>
          <div style={{ fontFamily: "'Bangers', cursive", fontSize: '42px', lineHeight: 1, color }}>{num}</div>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#555', marginTop: '4px' }}>{label}</div>
        </div>
      ))}
    </div>
  )
}

function BizStories() {
  const [active, setActive] = useState('salon')
  const story = STORIES[active]

  return (
    <div id="stories">
      {/* Business selector */}
      <div style={{ background: '#fffde7', padding: '60px 32px', borderTop: '3px solid #111' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ fontFamily: "'Bangers', cursive", fontSize: '13px', letterSpacing: '3px', color: '#7c3aed', marginBottom: '8px', display: 'block' }}>PICK YOUR STORY</span>
          <h2 style={{ fontFamily: "'Bangers', cursive", fontSize: '38px', color: '#111', marginBottom: '8px', letterSpacing: '1px' }}>WHICH BUSINESS ARE YOU?</h2>
          <p style={{ fontSize: '15px', color: '#666', marginBottom: '32px' }}>See exactly how Popproof works for your type of business</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {Object.entries(STORIES).map(([key, s]) => (
              <button key={key} onClick={() => setActive(key)} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                padding: '20px 28px', border: `3px solid ${active === key ? s.color : '#111'}`,
                borderRadius: '12px', cursor: 'pointer', minWidth: '140px',
                background: active === key ? s.bg : 'white',
                boxShadow: active === key ? '3px 3px 0 #111' : '5px 5px 0 #111',
                transform: active === key ? 'translate(2px,2px)' : 'none',
                transition: 'all 0.15s',
              }}>
                <span style={{ fontSize: '36px' }}>{s.ico}</span>
                <span style={{ fontFamily: "'Bangers', cursive", fontSize: '17px', letterSpacing: '1px' }}>{s.label}</span>
                <span style={{ fontSize: '10px', color: '#888', fontWeight: 700 }}>{s.sub}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Story panels */}
      <div style={{ background: '#fffde7', padding: '0 32px 60px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          {story.chapters.map((chapter, ci) => (
            <div key={ci} style={{ border: '3px solid #111', borderRadius: '10px', overflow: 'hidden', boxShadow: '7px 7px 0 #111', marginBottom: '28px' }}>
              {/* Chapter header */}
              <div style={{ padding: '9px 18px', background: chapter.hdrBg, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: "'Bangers', cursive", fontSize: '14px', letterSpacing: '1.5px', color: 'white' }}>{chapter.title}</span>
                <div style={{ display: 'flex', gap: '5px' }}>
                  {[0,1,2].map(d => <div key={d} style={{ width: '9px', height: '9px', borderRadius: '50%', background: chapter.dotColor }} />)}
                </div>
              </div>
              {/* Panels */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
                {chapter.panels.map((panel, pi) => (
                  <div key={pi} style={{
                    borderRight: pi < 3 ? '3px solid #111' : 'none',
                    borderBottom: 'none',
                    padding: '13px', minHeight: '200px',
                    display: 'flex', flexDirection: 'column',
                    background: panel.bg, position: 'relative',
                  }}>
                    <div style={{ position: 'absolute', top: '5px', left: '7px', fontFamily: "'Bangers', cursive", fontSize: '12px', color: '#ddd' }}>{pi + 1}</div>
                    {panel.content()}
                    <div style={{ padding: '7px 10px', fontSize: '11px', fontWeight: 700, color: 'white', textAlign: 'center', lineHeight: 1.4, marginTop: 'auto', background: panel.caption.bg }}>
                      {panel.caption.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Results */}
          {active === 'salon' && <ResultsGrid items={[{ num: '+60%', label: 'More bookings in 30 days', color: '#7c3aed' }, { num: '€0', label: 'Ad spend needed', color: '#15803d' }, { num: '2×', label: 'Team size (hired staff!)', color: '#f97316' }]} />}
          {active === 'cafe' && <ResultsGrid items={[{ num: '+40%', label: 'Weekday revenue', color: '#f97316' }, { num: '3×', label: 'Tuesday covers', color: '#15803d' }, { num: '€0', label: 'Extra marketing spend', color: '#7c3aed' }]} />}
          {active === 'shop' && <ResultsGrid items={[{ num: '3.2%', label: 'Conversion (was 0.8%)', color: '#0d9488' }, { num: '4×', label: 'Revenue, same traffic', color: '#15803d' }, { num: '€0', label: 'Extra ad spend', color: '#7c3aed' }]} />}
        </div>
      </div>
    </div>
  )
}

// ============ FEATURES ============
function Features() {
  const feats = [
    { ico: '⚡', bg: '#FFE033', title: 'REAL-TIME NOTIFICATIONS', desc: 'Show live bookings, purchases, and reviews the moment they happen. Zero delay, maximum impact.' },
    { ico: '📍', bg: '#ede9fe', title: 'HYPER-LOCAL TARGETING', desc: '"Marta from your street just booked!" Ultra-relevant notifications that feel personal.' },
    { ico: '🎨', bg: '#d1fae5', title: '5-MINUTE SETUP', desc: 'Paste one line of code. Customize colors. Go live. No developer needed.' },
    { ico: '📊', bg: '#fce7f3', title: 'WORKS EVERYWHERE', desc: 'Salons, cafés, restaurants, online stores. Any website, any CMS, any platform.' },
    { ico: '🔒', bg: '#ede9fe', title: 'GDPR COMPLIANT', desc: 'Privacy-first. No personal data stored. Works across all EU markets without worry.' },
    { ico: '💬', bg: '#FFE033', title: 'REVIEW COLLECTION', desc: 'Automatically collect and display Google reviews. Build credibility on autopilot.' },
  ]
  return (
    <section id="features" style={{ background: 'white', padding: '60px 32px', borderTop: '3px solid #111' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ fontFamily: "'Bangers', cursive", fontSize: '13px', letterSpacing: '3px', color: '#7c3aed', display: 'block', marginBottom: '8px' }}>WHAT YOU GET</span>
          <h2 style={{ fontFamily: "'Bangers', cursive", fontSize: '38px', color: '#111', letterSpacing: '1px' }}>EVERY SUPERPOWER INCLUDED ⚡</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '18px' }}>
          {feats.map((f, i) => (
            <div key={i} style={{ background: 'white', border: '3px solid #111', borderRadius: '10px', padding: '22px', boxShadow: '5px 5px 0 #111', transition: 'all 0.15s', cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '7px 7px 0 #111' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '5px 5px 0 #111' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '9px', border: '3px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', fontSize: '20px', background: f.bg }}>
                {f.ico}
              </div>
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
  return (
    <section id="pricing" style={{ background: '#FFE033', padding: '60px 32px', borderTop: '3px solid #111', textAlign: 'center' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <span style={{ fontFamily: "'Bangers', cursive", fontSize: '13px', letterSpacing: '3px', color: '#7c3aed', display: 'block', marginBottom: '8px' }}>SIMPLE PRICING</span>
        <h2 style={{ fontFamily: "'Bangers', cursive", fontSize: '38px', color: '#111', letterSpacing: '1px', marginBottom: '32px' }}>ONE PLAN. EVERYTHING INCLUDED.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', textAlign: 'left' }}>
          {/* Free */}
          <div style={{ background: 'white', border: '3px solid #111', borderRadius: '12px', padding: '26px', boxShadow: '5px 5px 0 #111' }}>
            <h3 style={{ fontFamily: "'Bangers', cursive", fontSize: '22px', marginBottom: '6px' }}>STARTER</h3>
            <div style={{ fontFamily: "'Bangers', cursive", fontSize: '44px', lineHeight: 1, marginBottom: '6px' }}>€0<sub style={{ fontSize: '13px', fontFamily: "'Comic Neue', cursive", fontWeight: 400 }}>/forever</sub></div>
            <ul style={{ listStyle: 'none', margin: '14px 0', padding: 0 }}>
              {['Up to 500 notifications/mo', 'Basic widget', '1 website', 'Email support'].map((item, i) => (
                <li key={i} style={{ fontSize: '12px', padding: '4px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontWeight: 900, color: '#7c3aed' }}>✓</span>{item}
                </li>
              ))}
            </ul>
            <a href="/signup" style={{ display: 'block', width: '100%', fontFamily: "'Bangers', cursive", fontSize: '18px', letterSpacing: '0.5px', padding: '10px', border: '3px solid #111', borderRadius: '7px', cursor: 'pointer', marginTop: '8px', boxShadow: '4px 4px 0 #111', background: 'transparent', color: '#111', textAlign: 'center', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-1px,-1px)'; e.currentTarget.style.boxShadow = '5px 5px 0 #111' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '4px 4px 0 #111' }}>
              GET STARTED FREE
            </a>
          </div>
          {/* Pro */}
          <div style={{ background: '#7c3aed', border: '3px solid #111', borderRadius: '12px', padding: '26px', boxShadow: '6px 6px 0 #111', position: 'relative' }}>
            <div style={{ display: 'inline-block', background: '#FFE033', color: '#111', border: '2px solid #111', fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '4px', marginBottom: '10px' }}>⭐ MOST POPULAR</div>
            <h3 style={{ fontFamily: "'Bangers', cursive", fontSize: '22px', marginBottom: '6px', color: 'white' }}>PRO</h3>
            <div style={{ fontFamily: "'Bangers', cursive", fontSize: '44px', lineHeight: 1, marginBottom: '6px', color: '#FFE033' }}>€19<sub style={{ fontSize: '13px', fontFamily: "'Comic Neue', cursive", fontWeight: 400, color: 'rgba(255,255,255,0.7)' }}>/month</sub></div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', fontWeight: 700, marginBottom: '8px' }}>🎁 14-day free trial — no card needed</div>
            <ul style={{ listStyle: 'none', margin: '14px 0', padding: 0 }}>
              {['Unlimited notifications', 'Hyper-local targeting', 'All business types', 'Review collection', 'GDPR compliant', 'Priority support'].map((item, i) => (
                <li key={i} style={{ fontSize: '12px', padding: '4px 0', display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.9)' }}>
                  <span style={{ fontWeight: 900, color: '#FFE033' }}>✓</span>{item}
                </li>
              ))}
            </ul>
            <a href="/signup" style={{ display: 'block', width: '100%', fontFamily: "'Bangers', cursive", fontSize: '18px', letterSpacing: '0.5px', padding: '10px', border: '3px solid #111', borderRadius: '7px', cursor: 'pointer', marginTop: '8px', boxShadow: '4px 4px 0 #111', background: 'white', color: '#7c3aed', textAlign: 'center', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-1px,-1px)'; e.currentTarget.style.boxShadow = '5px 5px 0 #111' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '4px 4px 0 #111' }}>
              🚀 START FREE TRIAL
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============ TESTIMONIALS ============
function Testimonials() {
  const tests = [
    { stars: 5, text: 'My booking rate went up 60% in the first month. The hyper-local notifications are genius — clients love seeing names from their own neighborhood.', name: 'Ieva K.', biz: 'Salon Owner, Riga', avatar: '💇‍♀️' },
    { stars: 5, text: 'Simple setup, real results. My Tuesday mornings are now fully booked. I tell every local business owner about Popproof.', name: 'Martins L.', biz: 'Café Owner, Jūrmala', avatar: '☕' },
    { stars: 5, text: 'Conversion went from 1.1% to 3.4%. Same traffic, way more sales. The live purchase bubbles create genuine urgency.', name: 'Zane B.', biz: 'Shopify Store Owner', avatar: '🛍️' },
  ]
  return (
    <section style={{ background: 'white', padding: '60px 32px', borderTop: '3px solid #111' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ fontFamily: "'Bangers', cursive", fontSize: '13px', letterSpacing: '3px', color: '#7c3aed', display: 'block', marginBottom: '8px' }}>REAL RESULTS</span>
          <h2 style={{ fontFamily: "'Bangers', cursive", fontSize: '38px', color: '#111', letterSpacing: '1px' }}>BUSINESSES LOVE POPPROOF ⭐</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '18px' }}>
          {tests.map((t, i) => (
            <div key={i} style={{ background: 'white', border: '3px solid #111', borderRadius: '10px', padding: '20px', boxShadow: '4px 4px 0 #111' }}>
              <div style={{ color: '#FFE033', fontSize: '16px', marginBottom: '8px' }}>{'★'.repeat(t.stars)}</div>
              <p style={{ fontSize: '13px', color: '#444', lineHeight: 1.6, marginBottom: '14px', fontStyle: 'italic' }}>"{t.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', border: '2px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>{t.avatar}</div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700 }}>{t.name}</div>
                  <div style={{ fontSize: '10px', color: '#999' }}>{t.biz}</div>
                </div>
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
    <section style={{ background: '#0d0a1a', padding: '70px 32px', borderTop: '3px solid #111', textAlign: 'center' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Bangers', cursive", fontSize: '44px', color: 'white', letterSpacing: '1px', marginBottom: '12px' }}>
          READY TO <span style={{ color: '#FFE033' }}>EXPLODE</span> YOUR CONVERSIONS? 🚀
        </h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.55)', marginBottom: '32px', lineHeight: 1.7 }}>
          Join 500+ local businesses already using Popproof to turn visitors into customers.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/signup" style={{ fontFamily: "'Bangers', cursive", fontSize: '22px', letterSpacing: '1px', padding: '14px 32px', background: '#7c3aed', color: 'white', border: '3px solid #111', borderRadius: '8px', cursor: 'pointer', boxShadow: '5px 5px 0 #111', textDecoration: 'none' }}>
            🚀 START FREE TRIAL
          </a>
          <a href="/login" style={{ fontFamily: "'Bangers', cursive", fontSize: '22px', letterSpacing: '1px', padding: '14px 32px', background: '#FFE033', color: '#111', border: '3px solid #111', borderRadius: '8px', cursor: 'pointer', boxShadow: '5px 5px 0 #111', textDecoration: 'none' }}>
            LOGIN →
          </a>
        </div>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '16px', fontWeight: 700 }}>✓ 14-day free trial &nbsp;·&nbsp; ✓ No credit card &nbsp;·&nbsp; ✓ Cancel anytime</p>
      </div>
    </section>
  )
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer style={{ background: '#0d0a1a', borderTop: '3px solid #111', padding: '40px 32px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '32px' }}>
        <div>
          <img src="/popproof-logo.png" alt="Popproof" style={{ height: '34px', objectFit: 'contain', marginBottom: '12px' }} />
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: '240px' }}>
            Social proof & FOMO notifications for local businesses. Turn visitors into customers in 5 minutes.
          </p>
        </div>
        {[
          { title: 'PRODUCT', links: [['Features', '#features'], ['Pricing', '#pricing'], ['How it works', '#stories']] },
          { title: 'COMPANY', links: [['About', '#'], ['Blog', '#'], ['Contact', 'mailto:hello@popproof.io']] },
          { title: 'LEGAL', links: [['Privacy', '#'], ['Terms', '#'], ['GDPR', '#']] },
        ].map((col, i) => (
          <div key={i}>
            <h4 style={{ fontFamily: "'Bangers', cursive", fontSize: '14px', color: 'white', letterSpacing: '1px', marginBottom: '12px' }}>{col.title}</h4>
            {col.links.map(([label, href]) => (
              <a key={label} href={href} style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', marginBottom: '6px', fontWeight: 700 }}
                onMouseEnter={e => e.target.style.color = '#FFE033'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}>{label}</a>
            ))}
          </div>
        ))}
      </div>
      <div style={{ maxWidth: '960px', margin: '24px auto 0', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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