import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest, roleCanAccessView } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ view: string }> }
) {
  const { view } = await params;
  const user = getUserFromRequest(req);

  if (!user) {
    return NextResponse.json({ message: 'No autenticado' }, { status: 401 });
  }

  if (!roleCanAccessView(view, user.role)) {
    return NextResponse.json({ message: 'No autorizado para este recurso' }, { status: 403 });
  }

  return NextResponse.json({
    message: `Bienvenido a la vista ${view}`,
    user
  });
}
