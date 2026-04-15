import { Hono } from "hono";
import type { Env } from './core-utils';
import { UserEntity } from "./entities";
import { ok, bad } from './core-utils';

interface AppEnv extends Env {
  DB: D1Database;
  EMAIL_PROVIDER?: string;
  EMAIL_API_KEY?: string;
  FROM_EMAIL?: string;
  TO_EMAIL?: string;
}

function buildOwnerEmailHtml(data: Record<string, string>, refId: string): string {
  const rows = [
    ['Reference ID', refId],
    ['Name / Clinic', data.name || data.contactName || data.facilityName || 'N/A'],
    ['Phone', data.phone || 'N/A'],
    ['Email', data.email || 'N/A'],
    ['Pickup Location', data.pickup || 'N/A'],
    ['Delivery Destination', data.delivery || 'N/A'],
    ['Facility Type', data.facilityType || 'N/A'],
    ['Message / Details', data.message || 'N/A'],
    ['Submitted At', new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }) + ' CST'],
  ];

  const tableRows = rows.map(([label, value]) => `
    <tr>
      <td style="padding:10px 16px;font-weight:600;color:#374151;background:#f9fafb;white-space:nowrap;border-bottom:1px solid #e5e7eb;">${label}</td>
      <td style="padding:10px 16px;color:#111827;border-bottom:1px solid #e5e7eb;">${value}</td>
    </tr>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <!-- Header -->
    <div style="background:#00A699;padding:28px 32px;">
      <div style="font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">🚐 MMD — New Delivery Request</div>
      <div style="font-size:13px;color:rgba(255,255,255,0.85);margin-top:6px;">Ref #${refId} · Requires your attention</div>
    </div>
    <!-- Body -->
    <div style="padding:28px 32px;">
      <p style="margin:0 0 20px;font-size:15px;color:#374151;">A new contact form submission was received. Details below:</p>
      <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;font-size:14px;">
        ${tableRows}
      </table>
    </div>
    <!-- Footer -->
    <div style="background:#f9fafb;padding:18px 32px;border-top:1px solid #e5e7eb;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">Midwest Medical Delivery · dispatch@midwestmedicaldelivery.com · midwestmedicaldelivery.com</p>
    </div>
  </div>
</body>
</html>`;
}

function buildThankYouEmailHtml(name: string, refId: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <div style="background:#00A699;padding:28px 32px;">
      <div style="font-size:22px;font-weight:800;color:#ffffff;">✅ Request Received — Midwest Medical Delivery</div>
    </div>
    <div style="padding:32px;">
      <p style="font-size:16px;color:#111827;margin:0 0 16px;">Hi <strong>${name}</strong>,</p>
      <p style="font-size:15px;color:#374151;line-height:1.6;margin:0 0 16px;">
        Thank you for reaching out to <strong>Midwest Medical Delivery</strong>. We've received your request and our dispatch team will be in contact with you shortly.
      </p>
      <div style="background:#f0fdfa;border:1px solid #99f6e4;border-radius:8px;padding:16px 20px;margin:20px 0;">
        <div style="font-size:13px;font-weight:600;color:#0d9488;margin-bottom:4px;">Your Reference ID</div>
        <div style="font-size:20px;font-weight:800;color:#00A699;letter-spacing:2px;">#${refId}</div>
        <div style="font-size:12px;color:#6b7280;margin-top:4px;">Keep this for your records</div>
      </div>
      <p style="font-size:14px;color:#6b7280;line-height:1.6;margin:0;">
        We specialize in HIPAA-compliant, same-day medical delivery for dental labs, pharmacies, and veterinary clinics across Northwest Indiana. We look forward to serving you.
      </p>
    </div>
    <div style="background:#f9fafb;padding:18px 32px;border-top:1px solid #e5e7eb;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">Midwest Medical Delivery · <a href="https://midwestmedicaldelivery.com" style="color:#00A699;">midwestmedicaldelivery.com</a> · dispatch@midwestmedicaldelivery.com</p>
    </div>
  </div>
</body>
</html>`;
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

export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // CONTACT & QUICK INQUIRY FORM HANDLER
  app.post('/api/contact', async (c) => {
    try {
      const contentType = c.req.header('content-type') || '';
      if (!contentType.includes('application/json')) {
        return bad(c, 'Content-Type must be application/json');
      }
      const data = await c.req.json() as Record<string, string>;

      // Basic validation
      const name = data.name || data.contactName || data.facilityName || '';
      if (!name || !data.phone || !data.email) {
        return bad(c, 'Required contact information missing');
      }

      const refId = crypto.randomUUID().slice(0, 8).toUpperCase();
      const appEnv = c.env as AppEnv;
      const emailApiKey = appEnv.EMAIL_API_KEY;
      const fromEmail = appEnv.FROM_EMAIL || 'MMD Dispatch <dispatch@midwestmedicaldelivery.com>';
      const toEmail = appEnv.TO_EMAIL || 'lawrencemurry@yahoo.com';
      let emailSent = false;

      // 1. Store in D1
      try {
        await appEnv.DB.prepare(
          `INSERT INTO contact_submissions 
           (id, created_at, name, phone, email, pickup, delivery, message, facility_type, facility_name, contact_name, reference_id, email_sent, source)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(
          crypto.randomUUID(),
          new Date().toISOString(),
          name,
          data.phone || '',
          data.email || '',
          data.pickup || '',
          data.delivery || '',
          data.message || '',
          data.facilityType || '',
          data.facilityName || '',
          data.contactName || '',
          refId,
          0,
          data.facilityType ? 'inquiry_modal' : 'contact_form'
        ).run();
      } catch (dbErr) {
        console.error('[D1_ERROR]', dbErr);
      }

      // 2. Send emails via Resend if configured
      if (emailApiKey) {
        const submitterName = name.split(' ')[0] || name;

        // Email to owner (beautiful HTML table)
        const ownerSent = await sendEmail(
          emailApiKey, fromEmail, toEmail,
          `[MMD #${refId}] New Delivery Request — ${name}`,
          buildOwnerEmailHtml(data, refId)
        );

        // Thank-you email to submitter
        const thankyouSent = await sendEmail(
          emailApiKey, fromEmail, data.email,
          `Your MMD Request is Confirmed — Ref #${refId}`,
          buildThankYouEmailHtml(submitterName, refId)
        );

        emailSent = ownerSent;

        // Update D1 email_sent flag
        if (ownerSent) {
          try {
            await appEnv.DB.prepare(`UPDATE contact_submissions SET email_sent = 1 WHERE reference_id = ?`).bind(refId).run();
          } catch {}
        }

        console.log(`[CONTACT] Ref=${refId} | owner=${ownerSent} | thankyou=${thankyouSent}`);
      } else {
        console.log(`[CONTACT] Ref=${refId} | No EMAIL_API_KEY — emails skipped, stored in D1`);
      }

      return ok(c, { message: 'Request received successfully', referenceId: refId, emailSent });
    } catch (e) {
      console.error(`[CONTACT_API_ERROR]`, e);
      return bad(c, 'Invalid request payload');
    }
  });

  // GET contact submissions (admin)
  app.get('/api/admin/contacts', async (c) => {
    try {
      const appEnv = c.env as AppEnv;
      const result = await appEnv.DB.prepare(
        `SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 100`
      ).all();
      return ok(c, result.results);
    } catch (e) {
      return bad(c, 'Failed to fetch contacts');
    }
  });

  // TEST ENDPOINT
  app.get('/api/test', (c) => c.json({ success: true, data: { name: 'MMD API Running' } }));

  // USERS (Template Demo Legacy Support)
  app.get('/api/users', async (c) => {
    await UserEntity.ensureSeed(c.env);
    const cq = c.req.query('cursor');
    const lq = c.req.query('limit');
    const page = await UserEntity.list(c.env, cq ?? null, lq ? Math.max(1, (Number(lq) | 0)) : undefined);
    return ok(c, page);
  });
  app.delete('/api/users/:id', async (c) => ok(c, { id: c.req.param('id'), deleted: await UserEntity.delete(c.env, c.req.param('id')) }));
}
