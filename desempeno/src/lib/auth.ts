import crypto from 'crypto';
import { NextRequest } from 'next/server';
import { Role } from '@/generated/prisma';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'default_secret';

type AuthUser = {
  id: number;
  email: string;
  role: Role;
};

const VIEW_PERMISSIONS: Record<string, Role[]> = {
  cliente: [Role.CLIENTE, Role.ADMIN, Role.SUPERADMIN],
  admin: [Role.ADMIN, Role.SUPERADMIN],
  superadmin: [Role.SUPERADMIN],
  transporte: [Role.SUPERADMIN]
};

function base64url(value: string | Buffer) {
  const buffer = typeof value === 'string' ? Buffer.from(value, 'utf8') : value;
  return buffer.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function decodeBase64url(value: string) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
  return Buffer.from(padded, 'base64').toString('utf8');
}

export function signAccessToken(payload: Record<string, unknown>): string {
  const header = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = base64url(JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + 60 * 15 }));
  const signature = base64url(
    crypto.createHmac('sha256', ACCESS_TOKEN_SECRET).update(`${header}.${body}`).digest()
  );

  return `${header}.${body}.${signature}`;
}

export function signRefreshToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function getUserFromRequest(req: NextRequest): AuthUser | null {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return null;
  }

  const [header, body, signature] = token.split('.');
  if (!header || !body || !signature) {
    return null;
  }

  const expectedSignature = base64url(
    crypto.createHmac('sha256', ACCESS_TOKEN_SECRET).update(`${header}.${body}`).digest()
  );

  if (signature !== expectedSignature) {
    return null;
  }

  try {
    const payload = JSON.parse(decodeBase64url(body)) as AuthUser & { exp?: number };

    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    if (!payload.id || !payload.email || !Object.values(Role).includes(payload.role)) {
      return null;
    }

    return { id: payload.id, email: payload.email, role: payload.role };
  } catch {
    return null;
  }
}

export function roleCanAccessView(view: string, role: Role): boolean {
  const allowedRoles = VIEW_PERMISSIONS[view.toLowerCase()];

  if (!allowedRoles) {
    return false;
  }

  return allowedRoles.includes(role);
}
