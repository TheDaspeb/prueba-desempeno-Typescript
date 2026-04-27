'use client';

export function HomeSection() {
  return (
    <div className="flex min-h-[calc(100vh-9rem)] items-center">
      <div className="w-full rounded-lg border border-slate-200 bg-white px-6 py-12 shadow-sm sm:px-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">Inicio</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-slate-950">
          Prueba desempeño Typescript Daniel Perez
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
          Sistema de autenticación con roles para validar vistas, permisos y gestión básica de transportes.
        </p>
      </div>
    </div>
  );
}
