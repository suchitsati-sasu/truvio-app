import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, business_name } = req.body;

  if (!email || !business_name) {
    return res.status(400).json({ error: 'Missing email or business_name' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Popproof <hello@popproof.io>',
      to: email,
      subject: '⏰ Your Popproof trial ends in 2 days!',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <link href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@700&display=swap" rel="stylesheet"/>
          </head>
          <body style="margin:0;padding:0;background:#f4f4f4;font-family:'Comic Neue',Arial,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0;">
              <tr>
                <td align="center">
                  <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:3px solid #111;border-radius:16px;box-shadow:6px 6px 0 #111;overflow:hidden;">
                    
                    <!-- Header -->
                    <tr>
                      <td style="background:#7c3aed;padding:28px 40px;text-align:center;border-bottom:3px solid #111;">
                        <img src="https://popproof.io/popproof-logo.png" alt="Popproof" height="36" style="display:block;margin:0 auto;"/>
                      </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                      <td style="padding:36px 40px;">
                        <h1 style="font-size:26px;color:#111;margin:0 0 8px 0;letter-spacing:1px;">⏰ Your trial ends in 2 days!</h1>
                        <p style="font-size:15px;color:#444;margin:0 0 24px 0;line-height:1.6;">
                          Hey <strong>${business_name}</strong>! 👋<br/><br/>
                          Your 14-day free trial is ending in <strong>2 days</strong>.<br/>
                          You've been building trust with FOMO notifications — don't let it stop now!
                        </p>

                        <!-- CTA Button -->
                        <table cellpadding="0" cellspacing="0" style="margin:0 0 24px 0;">
                          <tr>
                            <td style="background:#7c3aed;border:3px solid #111;border-radius:8px;box-shadow:4px 4px 0 #111;">
                              <a href="https://popproof.io/dashboard" style="display:inline-block;padding:14px 32px;color:#ffffff;font-size:18px;font-weight:700;text-decoration:none;letter-spacing:1px;">
                                🚀 Subscribe Now — €19/month
                              </a>
                            </td>
                          </tr>
                        </table>

                        <p style="font-size:13px;color:#888;margin:0;line-height:1.6;">
                          ✓ Cancel anytime &nbsp;|&nbsp; ✓ No hidden fees &nbsp;|&nbsp; ✓ GDPR compliant
                        </p>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="background:#f9f9f9;border-top:3px solid #111;padding:20px 40px;text-align:center;">
                        <p style="font-size:12px;color:#999;margin:0;">
                          © 2025 Popproof · <a href="https://popproof.io" style="color:#7c3aed;text-decoration:none;">popproof.io</a>
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    if (error) {
      return res.status(400).json({ error });
    }

    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}