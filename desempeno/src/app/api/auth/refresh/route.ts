import { NextRequest, NextResponse } from 'next/server';
import { hashValue } from '@/lib/hash';
import { signAccessToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get('refreshToken')?.value;

  if (!refreshToken) {
    return NextResponse.json({ message: 'Refresh token requerido' }, { status: 401 });
  }

  const refreshTokenHash = await hashValue(refreshToken);
  const user = await prisma.user.findFirst({ where: { refreshTokenHash } });

  if (!user) {
    return NextResponse.json({ message: 'Sesión inválida' }, { status: 401 });
  }

  const accessToken = signAccessToken({ id: user.id, email: user.email, role: user.role });
  return NextResponse.json({ accessToken });
}
