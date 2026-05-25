(function () {
  const SUPABASE_URL = 'https://sqlyavusvmgmhzkrjgdf.supabase.co'
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxbHlhdnVzdm1nbWh6a3JqZ2RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0NTAyMzMsImV4cCI6MjA5NTAyNjIzM30.hgplV37Y53RiNH-5LHZtnv17ezT8RUPwG-rRkIBEF6g'

  const userId = document.currentScript?.getAttribute('data-user-id')
  if (!userId) return

  let notifications = []
  let currentIndex = 0

  async function fetchNotifications() {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/notifications?user_id=eq.${userId}&order=created_at.desc&limit=150`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    )
    const data = await res.json()
    notifications = data || []
  }

  function createWidget() {
    const widget = document.createElement('div')
    widget.id = 'truvio-widget'
    widget.style.cssText = `
      position: fixed;
      bottom: 24px;
      left: 24px;
      background: white;
      border-radius: 12px;
      padding: 14px 18px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      display: flex;
      align-items: center;
      gap: 12px;
      z-index: 99999;
      max-width: 320px;
      font-family: sans-serif;
      font-size: 14px;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.4s ease;
    `
    document.body.appendChild(widget)
    return widget
  }

  function showNotification(widget, notif) {
    if (!notif) return

    const message = notif.message || `${notif.name || 'Someone'} from ${notif.location || ''} ${notif.action || 'just visited'}`

    widget.innerHTML = `
      <div style="font-size:28px">⭐</div>
      <div>
        <div style="font-weight:600;color:#111">${message}</div>
      </div>
      <div id="truvio-close" style="margin-left:auto;cursor:pointer;color:#ccc;font-size:18px">×</div>
    `

    widget.querySelector('#truvio-close').addEventListener('click', () => {
      hideWidget(widget)
    })

    setTimeout(() => {
      widget.style.opacity = '1'
      widget.style.transform = 'translateY(0)'
    }, 100)

    setTimeout(() => {
      hideWidget(widget)
    }, 5000)
  }

  function hideWidget(widget) {
    widget.style.opacity = '0'
    widget.style.transform = 'translateY(20px)'
  }

  async function init() {
    await fetchNotifications()
    if (notifications.length === 0) return

    const widget = createWidget()

    function showNext() {
      if (notifications.length === 0) return
      const notif = notifications[currentIndex % notifications.length]
      currentIndex++
      showNotification(widget, notif)
      setTimeout(showNext, 12000)
    }

    setTimeout(showNext, 7000)
  }

  init()
})()