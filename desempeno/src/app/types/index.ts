export type PageView = 'home' | 'login' | 'register';
export type Role = 'CLIENTE' | 'ADMIN' | 'SUPERADMIN';
export type TransportStatus = 'ACTIVO' | 'INACTIVO' | 'MANTENIMIENTO';

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: Role;
};

export type AuthResponse = {
  message?: string;
  accessToken?: string;
  user?: AuthUser;
};

export type Transport = {
  id: number;
  busType: string;
  plate: string;
  passengerCapacity: number;
  status: TransportStatus;
  assignedRoute: string;
};
