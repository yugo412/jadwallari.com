import { Hono } from 'hono';
import { env } from './env.js';
import { redirectSchedule, redirectToOfficial } from './redirect.js';
import { findSchedule, type Schedule } from './repo.js';

const app = new Hono();
const mainUrl = env('MAIN_URL');

app.use('*', async (c, next) => {
  c.header('X-Robots-Tag', 'noindex, nofollow');
  await next();
});

app.all('/up', (c) => {
  return c.body('OK');
});

app.get('/official/:slug', (c) => {
  const slug: string = c.req.param('slug').trim();
  if (!slug) {
    return c.redirect(mainUrl, 301);
  }

  const schedule: Schedule | null = findSchedule(slug);

  if (schedule && schedule.url) {
    return c.redirect(redirectToOfficial(schedule.url, slug), 302);
  }

  return c.redirect(mainUrl, 301);
});

app.get('/event/:slug', (c) => {
  return c.redirect(redirectSchedule(c.req.param('slug')));
});

app.get('/:slug', (c) => {
  const slug: string = c.req.param('slug').trim();

  const target = new URL(c.req.url);
  target.host = new URL(mainUrl).host;
  target.protocol = new URL(mainUrl).protocol;

  const schedule: Schedule | null = findSchedule(slug);

  if (schedule) {
    return c.redirect(redirectSchedule(slug), 302);
  }

  return c.redirect(target.toString(), 301);
});

app.all('*', (c) => {
  const url = new URL(c.req.url);
  const target = `${mainUrl}${url.pathname}${url.search}`;

  return c.redirect(target, 301);
});

export default app;
