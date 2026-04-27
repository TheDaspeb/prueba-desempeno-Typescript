import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { hashValue } from '@/lib/hash';
import { prisma } from '@/lib/prisma';

const schema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(6),
  role: z.enum(['CLIENTE', 'ADMIN', 'SUPERADMIN']).default('CLIENTE')
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(parsed.error.flatten(), { status: 400 });
  }

  const { name, email, password, role } = parsed.data;
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return NextResponse.json({ message: 'El correo ya está registrado' }, { status: 409 });
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: await hashValue(password),
      role
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true
    }
  });

  return NextResponse.json({ message: 'Usuario creado', user }, { status: 201 });
}
