import type { Env } from '../env';

export function json(data: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      ...headers,
    },
  });
}

export function error(message: string, status = 400): Response {
  return json({ error: message }, status);
}

function isAllowedOrigin(origin: string, allowed: string): boolean {
  if (origin === allowed || origin.startsWith('http://localhost:')) {
    return true;
  }

  try {
    const host = new URL(origin).hostname;
    const allowedHost = new URL(allowed).hostname;
    if (host === allowedHost || host.endsWith(`.${allowedHost}`)) {
      return true;
    }
    // Preview deployments (ex.: develop.skyseed-clinical.pages.dev)
    return host === 'skyseed-clinical.pages.dev' || host.endsWith('.skyseed-clinical.pages.dev');
  } catch {
    return false;
  }
}

export function corsHeaders(env: Env, request: Request): Record<string, string> {
  const origin = request.headers.get('Origin');
  const allowed = env.ALLOWED_ORIGIN;
  const headers: Record<string, string> = {
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, authorization, x-build-key',
    'access-control-max-age': '86400',
  };

  if (origin && isAllowedOrigin(origin, allowed)) {
    headers['access-control-allow-origin'] = origin;
    headers['access-control-allow-credentials'] = 'true';
  } else if (!origin) {
    headers['access-control-allow-origin'] = allowed;
  }

  return headers;
}

export function withCors(env: Env, request: Request, response: Response): Response {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(corsHeaders(env, request))) {
    headers.set(key, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export async function readJson<T>(request: Request): Promise<T> {
  return (await request.json()) as T;
}
