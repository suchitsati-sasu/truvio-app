const { Resend } = require('resend')

const resend = new Resend(process.env.RESEND_API_KEY)

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end()

  const { email, business_name, userId } = req.body

  try {
    await resend.emails.send({
      from: 'Popproof <hello@popproof.io>',
      to: email,
      subject: "🎉 You're in! Your FOMO machine is live — here's what to do next",
      html: `
        <!DOCTYPE html>
        <html>
        <body style="margin:0;padding:0;background:#0d0a1a;font-family:Arial,sans-serif;">
          <div style="max-width:600px;margin:0 auto;padding:40px 20px;">

            <!-- Header -->
            <div style="text-align:center;margin-bottom:32px;">
              <h1 style="font-size:32px;color:white;margin:0;letter-spacing:2px;">
                🚀 LET'S GET YOU MORE CUSTOMERS!
              </h1>
              <p style="color:rgba(255,255,255,0.5);font-size:14px;font-weight:700;margin-top:8px;">
                Your 14-day free trial just kicked off ⚡
              </p>
            </div>

            <!-- Main card -->
            <div style="background:#1a1030;border:3px solid rgba(124,58,237,0.4);border-radius:16px;padding:32px;margin-bottom:24px;">
              <p style="color:white;font-size:16px;font-weight:700;margin-top:0;">
                Hey ${business_name ? business_name : 'there'}! 👋
              </p>
              <p style="color:rgba(255,255,255,0.7);font-size:14px;line-height:1.8;margin-bottom:20px;">
                You just made a smart move. While your competitors are losing visitors to doubt and hesitation — <strong style="color:white;">you're about to show real-time social proof that converts.</strong>
              </p>
              <p style="color:rgba(255,255,255,0.7);font-size:14px;line-height:1.8;">
                Here's your widget code — paste it once, and watch the magic happen:
              </p>

              <!-- Widget code -->
              <div style="background:#0a0614;border:2px solid rgba(124,58,237,0.3);border-radius:8px;padding:16px;margin:16px 0;">
                <p style="color:rgba(255,255,255,0.3);font-size:11px;font-weight:700;letter-spacing:2px;margin:0 0 8px 0;">YOUR WIDGET CODE</p>
                <code style="color:#a78bfa;font-size:12px;word-break:break-all;font-family:monospace;">
                  &lt;script src="https://popproof.io/widget.js" data-user-id="${userId}"&gt;&lt;/script&gt;
                </code>
              </div>
              <p style="color:rgba(255,255,255,0.5);font-size:13px;">
                📌 Paste before <strong style="color:white;">&lt;/body&gt;</strong> on your website. Takes 30 seconds.
              </p>
            </div>

            <!-- 3 steps -->
            <div style="background:#1a1030;border:3px solid rgba(124,58,237,0.4);border-radius:16px;padding:28px;margin-bottom:24px;">
              <p style="color:#FFE033;font-size:16px;font-weight:700;margin:0 0 16px 0;letter-spacing:1px;">⚡ 3 THINGS TO DO RIGHT NOW:</p>
              <div style="display:flex;flex-direction:column;gap:12px;">
                <div style="display:flex;align-items:center;gap:12px;">
                  <div style="width:32px;height:32px;background:#7c3aed;border:2px solid #111;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:14px;flex-shrink:0;">1</div>
                  <p style="color:rgba(255,255,255,0.8);font-size:14px;margin:0;">📋 <strong style="color:white;">Copy your widget code</strong> above</p>
                </div>
                <div style="display:flex;align-items:center;gap:12px;">
                  <div style="width:32px;height:32px;background:#7c3aed;border:2px solid #111;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:14px;flex-shrink:0;">2</div>
                  <p style="color:rgba(255,255,255,0.8);font-size:14px;margin:0;">🌐 <strong style="color:white;">Paste it on your website</strong></p>
                </div>
                <div style="display:flex;align-items:center;gap:12px;">
                  <div style="width:32px;height:32px;background:#7c3aed;border:2px solid #111;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:14px;flex-shrink:0;">3</div>
                  <p style="color:rgba(255,255,255,0.8);font-size:14px;margin:0;">🎯 <strong style="color:white;">Share your review link</strong> with customers</p>
                </div>
              </div>
            </div>

            <!-- CTA -->
            <div style="text-align:center;margin-bottom:24px;">
              <a href="https://popproof.io/dashboard" style="display:inline-block;font-size:18px;font-weight:700;padding:14px 36px;background:#7c3aed;color:white;border:3px solid #111;border-radius:8px;text-decoration:none;box-shadow:4px 4px 0 #111;letter-spacing:1px;">
                🚀 GO TO MY DASHBOARD →
              </a>
            </div>

            <!-- Trial reminder -->
            <div style="background:#1a1030;border:3px solid rgba(245,158,11,0.4);border-radius:12px;padding:20px;margin-bottom:24px;text-align:center;">
              <p style="color:#f59e0b;font-size:16px;font-weight:700;margin:0 0 8px 0;">⏳ Your trial ends in 14 days</p>
              <p style="color:rgba(255,255,255,0.5);font-size:13px;margin:0;">
                After that, just <strong style="color:white;">€19/month</strong> — less than one coffee per day ☕<br>
                Cancel anytime, no questions asked.
              </p>
            </div>

            <!-- Footer -->
            <div style="text-align:center;">
              <p style="color:rgba(255,255,255,0.4);font-size:13px;font-style:italic;">
                Questions? Reply to this email — we actually read them! 💜
              </p>
              <p style="color:rgba(255,255,255,0.2);font-size:11px;font-weight:700;margin-top:8px;">
                © 2025 Popproof · SIA Nexvian · Riga, Latvia · hello@popproof.io
              </p>
            </div>

          </div>
        </body>
        </html>
      `,
    })

    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}