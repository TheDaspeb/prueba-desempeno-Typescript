import { Role, TransportStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getUserFromRequest } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const updateSchema = z
  .object({
    busType: z.string().min(2),
    plate: z.string().min(5),
    passengerCapacity: z.number().int().positive(),
    status: z.nativeEnum(TransportStatus),
    assignedRoute: z.string().min(3)
  })
  .partial();

const guardSuperAdmin = (req: NextRequest) => {
  const user = getUserFromRequest(req);
  if (!user) return { error: NextResponse.json({ message: 'No autenticado' }, { status: 401 }) };
  if (user.role !== Role.SUPERADMIN) {
    return { error: NextResponse.json({ message: 'No autorizado' }, { status: 403 }) };
  }
  return { user };
};

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = guardSuperAdmin(req);
  if (guard.error) return guard.error;

  const { id } = await params;
  const transportId = Number(id);
  if (Number.isNaN(transportId)) {
    return NextResponse.json({ message: 'ID inválido' }, { status: 400 });
  }

  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(parsed.error.flatten(), { status: 400 });
  }

  try {
    const transport = await prisma.transport.update({
      where: { id: transportId },
      data: parsed.data
    });
    return NextResponse.json(transport);
  } catch {
    return NextResponse.json({ message: 'Transporte no encontrado o placa duplicada' }, { status: 404 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = guardSuperAdmin(req);
  if (guard.error) return guard.error;

  const { id } = await params;
  const transportId = Number(id);

  if (Number.isNaN(transportId)) {
    return NextResponse.json({ message: 'ID inválido' }, { status: 400 });
  }

  try {
    await prisma.transport.delete({ where: { id: transportId } });
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ message: 'Transporte no encontrado' }, { status: 404 });
  }
}
