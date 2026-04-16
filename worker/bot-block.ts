import type { Context, Next } from 'hono';

const BOT_UA_PATTERNS = [
  // Search engines
  'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider',
  'yandexbot', 'sogou', 'exabot', 'ia_archiver', 'facebot',
  // SEO tools
  'ahrefsbot', 'semrushbot', 'mj12bot', 'dotbot', 'blexbot',
  'seznambot', 'linkdexbot', 'screaming frog',
  // AI crawlers
  'gptbot', 'claude-web', 'claudebot', 'bytespider', 'facebookbot',
  'applebot', 'ccbot', 'dataforseobot', 'petalbot', 'youbot',
  'perplexitybot', 'cohere-ai', 'anthropic-ai', 'amazonbot',
  // Generic scrapers / headless
  'python-requests', 'python-urllib', 'scrapy', 'go-http-client',
  'java/', 'libwww-perl', 'lwp::', 'okhttp', 'httpclient',
  'wget/', 'curl/', 'axios/', 'node-fetch', 'got/',
];

export async function botBlock(c: Context, next: Next) {
  const ua = (c.req.header('User-Agent') || '').toLowerCase();

  // Block empty UA — headless scrapers/scanners
  if (!ua.trim()) {
    return new Response(null, { status: 200, headers: { 'Content-Length': '0' } });
  }

  // Block known bot patterns
  if (BOT_UA_PATTERNS.some((p) => ua.includes(p))) {
    console.log(`[bot-block] ${c.req.path} — UA: ${ua.slice(0, 80)}`);
    // Return silent 200 (no signal to retry, no 403 to fingerprint)
    return new Response(null, { status: 200, headers: { 'Content-Length': '0' } });
  }

  await next();
}

export function robotsTxt(c: Context) {
  return c.text('User-agent: *\nDisallow: /\n', 200, { 'Content-Type': 'text/plain' });
}
