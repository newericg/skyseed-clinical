#!/usr/bin/env node

console.log(`
Skyseed — setup Cloudflare (execute na ordem)

1) Login
   npx wrangler login

2) Criar banco D1 e copiar o database_id para wrangler.jsonc
   npx wrangler d1 create skyseed-db

3) Banco local (dev) — migrations + admin
   npm run db:migrate:local
   npm run admin:seed -- admin@skyseed.com.br "SuaSenhaForte123" --local

4) Banco remoto (produção)
   npm run db:migrate:remote
   npm run admin:seed -- admin@skyseed.com.br "SuaSenhaForte123"

5) Secrets do Worker (produção)
   npx wrangler secret put BUILD_API_KEY --env production
   (gere uma chave longa aleatória para o CI buscar artigos publicados)

5) Criar usuário admin
   npm run admin:seed -- admin@skyseed.com.br "SuaSenhaForte123"

6) Deploy manual (teste)
   npm run api:deploy -- --env production
   npx wrangler pages project create skyseed --production-branch main
   npm run build:production
   npx wrangler pages deploy dist/skyseed/browser --project-name=skyseed

7) Rotas no painel Cloudflare (Workers & Pages > skyseed-api > Settings > Triggers)
   - skyseed.com.br/api/*

8) GitHub Actions (Settings > Secrets and variables)
   Secrets:
   - CLOUDFLARE_API_TOKEN
   - CLOUDFLARE_ACCOUNT_ID
   - BUILD_API_KEY (mesma do passo 4)
   Variables:
   - SKYSEED_API_URL = https://skyseed.com.br

9) Imagens do blog (sem R2)
   - Coloque arquivos em public/assets/blogs/
   - No admin, use caminhos como /assets/blogs/nome-web.jpeg
   - Commit das imagens no Git antes do deploy

10) Dev local
   Terminal 1: npm run api:dev
   Terminal 2: npm start
   Admin: http://localhost:4200/admin/login

11) Preview visual (branch develop, sem domínio custom)
   a) Crie a branch develop e faça push
   b) O workflow .github/workflows/deploy-develop.yml publica só o front
   c) URLs automáticas do Cloudflare Pages:
      - Produção (main):  https://skyseed.pages.dev
      - Preview (develop): https://develop.skyseed.pages.dev
      - Cada deploy também ganha URL única em Workers & Pages > skyseed > Deployments
   d) Não precisa configurar DNS nem custom domain para isso funcionar
   e) Domínio próprio (opcional, depois): staging.skyseed.com.br → branch develop

`);
