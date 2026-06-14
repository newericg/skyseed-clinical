import type { Env } from '../env';
import { randomToken, uuid } from './crypto';

export interface SessionUser {
  id: string;
  email: string;
}

interface SessionRow {
  id: string;
  user_id: string;
  expires_at: string;
  email: string;
}

export function getSessionId(request: Request, env: Env): string | null {
  const cookie = request.headers.get('Cookie') ?? '';
  const name = `${env.COOKIE_NAME}=`;
  const match = cookie.split(';').find((part) => part.trim().startsWith(name));
  return match ? decodeURIComponent(match.trim().slice(name.length)) : null;
}

export function sessionCookie(env: Env, sessionId: string): string {
  const maxAge = Number(env.SESSION_TTL_HOURS) * 3600;
  const secure = !env.ALLOWED_ORIGIN.includes('localhost');
  const flags = secure
    ? 'HttpOnly; Secure; SameSite=Strict'
    : 'HttpOnly; SameSite=Lax';
  return `${env.COOKIE_NAME}=${encodeURIComponent(sessionId)}; Path=/; ${flags}; Max-Age=${maxAge}`;
}

export function clearSessionCookie(env: Env): string {
  const secure = !env.ALLOWED_ORIGIN.includes('localhost');
  const flags = secure
    ? 'HttpOnly; Secure; SameSite=Strict'
    : 'HttpOnly; SameSite=Lax';
  return `${env.COOKIE_NAME}=; Path=/; ${flags}; Max-Age=0`;
}

export async function createSession(
  env: Env,
  userId: string,
): Promise<string> {
  const id = randomToken();
  const now = new Date();
  const expires = new Date(now.getTime() + Number(env.SESSION_TTL_HOURS) * 3600_000);
  await env.DB.prepare(
    'INSERT INTO sessions (id, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)',
  )
    .bind(id, userId, expires.toISOString(), now.toISOString())
    .run();
  return id;
}

export async function getSessionUser(
  env: Env,
  request: Request,
): Promise<SessionUser | null> {
  const sessionId = getSessionId(request, env);
  if (!sessionId) return null;

  const row = await env.DB.prepare(
    `SELECT s.id, s.user_id, s.expires_at, u.email
     FROM sessions s
     JOIN users u ON u.id = s.user_id
     WHERE s.id = ?`,
  )
    .bind(sessionId)
    .first<SessionRow>();

  if (!row) return null;
  if (new Date(row.expires_at) <= new Date()) {
    await env.DB.prepare('DELETE FROM sessions WHERE id = ?').bind(sessionId).run();
    return null;
  }

  return { id: row.user_id, email: row.email };
}

export async function destroySession(env: Env, request: Request): Promise<void> {
  const sessionId = getSessionId(request, env);
  if (!sessionId) return;
  await env.DB.prepare('DELETE FROM sessions WHERE id = ?').bind(sessionId).run();
}

export async function recordLoginAttempt(env: Env, ip: string): Promise<void> {
  await env.DB.prepare('INSERT INTO login_attempts (ip, attempted_at) VALUES (?, ?)')
    .bind(ip, new Date().toISOString())
    .run();
}

export async function isRateLimited(env: Env, ip: string): Promise<boolean> {
  const since = new Date(Date.now() - 15 * 60_000).toISOString();
  const row = await env.DB.prepare(
    'SELECT COUNT(*) as count FROM login_attempts WHERE ip = ? AND attempted_at > ?',
  )
    .bind(ip, since)
    .first<{ count: number }>();
  return (row?.count ?? 0) >= 5;
}

export async function createUser(
  env: Env,
  email: string,
  passwordHash: string,
  passwordSalt: string,
): Promise<string> {
  const id = uuid();
  await env.DB.prepare(
    'INSERT INTO users (id, email, password_hash, password_salt, created_at) VALUES (?, ?, ?, ?, ?)',
  )
    .bind(id, email.toLowerCase(), passwordHash, passwordSalt, new Date().toISOString())
    .run();
  return id;
}
