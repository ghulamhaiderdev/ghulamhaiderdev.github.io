import type { APIRoute } from 'astro';

export const prerender = false;

// ── Rate Limiting ─────────────────────────────────────────────────────
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 5; // 5 submissions per hour per IP
const MIN_SUBMISSION_TIME_MS = 3000; // Minimum 3 seconds to fill form

interface RateLimitEntry {
  count: number;
  firstRequest: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Clean up old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now - entry.firstRequest > RATE_LIMIT_WINDOW_MS) {
      rateLimitMap.delete(ip);
    }
  }
}, 10 * 60 * 1000);

function getClientIP(request: Request): string {
  // Check common headers for real IP (behind proxies/load balancers)
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  // Fallback
  return 'unknown';
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1, resetIn: RATE_LIMIT_WINDOW_MS };
  }

  // Reset if window has passed
  if (now - entry.firstRequest > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1, resetIn: RATE_LIMIT_WINDOW_MS };
  }

  // Check if under limit
  if (entry.count < MAX_REQUESTS_PER_WINDOW) {
    entry.count++;
    return {
      allowed: true,
      remaining: MAX_REQUESTS_PER_WINDOW - entry.count,
      resetIn: RATE_LIMIT_WINDOW_MS - (now - entry.firstRequest)
    };
  }

  // Rate limited
  return {
    allowed: false,
    remaining: 0,
    resetIn: RATE_LIMIT_WINDOW_MS - (now - entry.firstRequest)
  };
}

// ── Types ─────────────────────────────────────────────────────────────
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  recaptchaToken?: string;
  // Anti-spam fields
  website?: string; // Honeypot field - should be empty
  formLoadedAt?: number; // Timestamp when form was loaded
}

interface RecaptchaResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = import.meta.env.RECAPTCHA_SECRET;

  if (!secretKey) {
    console.warn('reCAPTCHA secret not configured, skipping verification');
    return true;
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });

    const data: RecaptchaResponse = await response.json();

    // For reCAPTCHA v3, check score (0.0 - 1.0, higher is more likely human)
    if (data.score !== undefined) {
      return data.success && data.score >= 0.5;
    }

    return data.success;
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error);
    return false;
  }
}

async function sendEmail(data: ContactFormData): Promise<boolean> {
  const resendApiKey = import.meta.env.RESEND_API_KEY;
  const toEmail = import.meta.env.CONTACT_EMAIL || 'ghulamhaider@example.com'; // Your email

  if (!resendApiKey) {
    console.warn('Resend API Key not configured');
    console.log('Contact form submission (Dev Mode):', data);
    return true;
  }

  try {
    // 1. Send notification to YOU
    const notificationResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'Portfolio <onboarding@resend.dev>', // Use this sender for testing
        to: toEmail,
        subject: `New Message: ${data.subject}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #333;">New Contact Form Submission</h2>
            <p><strong>From:</strong> ${escapeHtml(data.name)} (${escapeHtml(data.email)})</p>
            <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="white-space: pre-wrap; color: #555;">${escapeHtml(data.message)}</p>
          </div>
        `,
      }),
    });

    // 2. Send confirmation to the SENDER (optional but professional)
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'Ghulam Haider <onboarding@resend.dev>',
        to: data.email,
        subject: 'Thank you for reaching out!',
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2>Hi ${escapeHtml(data.name)},</h2>
            <p>Thanks for getting in touch! I've received your message regarding "<strong>${escapeHtml(data.subject)}</strong>".</p>
            <p>I'll review it and get back to you as soon as possible.</p>
            <br />
            <p>Best Regards,<br /><strong>Ghulam Haider</strong></p>
          </div>
        `,
      }),
    });

    return notificationResponse.ok;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Check rate limit first
    const clientIP = getClientIP(request);
    const rateLimit = checkRateLimit(clientIP);

    if (!rateLimit.allowed) {
      const resetMinutes = Math.ceil(rateLimit.resetIn / 60000);
      return new Response(
        JSON.stringify({
          success: false,
          error: `Too many submissions. Please try again in ${resetMinutes} minute${resetMinutes > 1 ? 's' : ''}.`
        }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await request.json();
    const { name, email, subject, message, recaptchaToken, website, formLoadedAt } = body as ContactFormData;

    // Honeypot check - if the hidden field has any value, it's a bot
    if (website) {
      // Silently reject but return success to not tip off the bot
      console.log('Honeypot triggered from IP:', clientIP);
      return new Response(
        JSON.stringify({ success: true, message: 'Message sent successfully!' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Minimum time check - reject if submitted too quickly (bots are instant)
    if (formLoadedAt) {
      const submissionTime = Date.now() - formLoadedAt;
      if (submissionTime < MIN_SUBMISSION_TIME_MS) {
        console.log('Submission too fast from IP:', clientIP, 'Time:', submissionTime, 'ms');
        // Silently reject
        return new Response(
          JSON.stringify({ success: true, message: 'Message sent successfully!' }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ success: false, error: 'All fields are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid email address' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate field lengths
    if (name.length > 100 || email.length > 100 || subject.length > 200 || message.length > 5000) {
      return new Response(
        JSON.stringify({ success: false, error: 'Field length exceeded' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify reCAPTCHA if token provided
    if (recaptchaToken) {
      const isHuman = await verifyRecaptcha(recaptchaToken);
      if (!isHuman) {
        return new Response(
          JSON.stringify({ success: false, error: 'reCAPTCHA verification failed' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Send email
    const sent = await sendEmail({ name, email, subject, message });

    if (!sent) {
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to send message. Please try again.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Message sent successfully!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'An unexpected error occurred' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// Handle preflight requests
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
