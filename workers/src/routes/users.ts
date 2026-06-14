import type { Env } from '../env';
import { hashPassword } from '../lib/crypto';
import { error, json, readJson } from '../lib/http';
import { createUser } from '../lib/session';
import { requireAuth } from './auth';

interface CreateUserBody {
  email?: string;
  password?: string;
}

export async function handleUsers(
  env: Env,
  request: Request,
  path: string,
): Promise<Response | null> {
  if (path === '/api/users' && request.method === 'GET') {
    const auth = await requireAuth(env, request);
    if (auth instanceof Response) return auth;

    const { results } = await env.DB.prepare(
      'SELECT id, email, created_at FROM users ORDER BY created_at DESC',
    ).all<{ id: string; email: string; created_at: string }>();

    return json({
      users: results.map((row) => ({
        id: row.id,
        email: row.email,
        createdAt: row.created_at,
      })),
    });
  }

  if (path === '/api/users' && request.method === 'POST') {
    const auth = await requireAuth(env, request);
    if (auth instanceof Response) return auth;

    const body = await readJson<CreateUserBody>(request);
    const email = body.email?.trim().toLowerCase();
    const password = body.password ?? '';

    if (!email || !password) {
      return error('E-mail e senha são obrigatórios.', 400);
    }

    if (password.length < 8) {
      return error('A senha deve ter pelo menos 8 caracteres.', 400);
    }

    const existing = await env.DB.prepare('SELECT id FROM users WHERE email = ?')
      .bind(email)
      .first();

    if (existing) {
      return error('Este e-mail já está cadastrado.', 409);
    }

    const { hash, salt } = await hashPassword(password);
    const id = await createUser(env, email, hash, salt);

    return json(
      {
        user: {
          id,
          email,
          createdAt: new Date().toISOString(),
        },
      },
      201,
    );
  }

  const deleteMatch = path.match(/^\/api\/users\/([^/]+)$/);
  if (deleteMatch && request.method === 'DELETE') {
    const auth = await requireAuth(env, request);
    if (auth instanceof Response) return auth;

    const userId = deleteMatch[1];
    if (userId === auth.id) {
      return error('Não é possível excluir sua própria conta.', 400);
    }

    const user = await env.DB.prepare('SELECT id FROM users WHERE id = ?')
      .bind(userId)
      .first();

    if (!user) {
      return error('Usuário não encontrado.', 404);
    }

    await env.DB.prepare('DELETE FROM users WHERE id = ?').bind(userId).run();
    return json({ ok: true });
  }

  return null;
}
