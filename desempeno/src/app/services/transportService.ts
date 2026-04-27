import type { Transport, TransportStatus } from '@/app/types/index';

export async function fetchTransports(token: string): Promise<{ data: Transport[] | null; message?: string }> {
  const response = await fetch('/api/transporte', {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = (await response.json()) as Transport[] | { message?: string };

  if (!response.ok) {
    return { data: null, message: (data as { message?: string }).message };
  }

  return { data: data as Transport[] };
}

export async function createTransport(
  token: string,
  busType: string,
  plate: string,
  passengerCapacity: number,
  status: TransportStatus,
  assignedRoute: string
): Promise<{ success: boolean; message?: string }> {
  const response = await fetch('/api/transporte', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      busType,
      plate: plate.toUpperCase(),
      passengerCapacity,
      status,
      assignedRoute
    })
  });

  const data = (await response.json()) as { message?: string };

  if (!response.ok) {
    return { success: false, message: data.message };
  }

  return { success: true, message: 'Transporte creado correctamente' };
}

export async function updateTransport(
  token: string,
  transportId: number,
  busType: string,
  plate: string,
  passengerCapacity: number,
  status: TransportStatus,
  assignedRoute: string
): Promise<{ success: boolean; message?: string }> {
  const response = await fetch(`/api/transporte/${transportId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      busType,
      plate: plate.toUpperCase(),
      passengerCapacity,
      status,
      assignedRoute
    })
  });

  const data = (await response.json()) as { message?: string };

  if (!response.ok) {
    return { success: false, message: data.message };
  }

  return { success: true, message: 'Transporte actualizado correctamente' };
}

export async function deleteTransport(token: string, transportId: number): Promise<{ success: boolean; message?: string }> {
  const response = await fetch(`/api/transporte/${transportId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!response.ok) {
    const data = (await response.json()) as { message?: string };
    return { success: false, message: data.message };
  }

  return { success: true, message: 'Transporte eliminado correctamente' };
}

export function findTransportByPlate(transports: Transport[], plate: string): Transport | undefined {
  const normalizedPlate = plate.trim().toUpperCase();
  return transports.find((transport) => transport.plate.toUpperCase() === normalizedPlate);
}
