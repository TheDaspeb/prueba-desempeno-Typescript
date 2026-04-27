'use client';

import { FormEvent } from 'react';
import type { PageView, Role } from '@/app/types/index';

type AuthCardProps = {
  view: 'login' | 'register';
  name: string;
  email: string;
  password: string;
  role: Role;
  message: string;
  isSubmitting: boolean;
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setRole: (value: Role) => void;
  setView: (value: PageView) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function AuthCard({
  view,
  name,
  email,
  password,
  role,
  message,
  isSubmitting,
  setName,
  setEmail,
  setPassword,
  setRole,
  setView,
  onSubmit
}: AuthCardProps) {
  const isLogin = view === 'login';

  return (
    <div className="grid min-h-[calc(100vh-9rem)] place-items-center">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm md:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col justify-between bg-slate-950 px-8 py-10 text-white">
          <div>
            <p className="text-sm font-medium text-cyan-300">Nexthus</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight">
              {isLogin ? 'Login de usuario' : 'Registro de usuario'}
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              {isLogin
                ? 'Ingresa con tu correo y contraseña para ver las funciones disponibles según tu rol.'
                : 'Crea un usuario y asigna un rol para validar permisos dentro del sistema.'}
            </p>
          </div>

          <div className="mt-10 rounded-md border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Rol disponible</p>
            <p className="mt-2 text-sm text-slate-100">CLIENTE, ADMIN o SUPERADMIN</p>
          </div>
        </div>

        <div className="px-6 py-8 sm:px-10">
          <div className="grid grid-cols-2 rounded-md border border-slate-200 bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setView('login')}
              className={`h-10 rounded text-sm font-medium transition ${
                isLogin ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setView('register')}
              className={`h-10 rounded text-sm font-medium transition ${
                !isLogin ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Registro
            </button>
          </div>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            {!isLogin && (
              <label className="block text-sm font-medium text-slate-700">
                Nombre
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-2 h-11 w-full rounded-md border border-slate-300 px-3 text-base outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
                  minLength={2}
                  required
                />
              </label>
            )}

            {!isLogin && (
              <label className="block text-sm font-medium text-slate-700">
                Rol
                <select
                  value={role}
                  onChange={(event) => setRole(event.target.value as Role)}
                  className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-base outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
                >
                  <option value="CLIENTE">Cliente</option>
                  <option value="ADMIN">Admin</option>
                  <option value="SUPERADMIN">SuperAdmin</option>
                </select>
              </label>
            )}

            <label className="block text-sm font-medium text-slate-700">
              Correo
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 h-11 w-full rounded-md border border-slate-300 px-3 text-base outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
                required
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Contraseña
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 h-11 w-full rounded-md border border-slate-300 px-3 text-base outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
                minLength={6}
                required
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full rounded-md bg-cyan-700 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {isSubmitting ? 'Procesando...' : isLogin ? 'Ingresar' : 'Crear cuenta'}
            </button>
          </form>

          {message && (
            <p className="mt-5 rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
