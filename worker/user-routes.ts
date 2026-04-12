import { Hono } from "hono";
import type { Env } from './core-utils';
import { UserEntity } from "./entities";
import { ok, bad } from './core-utils';
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
      // Simulate a realistic processing delay (200ms)
      await new Promise(resolve => setTimeout(resolve, 200));
      return ok(c, {
        message: 'Request received successfully',
        referenceId: crypto.randomUUID().slice(0, 8).toUpperCase()
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