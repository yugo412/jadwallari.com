import Database from 'better-sqlite3';
import { env } from './env.js';

const db: Database = new Database(env('DB_PATH'), {
  readonly: true,
});

const findStatement = db.prepare(`
  SELECT slug, url
  FROM schedules
  WHERE slug = ?
  LIMIT 1
`);

export type Schedule = {
  slug: string,
  url?: string,
}

export function findSchedule(slug: string): Schedule | null {
  return findStatement.get(slug) ?? null;
}
