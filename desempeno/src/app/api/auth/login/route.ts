import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { compareHash, hashValue } from '@/lib/hash';
import { signAccessToken, signRefreshToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const schema = z.object({
  email: z.email(),
  password: z.string().min(6)
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(parsed.error.flatten(), { status: 400 });
  }

  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await compareHash(password, user.password))) {
    return NextResponse.json({ message: 'Credenciales inválidas' }, { status: 401 });
  }

  const payload = { id: user.id, email: user.email, role: user.role };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken();

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshTokenHash: await hashValue(refreshToken) }
  });

  const res = NextResponse.json({
    accessToken,
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  });

  res.cookies.set('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });

  return res;
}
