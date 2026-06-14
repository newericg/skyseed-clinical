import type { Env } from '../env';
import { hashPassword, verifyPassword } from '../lib/crypto';
import { error, json, readJson } from '../lib/http';
import {
  clearSessionCookie,
  createSession,
  createUser,
  destroySession,
  getSessionUser,
  isRateLimited,
  recordLoginAttempt,
  sessionCookie,
} from '../lib/session';

interface LoginBody {
  email?: string;
  password?: string;
}

function clientIp(request: Request): string {
  return request.headers.get('CF-Connecting-IP') ?? 'unknown';
}

export async function handleAuth(
  env: Env,
  request: Request,
  path: string,
): Promise<Response | null> {
  if (path === '/api/auth/login' && request.method === 'POST') {
    const ip = clientIp(request);
    if (await isRateLimited(env, ip)) {
      return error('Muitas tentativas. Tente novamente em 15 minutos.', 429);
    }

    const body = await readJson<LoginBody>(request);
    const email = body.email?.trim().toLowerCase();
    const password = body.password ?? '';

    if (!email || !password) {
      await recordLoginAttempt(env, ip);
      return error('E-mail e senha são obrigatórios.', 400);
    }

    const user = await env.DB.prepare(
      'SELECT id, email, password_hash, password_salt FROM users WHERE email = ?',
    )
      .bind(email)
      .first<{ id: string; email: string; password_hash: string; password_salt: string }>();

    if (!user || !(await verifyPassword(password, user.password_hash, user.password_salt))) {
      await recordLoginAttempt(env, ip);
      return error('Credenciais inválidas.', 401);
    }

    const sessionId = await createSession(env, user.id);
    return json(
      { email: user.email },
      200,
      { 'set-cookie': sessionCookie(env, sessionId) },
    );
  }

  if (path === '/api/auth/logout' && request.method === 'POST') {
    await destroySession(env, request);
    return json({ ok: true }, 200, { 'set-cookie': clearSessionCookie(env) });
  }

  if (path === '/api/auth/me' && request.method === 'GET') {
    const user = await getSessionUser(env, request);
    if (!user) return error('Não autenticado.', 401);
    return json({ email: user.email });
  }

  return null;
}

export async function requireAuth(env: Env, request: Request): Promise<Response | { id: string; email: string }> {
  const user = await getSessionUser(env, request);
  if (!user) return error('Não autenticado.', 401);
  return user;
}

export { hashPassword, createUser };
