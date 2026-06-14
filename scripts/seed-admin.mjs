#!/usr/bin/env node
/**
 * Creates the first admin user in D1.
 * Usage: npm run admin:seed -- admin@skyseed.com.br "StrongPassword123"
 *        npm run admin:seed -- admin@skyseed.com.br "StrongPassword123" --local
 *
 * Uses PBKDF2 compatible with workers/src/lib/crypto.ts
 */

import { spawnSync } from 'node:child_process';
import { pbkdf2Sync, randomBytes, randomUUID } from 'node:crypto';
import { writeFileSync, unlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const ITERATIONS = 210_000;

function hashPassword(password) {
  const salt = randomBytes(16);
  const hash = pbkdf2Sync(password, salt, ITERATIONS, 32, 'sha256');
  return {
    hash: hash.toString('base64'),
    salt: salt.toString('base64'),
  };
}

function sqlLiteral(value) {
  return value.replace(/'/g, "''");
}

const args = process.argv.slice(2);
const useLocal = args.includes('--local');
const positional = args.filter((arg) => !arg.startsWith('--'));
const email = positional[0];
const password = positional[1];

if (!email || !password) {
  console.error('Usage: npm run admin:seed -- <email> <password> [--local]');
  process.exit(1);
}

if (password.length < 12) {
  console.error('Password must be at least 12 characters.');
  process.exit(1);
}

const { hash, salt } = hashPassword(password);
const id = randomUUID();
const now = new Date().toISOString();

const sql = `INSERT INTO users (id, email, password_hash, password_salt, created_at)
VALUES ('${sqlLiteral(id)}', '${sqlLiteral(email.toLowerCase())}', '${sqlLiteral(hash)}', '${sqlLiteral(salt)}', '${sqlLiteral(now)}');`;

const sqlPath = join(tmpdir(), `skyseed-seed-${Date.now()}.sql`);
writeFileSync(sqlPath, sql, 'utf8');

const wranglerArgs = [
  'wrangler',
  'd1',
  'execute',
  'skyseed-db',
  '--file',
  sqlPath,
  '-y',
];

if (useLocal) {
  wranglerArgs.push('--local');
} else {
  wranglerArgs.push('--remote');
}

try {
  const result = spawnSync('npx', wranglerArgs, { stdio: 'inherit', shell: true });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }

  console.log(`Admin user created: ${email.toLowerCase()} (${useLocal ? 'local' : 'remote'} D1)`);
} finally {
  unlinkSync(sqlPath);
}
