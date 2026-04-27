'use client';

export function Header({ user, onHomeClick, onLoginClick, onRegisterClick, onLogout }: any) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <button
          type="button"
          onClick={onHomeClick}
          className="text-2xl font-bold tracking-tight text-slate-950"
        >
          Nexthus
        </button>

        <div className="flex items-center gap-2">
          {!user && (
            <>
              <button
                type="button"
                onClick={onHomeClick}
                className="h-10 rounded-md px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Inicio
              </button>
              <button
                type="button"
                onClick={onLoginClick}
                className="h-10 rounded-md px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Login
              </button>
              <button
                type="button"
                onClick={onRegisterClick}
                className="h-10 rounded-md bg-cyan-700 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800"
              >
                Registro
              </button>
            </>
          )}

          {user && (
            <>
              <span className="hidden text-sm text-slate-600 sm:inline">
                {user.name} - {user.role}
              </span>
              <button
                type="button"
                onClick={onLogout}
                className="h-10 rounded-md border border-slate-300 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Salir
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
