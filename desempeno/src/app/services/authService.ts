import type { AuthResponse, Role, AuthUser } from '@/app/types/index';

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  return (await response.json()) as AuthResponse;
}

export async function registerUser(name: string, email: string, password: string, role: Role): Promise<AuthResponse> {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, role })
  });

  return (await response.json()) as AuthResponse;
}

export async function logoutUser(): Promise<void> {
  await fetch('/api/auth/logout', { method: 'POST' });
}

export async function checkView(viewName: 'cliente' | 'admin' | 'superadmin', token: string): Promise<{ message?: string }> {
  const response = await fetch(`/api/view/${viewName}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return (await response.json()) as { message?: string };
}
