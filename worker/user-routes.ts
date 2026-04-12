import { Hono } from "hono";
import type { Env } from './core-utils';
import { UserEntity } from "./entities";
import { ok, bad } from './core-utils';
interface AppEnv extends Env {
  EMAIL_PROVIDER?: string;
  EMAIL_API_KEY?: string;
  FROM_EMAIL?: string;
  TO_EMAIL?: string;
}
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // CONTACT & QUICK INQUIRY FORM HANDLER
  app.post('/api/contact', async (c) => {
    try {
      const contentType = c.req.header('content-type') || '';
      if (!contentType.includes('application/json')) {
        return bad(c, 'Content-Type must be application/json');
      }
      const data = await c.req.json();
      // Basic validation for common fields
      if ((!data.name && !data.contactName) || !data.phone || !data.email) {
        return bad(c, 'Required contact information missing');
      }
      // Log the specific type of inquiry for backend monitoring
      const isInquiry = !!data.facilityType;
      console.log(
        `[${new Date().toISOString()}]`,
        isInquiry ? '[MEDICAL PROVIDER INQUIRY]' : '[STANDARD CONTACT SUBMISSION]',
        JSON.stringify(data, null, 2)
      );
      let emailSent = false;
      const appEnv = c.env as AppEnv;
      const emailProvider = appEnv.EMAIL_PROVIDER;
      const emailApiKey = appEnv.EMAIL_API_KEY;
      const fromEmail = appEnv.FROM_EMAIL || 'dispatch@midwestmedicaldelivery.com';
      const toEmail = appEnv.TO_EMAIL || 'lawrencemurry@yahoo.com';
      const refId = crypto.randomUUID().slice(0, 8).toUpperCase();
      if (emailProvider && emailApiKey) {
        try {
          const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${emailApiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              from: fromEmail,
              to: toEmail,
              subject: `[MMD Request ${refId}] ${data.facilityName || data.name}`,
              text: `Ref ID: ${refId}\n\n${JSON.stringify(data, null, 2)}`
            })
          });
          if (res.ok) emailSent = true;
          console.log(`[EMAIL_DELIVERY] Ref ID: ${refId}, Sent: ${emailSent}`);
        } catch (err) {
          console.error('[EMAIL_DELIVERY_ERROR]', err);
        }
      }
      return ok(c, {
        message: 'Request received successfully',
        referenceId: refId,
        emailSent
      });
    } catch (e) {
      console.error(`[${new Date().toISOString()}] [CONTACT_API_ERROR]`, e);
      return bad(c, 'Invalid request payload');
    }
  });
  // TEST ENDPOINT
  app.get('/api/test', (c) => c.json({ success: true, data: { name: 'MMC API Running' }}));
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