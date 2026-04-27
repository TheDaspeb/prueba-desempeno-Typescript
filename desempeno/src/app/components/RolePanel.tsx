'use client';

type RolePanelProps = {
  title: string;
  description: string;
  message: string;
  onCheck: () => void;
};

export function RolePanel({ title, description, message, onCheck }: RolePanelProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-medium text-cyan-700">Vista por rol</p>
      <h2 className="mt-2 text-3xl font-semibold text-slate-950">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{description}</p>
      <button
        type="button"
        onClick={onCheck}
        className="mt-6 h-10 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Validar acceso
      </button>
      {message && (
        <p className="mt-5 rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          {message}
        </p>
      )}
    </div>
  );
}
