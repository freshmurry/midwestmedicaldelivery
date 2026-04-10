import { Hono } from "hono";
import type { Env } from './core-utils';
import { UserEntity, ChatBoardEntity } from "./entities";
import { ok, bad, notFound, isStr } from './core-utils';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // CONTACT FORM
  app.post('/api/contact', async (c) => {
    try {
      const data = await c.req.json();
      // Basic validation for phase 1
      if (!data.name || !data.phone || !data.email) {
        return bad(c, 'Required fields missing');
      }
      console.log('[CONTACT FORM SUBMISSION]', data);
      // In a real scenario, you'd send an email or store in DB.
      // For this phase, we mock success.
      return ok(c, { message: 'Inquiry received successfully' });
    } catch (e) {
      return bad(c, 'Invalid request payload');
    }
  });
  // TEST
  app.get('/api/test', (c) => c.json({ success: true, data: { name: 'MMC API Running' }}));
  // USERS (Template Demo)
  app.get('/api/users', async (c) => {
    await UserEntity.ensureSeed(c.env);
    const cq = c.req.query('cursor');
    const lq = c.req.query('limit');
    const page = await UserEntity.list(c.env, cq ?? null, lq ? Math.max(1, (Number(lq) | 0)) : undefined);
    return ok(c, page);
  });
  // DELETE: Users
  app.delete('/api/users/:id', async (c) => ok(c, { id: c.req.param('id'), deleted: await UserEntity.delete(c.env, c.req.param('id')) }));
}