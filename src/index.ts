import { env } from './env.js';
import { serve } from '@hono/node-server'
import app from './app.js'

serve({
  fetch: app.fetch,
  port: Number(env('APP_PORT', '3000')),
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
