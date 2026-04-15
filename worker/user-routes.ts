import { Hono } from "hono";
import type { Env } from './core-utils';
import { UserEntity } from "./entities";
import { ok, bad } from './core-utils';

interface Ai {
  run(model: string, inputs: Record<string, unknown>): Promise<{ response?: string; [k: string]: unknown }>;
}

interface AppEnv extends Env {
  DB: D1Database;
  AI: Ai;
  EMAIL_PROVIDER?: string;
  EMAIL_API_KEY?: string;
  FROM_EMAIL?: string;
  TO_EMAIL?: string;
}

// ─── MMD Knowledge Base for the AI ──────────────────────────────────────────
const MMD_SYSTEM_PROMPT = `You are the friendly customer support assistant for Midwest Medical Delivery (MMD), a HIPAA-compliant medical courier service in Northwest Indiana.

ABOUT MMD:
- We provide same-day and scheduled medical deliveries across Northwest Indiana
- We serve: dental labs, dental offices, pharmacies, medical clinics, hospitals, veterinary clinics, medical spas (med spas), physical therapy practices, assisted living communities, nursing homes, and rehabilitation centers
- We provide daily and/or weekly pharmacy pickup and delivery to assisted living communities, nursing homes, and rehabilitation centers
- Service area: Gary, Hammond, East Chicago, Whiting, Munster, Highland, Dyer, Schererville, Merrillville, Crown Point, Portage, Valparaiso, Chesterton, and surrounding NWI communities
- All drivers are background-checked, insured, and HIPAA-trained
- We handle dental molds/impressions, lab specimens, prescriptions, medical supplies, and sterile items
- We offer scheduled routes and on-demand dispatch

HOURS OF OPERATION:
- Monday – Friday: 7:00 AM – 5:00 PM (CST)
- Saturday: 8:00 AM – 3:00 PM (CST)
- Sunday: Closed
- For after-hours emergencies, email dispatch@midwestmedicaldelivery.com

CONTACT:
- Email: dispatch@midwestmedicaldelivery.com
- Website: midwestmedicaldelivery.com
- Contact form: midwestmedicaldelivery.com/contact
- FAQ page: midwestmedicaldelivery.com/faq

PRICING: Custom quotes based on route, frequency, and item type. Visitors should fill out the contact form for a quote.

ANSWER STYLE:
- Be warm, concise, and professional
- Keep answers under 3 sentences when possible
- If the user asks about pricing, scheduling, or anything you're not 100% sure about, politely say you'll have a human follow up and set showContactForm to true
- Do NOT make up specific prices, phone numbers, or driver details
- If a question is completely unrelated to MMD services, say "That's outside my expertise, but I'm here to help with anything MMD-related!"

Respond ONLY with a JSON object in this exact format:
{"reply": "your response here", "showContactForm": false}

Set showContactForm to true ONLY when the question requires human follow-up (pricing quotes, scheduling, complaints, or topics you're uncertain about).`

// ─── Email Helpers ────────────────────────────────────────────────────────────
function buildOwnerEmailHtml(data: Record<string, string>, refId: string): string {
  const contactTypeLabel = data.contactType === 'delivery' ? '🚐 Delivery Request' : '✉️ General Inquiry';
  const rows: [string, string][] = [
    ['Reference ID', `#${refId}`],
    ['Type', contactTypeLabel],
    ['Name / Clinic', data.name || 'N/A'],
    ['Phone', data.phone || 'N/A'],
    ['Email', data.email || 'N/A'],
  ];
  if (data.contactType === 'delivery') {
    rows.push(['Pickup Location', data.pickup || 'N/A']);
    rows.push(['Delivery Destination', data.delivery || 'N/A']);
  }
  rows.push(['Message', data.message || 'N/A']);
  rows.push(['Source', data.source || 'contact_form']);
  rows.push(['Submitted At', new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }) + ' CST']);

  const tableRows = rows.map(([label, value]) => `
    <tr>
      <td style="padding:10px 16px;font-weight:600;color:#374151;background:#f9fafb;white-space:nowrap;border-bottom:1px solid #e5e7eb;">${label}</td>
      <td style="padding:10px 16px;color:#111827;border-bottom:1px solid #e5e7eb;">${value}</td>
    </tr>`).join('');

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <div style="background:#00A699;padding:28px 32px;">
      <div style="font-size:22px;font-weight:800;color:#fff;">MMD — New ${contactTypeLabel}</div>
      <div style="font-size:13px;color:rgba(255,255,255,0.85);margin-top:6px;">Ref #${refId} · Requires your attention</div>
    </div>
    <div style="padding:28px 32px;">
      <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;font-size:14px;">${tableRows}</table>
    </div>
    <div style="background:#f9fafb;padding:18px 32px;border-top:1px solid #e5e7eb;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">Midwest Medical Delivery · dispatch@midwestmedicaldelivery.com · midwestmedicaldelivery.com</p>
    </div>
  </div>
</body></html>`;
}

function buildThankYouEmailHtml(name: string, refId: string, contactType: string): string {
  const isDelivery = contactType === 'delivery';
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <div style="background:#00A699;padding:28px 32px;">
      <div style="font-size:22px;font-weight:800;color:#fff;">${isDelivery ? '✅ Delivery Request Received' : '✅ Message Received'} — Midwest Medical Delivery</div>
    </div>
    <div style="padding:32px;">
      <p style="font-size:16px;color:#111827;margin:0 0 16px;">Hi <strong>${name}</strong>,</p>
      <p style="font-size:15px;color:#374151;line-height:1.6;margin:0 0 16px;">
        ${isDelivery
          ? 'Thank you for your delivery request. Our dispatch team will review your pickup details and contact you shortly to confirm scheduling.'
          : 'Thank you for reaching out to Midwest Medical Delivery. We\'ve received your message and will respond within 24 hours.'}
      </p>
      <div style="background:#f0fdfa;border:1px solid #99f6e4;border-radius:8px;padding:16px 20px;margin:20px 0;">
        <div style="font-size:13px;font-weight:600;color:#0d9488;margin-bottom:4px;">Your Reference ID</div>
        <div style="font-size:20px;font-weight:800;color:#00A699;letter-spacing:2px;">#${refId}</div>
        <div style="font-size:12px;color:#6b7280;margin-top:4px;">Keep this for your records</div>
      </div>
    </div>
    <div style="background:#f9fafb;padding:18px 32px;border-top:1px solid #e5e7eb;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">Midwest Medical Delivery · <a href="https://midwestmedicaldelivery.com" style="color:#00A699;">midwestmedicaldelivery.com</a></p>
    </div>
  </div>
</body></html>`;
}

async function sendEmail(apiKey: string, from: string, to: string, subject: string, html: string): Promise<boolean> {
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to, subject, html })
    });
    return res.ok;
  } catch {
    return false;
  }
}

// ─── Routes ──────────────────────────────────────────────────────────────────
export function userRoutes(app: Hono<{ Bindings: Env }>) {

  // CONTACT FORM
  app.post('/api/contact', async (c) => {
    try {
      const contentType = c.req.header('content-type') || '';
      if (!contentType.includes('application/json')) return bad(c, 'Content-Type must be application/json');

      const data = await c.req.json() as Record<string, string>;
      const name = data.name || data.contactName || data.facilityName || '';
      if (!name || !data.phone || !data.email) return bad(c, 'Required fields missing: name, phone, email');

      const refId = crypto.randomUUID().slice(0, 8).toUpperCase();
      const appEnv = c.env as AppEnv;
      const emailApiKey = appEnv.EMAIL_API_KEY;
      const fromEmail = appEnv.FROM_EMAIL || 'MMD Dispatch <dispatch@midwestmedicaldelivery.com>';
      const toEmail = appEnv.TO_EMAIL || 'lawrencemurry@yahoo.com';
      const contactType = data.contactType || 'general';

      // Store in D1
      try {
        await appEnv.DB.prepare(
          `INSERT INTO contact_submissions
           (id, created_at, name, phone, email, pickup, delivery, message, contact_type, facility_type, facility_name, contact_name, reference_id, email_sent, source)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(
          crypto.randomUUID(), new Date().toISOString(),
          name, data.phone || '', data.email || '',
          data.pickup || '', data.delivery || '', data.message || '',
          contactType, data.facilityType || '', data.facilityName || '',
          data.contactName || '', refId, 0,
          data.source || (contactType === 'delivery' ? 'delivery_form' : 'general_form')
        ).run();
      } catch (dbErr) {
        console.error('[D1_ERROR]', dbErr);
      }

      // Send emails
      let emailSent = false;
      if (emailApiKey) {
        const firstName = name.split(' ')[0] || name;
        const subjectLine = contactType === 'delivery'
          ? `[MMD #${refId}] Delivery Request — ${name}`
          : `[MMD #${refId}] General Inquiry — ${name}`;

        const ownerSent = await sendEmail(emailApiKey, fromEmail, toEmail, subjectLine, buildOwnerEmailHtml(data, refId));
        await sendEmail(emailApiKey, fromEmail, data.email, `Your MMD ${contactType === 'delivery' ? 'Request' : 'Message'} Confirmed — Ref #${refId}`, buildThankYouEmailHtml(firstName, refId, contactType));

        emailSent = ownerSent;
        if (ownerSent) {
          try { await appEnv.DB.prepare(`UPDATE contact_submissions SET email_sent = 1 WHERE reference_id = ?`).bind(refId).run(); } catch {}
        }
        console.log(`[CONTACT] Ref=${refId} type=${contactType} email=${ownerSent}`);
      } else {
        console.log(`[CONTACT] Ref=${refId} No EMAIL_API_KEY — D1 only`);
      }

      return ok(c, { message: 'Submitted successfully', referenceId: refId, emailSent });
    } catch (e) {
      console.error('[CONTACT_ERROR]', e);
      return bad(c, 'Invalid request');
    }
  });

  // CHATBOT — Cloudflare Workers AI
  app.post('/api/chat', async (c) => {
    try {
      const appEnv = c.env as AppEnv;
      if (!appEnv.AI) return bad(c, 'AI binding not configured');

      const { messages } = await c.req.json() as { messages: { role: string; content: string }[] };
      if (!Array.isArray(messages)) return bad(c, 'messages array required');

      // Build messages for the LLM
      const llmMessages = [
        { role: 'system', content: MMD_SYSTEM_PROMPT },
        ...messages.slice(-8).map(m => ({ role: m.role, content: m.content })),
      ];

      const aiResult = await appEnv.AI.run('@cf/meta/llama-3.1-8b-instruct', {
        messages: llmMessages,
        max_tokens: 300,
      });

      const rawResponse = (aiResult as { response?: string }).response || '';

      // Parse the JSON response the LLM should return
      let reply = rawResponse.trim();
      let showContactForm = false;

      try {
        // Extract JSON if wrapped in markdown code block
        const jsonMatch = reply.match(/```(?:json)?\s*([\s\S]*?)```/) || reply.match(/(\{[\s\S]*\})/);
        const jsonStr = jsonMatch ? jsonMatch[1] : reply;
        const parsed = JSON.parse(jsonStr) as { reply: string; showContactForm: boolean };
        reply = parsed.reply || reply;
        showContactForm = parsed.showContactForm === true;
      } catch {
        // If the LLM didn't return valid JSON, use the raw text and check for trigger phrases
        const lower = reply.toLowerCase();
        showContactForm = lower.includes('contact form') || lower.includes('follow up') || lower.includes("i'll have") || lower.includes("i don't know");
      }

      return ok(c, { reply, showContactForm });
    } catch (e) {
      console.error('[CHAT_ERROR]', e);
      return bad(c, 'Chat service unavailable');
    }
  });

  // ADMIN — view submissions
  app.get('/api/admin/contacts', async (c) => {
    try {
      const appEnv = c.env as AppEnv;
      const result = await appEnv.DB.prepare(`SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 100`).all();
      return ok(c, result.results);
    } catch (e) {
      return bad(c, 'Failed to fetch contacts');
    }
  });

  app.get('/api/test', (c) => c.json({ success: true, data: { name: 'MMD API Running' } }));

  app.get('/api/users', async (c) => {
    await UserEntity.ensureSeed(c.env);
    const cq = c.req.query('cursor');
    const lq = c.req.query('limit');
    const page = await UserEntity.list(c.env, cq ?? null, lq ? Math.max(1, (Number(lq) | 0)) : undefined);
    return ok(c, page);
  });

  app.delete('/api/users/:id', async (c) =>
    ok(c, { id: c.req.param('id'), deleted: await UserEntity.delete(c.env, c.req.param('id')) })
  );
}
