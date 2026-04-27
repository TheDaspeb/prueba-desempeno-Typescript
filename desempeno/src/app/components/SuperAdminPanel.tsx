'use client';

import { FormEvent } from 'react';
import type { Transport, TransportStatus } from '@/app/types/index';

type SuperAdminPanelProps = {
  message: string;
  transportMessage: string;
  transports: Transport[];
  busType: string;
  plate: string;
  passengerCapacity: string;
  status: TransportStatus;
  assignedRoute: string;
  isSavingTransport: boolean;
  isChangingTransport: boolean;
  setBusType: (value: string) => void;
  setPlate: (value: string) => void;
  setPassengerCapacity: (value: string) => void;
  setStatus: (value: TransportStatus) => void;
  setAssignedRoute: (value: string) => void;
  onCheck: () => void;
  onListTransports: () => void;
  onCreateTransport: (event: FormEvent<HTMLFormElement>) => void;
  onUpdateTransport: () => void;
  onDeleteTransport: () => void;
};

export function SuperAdminPanel({
  message,
  transportMessage,
  transports,
  busType,
  plate,
  passengerCapacity,
  status,
  assignedRoute,
  isSavingTransport,
  isChangingTransport,
  setBusType,
  setPlate,
  setPassengerCapacity,
  setStatus,
  setAssignedRoute,
  onCheck,
  onListTransports,
  onCreateTransport,
  onUpdateTransport,
  onDeleteTransport
}: SuperAdminPanelProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-cyan-700">Panel SuperAdmin</p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-950">CRUD de transportes</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onCheck}
            className="h-10 rounded-md border border-slate-300 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Validar acceso
          </button>
          <button
            type="button"
            onClick={onListTransports}
            className="h-10 rounded-md border border-slate-300 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Listar transportes
          </button>
        </div>
      </div>

      {message && (
        <p className="mt-5 rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          {message}
        </p>
      )}

      <form onSubmit={onCreateTransport} className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          Tipo de autobús
          <input
            value={busType}
            onChange={(event) => setBusType(event.target.value)}
            className="mt-2 h-11 w-full rounded-md border border-slate-300 px-3 text-base outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
            minLength={2}
            required
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Placa
          <input
            value={plate}
            onChange={(event) => setPlate(event.target.value)}
            className="mt-2 h-11 w-full rounded-md border border-slate-300 px-3 text-base uppercase outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
            minLength={5}
            required
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Capacidad de pasajeros
          <input
            type="number"
            value={passengerCapacity}
            onChange={(event) => setPassengerCapacity(event.target.value)}
            className="mt-2 h-11 w-full rounded-md border border-slate-300 px-3 text-base outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
            min={1}
            required
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Estado
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as TransportStatus)}
            className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-base outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
          >
            <option value="ACTIVO">Activo</option>
            <option value="INACTIVO">Inactivo</option>
            <option value="MANTENIMIENTO">Mantenimiento</option>
          </select>
        </label>

        <label className="block text-sm font-medium text-slate-700 md:col-span-2">
          Ruta asignada
          <input
            value={assignedRoute}
            onChange={(event) => setAssignedRoute(event.target.value)}
            className="mt-2 h-11 w-full rounded-md border border-slate-300 px-3 text-base outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
            minLength={3}
            required
          />
        </label>

        <button
          type="submit"
          disabled={isSavingTransport}
          className="h-11 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isSavingTransport ? 'Guardando...' : 'Crear transporte'}
        </button>

        <button
          type="button"
          onClick={onUpdateTransport}
          disabled={isChangingTransport}
          className="h-11 rounded-md bg-cyan-700 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isChangingTransport ? 'Procesando...' : 'Actualizar por placa'}
        </button>

        <button
          type="button"
          onClick={onDeleteTransport}
          disabled={isChangingTransport}
          className="h-11 rounded-md border border-red-300 px-4 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:border-slate-300 disabled:text-slate-400 md:col-span-2"
        >
          Eliminar por placa
        </button>
      </form>

      {transportMessage && (
        <p className="mt-5 rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          {transportMessage}
        </p>
      )}

      {transports.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="py-3 pr-4 font-medium">Tipo</th>
                <th className="py-3 pr-4 font-medium">Placa</th>
                <th className="py-3 pr-4 font-medium">Capacidad</th>
                <th className="py-3 pr-4 font-medium">Estado</th>
                <th className="py-3 pr-4 font-medium">Ruta</th>
              </tr>
            </thead>
            <tbody>
              {transports.map((transport) => (
                <tr key={transport.id} className="border-b border-slate-100">
                  <td className="py-3 pr-4">{transport.busType}</td>
                  <td className="py-3 pr-4 font-medium">{transport.plate}</td>
                  <td className="py-3 pr-4">{transport.passengerCapacity}</td>
                  <td className="py-3 pr-4">{transport.status}</td>
                  <td className="py-3 pr-4">{transport.assignedRoute}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
