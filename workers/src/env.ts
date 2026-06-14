export interface Env {
  DB: D1Database;
  COOKIE_NAME: string;
  SESSION_TTL_HOURS: string;
  ALLOWED_ORIGIN: string;
  BUILD_API_KEY?: string;
  SESSION_SECRET?: string;
}
