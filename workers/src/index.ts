import type { Env } from './env';
import { corsHeaders, error, json, withCors } from './lib/http';
import { handleAuth } from './routes/auth';
import { handleArticles } from './routes/articles';
import { handleUsers } from './routes/users';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(env, request) });
    }

    if (path === '/api/health') {
      return withCors(env, request, json({ ok: true, service: 'skyseed-api' }));
    }

    try {
      const handlers = [handleAuth, handleArticles, handleUsers];
      for (const handler of handlers) {
        const response = await handler(env, request, path);
        if (response) return withCors(env, request, response);
      }

      return withCors(env, request, error('Rota não encontrada.', 404));
    } catch (err) {
      console.error(err);
      return withCors(env, request, error('Erro interno do servidor.', 500));
    }
  },
};
