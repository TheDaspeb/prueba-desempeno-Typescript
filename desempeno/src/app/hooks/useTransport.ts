'use client';

import { useState } from 'react';
import type { Transport, TransportStatus } from '@/app/types/index';
import {
  fetchTransports,
  createTransport,
  updateTransport,
  deleteTransport,
  findTransportByPlate
} from '@/app/services/transportService';

export function useTransport(accessToken: string) {
  const [transports, setTransports] = useState<Transport[]>([]);
  const [transportMessage, setTransportMessage] = useState('');
  const [isSavingTransport, setIsSavingTransport] = useState(false);
  const [isChangingTransport, setIsChangingTransport] = useState(false);

  const loadTransports = async () => {
    setTransportMessage('');
    const result = await fetchTransports(accessToken);

    if (result.data) {
      setTransports(result.data);
    } else {
      setTransportMessage(result.message || 'No se pudieron cargar los transportes');
    }
  };

  const handleCreateTransport = async (
    busType: string,
    plate: string,
    passengerCapacity: string,
    status: TransportStatus,
    assignedRoute: string
  ) => {
    setTransportMessage('');
    setIsSavingTransport(true);

    try {
      const result = await createTransport(accessToken, busType, plate, Number(passengerCapacity), status, assignedRoute);

      if (!result.success) {
        setTransportMessage(result.message || 'No se pudo crear el transporte');
        return false;
      }

      setTransportMessage(result.message || 'Transporte creado correctamente');
      await loadTransports();
      return true;
    } catch {
      setTransportMessage('No se pudo conectar con el servidor');
      return false;
    } finally {
      setIsSavingTransport(false);
    }
  };

  const handleUpdateTransport = async (
    plate: string,
    busType: string,
    newPlate: string,
    passengerCapacity: string,
    status: TransportStatus,
    assignedRoute: string
  ) => {
    setTransportMessage('');
    setIsChangingTransport(true);

    try {
      const transport = findTransportByPlate(transports, plate);

      if (!transport) {
        setTransportMessage('No se encontró un transporte con esa placa');
        return false;
      }

      const result = await updateTransport(accessToken, transport.id, busType, newPlate, Number(passengerCapacity), status, assignedRoute);

      if (!result.success) {
        setTransportMessage(result.message || 'No se pudo actualizar el transporte');
        return false;
      }

      setTransportMessage(result.message || 'Transporte actualizado correctamente');
      await loadTransports();
      return true;
    } catch {
      setTransportMessage('No se pudo conectar con el servidor');
      return false;
    } finally {
      setIsChangingTransport(false);
    }
  };

  const handleDeleteTransport = async (plate: string) => {
    setTransportMessage('');
    setIsChangingTransport(true);

    try {
      const transport = findTransportByPlate(transports, plate);

      if (!transport) {
        setTransportMessage('No se encontró un transporte con esa placa');
        return false;
      }

      const result = await deleteTransport(accessToken, transport.id);

      if (!result.success) {
        setTransportMessage(result.message || 'No se pudo eliminar el transporte');
        return false;
      }

      setTransportMessage(result.message || 'Transporte eliminado correctamente');
      await loadTransports();
      return true;
    } catch {
      setTransportMessage('No se pudo conectar con el servidor');
      return false;
    } finally {
      setIsChangingTransport(false);
    }
  };

  return {
    transports,
    transportMessage,
    isSavingTransport,
    isChangingTransport,
    loadTransports,
    handleCreateTransport,
    handleUpdateTransport,
    handleDeleteTransport,
    setTransportMessage
  };
}
