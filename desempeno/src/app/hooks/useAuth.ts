'use client';

import { FormEvent, useState } from 'react';
import type { AuthUser, Role } from '@/app/types/index';
import { loginUser, registerUser, logoutUser, checkView } from '@/app/services/authService';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    setMessage('');
    setIsSubmitting(true);

    try {
      const data = await loginUser(email, password);

      if (!data.accessToken) {
        setMessage(data.message || 'No se pudo completar la solicitud');
        return false;
      }

      setUser(data.user || null);
      setAccessToken(data.accessToken);
      setMessage('Inicio de sesión correcto');
      return true;
    } catch {
      setMessage('No se pudo conectar con el servidor');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (name: string, email: string, password: string, role: Role): Promise<boolean> => {
    setMessage('');
    setIsSubmitting(true);

    try {
      const data = await registerUser(name, email, password, role);

      if (!data.user) {
        setMessage(data.message || 'No se pudo completar la solicitud');
        return false;
      }

      setMessage('Usuario registrado correctamente. Ahora puedes iniciar sesión.');
      return true;
    } catch {
      setMessage('No se pudo conectar con el servidor');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    setAccessToken('');
    setMessage('Sesión cerrada');
  };

  const handleCheckView = async (viewName: 'cliente' | 'admin' | 'superadmin') => {
    setMessage('');

    try {
      const data = await checkView(viewName, accessToken);
      setMessage(data.message || 'Solicitud completada');
    } catch {
      setMessage('No se pudo conectar con el servidor');
    }
  };

  return {
    user,
    accessToken,
    message,
    isSubmitting,
    setUser,
    setAccessToken,
    setMessage,
    handleLogin,
    handleRegister,
    handleLogout,
    handleCheckView
  };
}
