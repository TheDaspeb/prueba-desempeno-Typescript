import { NextRequest, NextResponse } from 'next/server';
import { hashValue } from '@/lib/hash';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get('refreshToken')?.value;

  if (refreshToken) {
    const refreshTokenHash = await hashValue(refreshToken);

    await prisma.user.updateMany({
      where: { refreshTokenHash },
      data: { refreshTokenHash: null }
    });
  }

  const res = NextResponse.json({ message: 'Sesión cerrada' });
  res.cookies.set('refreshToken', '', { path: '/', maxAge: 0 });
  return res;
}
