import { Role, TransportStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getUserFromRequest } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const schema = z.object({
  busType: z.string().min(2),
  plate: z.string().min(5),
  passengerCapacity: z.number().int().positive(),
  status: z.nativeEnum(TransportStatus),
  assignedRoute: z.string().min(3)
});

const guardSuperAdmin = (req: NextRequest) => {
  const user = getUserFromRequest(req);
  if (!user) return { error: NextResponse.json({ message: 'No autenticado' }, { status: 401 }) };
  if (user.role !== Role.SUPERADMIN) {
    return { error: NextResponse.json({ message: 'No autorizado' }, { status: 403 }) };
  }
  return { user };
};

export async function GET(req: NextRequest) {
  const guard = guardSuperAdmin(req);
  if (guard.error) return guard.error;

  const transports = await prisma.transport.findMany({ orderBy: { id: 'desc' } });
  return NextResponse.json(transports);
}

export async function POST(req: NextRequest) {
  const guard = guardSuperAdmin(req);
  if (guard.error) return guard.error;

  const body = await req.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(parsed.error.flatten(), { status: 400 });
  }

  try {
    const transport = await prisma.transport.create({ data: parsed.data });
    return NextResponse.json(transport, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'La placa ya existe' }, { status: 409 });
  }
}
