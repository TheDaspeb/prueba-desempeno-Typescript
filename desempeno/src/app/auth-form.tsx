'use client';

import { FormEvent, useState } from 'react';
import type { PageView, Role, TransportStatus } from '@/app/types/index';
import { useAuth } from '@/app/hooks/useAuth';
import { useTransport } from '@/app/hooks/useTransport';
import { Header } from '@/app/components/Header';
import { HomeSection } from '@/app/components/HomeSection';
import { AuthCard } from '@/app/components/AuthCard';
import { RolePanel } from '@/app/components/RolePanel';
import { SuperAdminPanel } from '@/app/components/SuperAdminPanel';

export function AuthForm() {
  const [view, setView] = useState<PageView>('home');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('CLIENTE');

  const { user, accessToken, message, isSubmitting, handleLogin, handleRegister, handleLogout, handleCheckView, setMessage } =
    useAuth();

  const {
    transports,
    transportMessage,
    isSavingTransport,
    isChangingTransport,
    loadTransports,
    handleCreateTransport,
    handleUpdateTransport,
    handleDeleteTransport
  } = useTransport(accessToken);

  const [busType, setBusType] = useState('');
  const [plate, setPlate] = useState('');
  const [passengerCapacity, setPassengerCapacity] = useState('');
  const [status, setStatus] = useState<TransportStatus>('ACTIVO');
  const [assignedRoute, setAssignedRoute] = useState('');

  function openView(nextView: PageView) {
    setView(nextView);
    setMessage('');
  }

  async function handleAuthSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const isLogin = view === 'login';
    const success = isLogin ? await handleLogin(email, password) : await handleRegister(name, email, password, role);

    if (success) {
      if (isLogin) {
        setEmail('');
        setPassword('');
        setView('home');
      } else {
        setName('');
        setEmail('');
        setPassword('');
        setRole('CLIENTE');
        setView('login');
      }
    }
  }

  async function handleCreateTransportSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const success = await handleCreateTransport(busType, plate, passengerCapacity, status, assignedRoute);

    if (success) {
      setBusType('');
      setPlate('');
      setPassengerCapacity('');
      setStatus('ACTIVO');
      setAssignedRoute('');
    }
  }

  async function handleUpdateTransportClick() {
    const success = await handleUpdateTransport(plate, busType, plate, passengerCapacity, status, assignedRoute);

    if (success) {
      setBusType('');
      setPlate('');
      setPassengerCapacity('');
      setStatus('ACTIVO');
      setAssignedRoute('');
    }
  }

  async function handleDeleteTransportClick() {
    const success = await handleDeleteTransport(plate);

    if (success) {
      setBusType('');
      setPlate('');
      setPassengerCapacity('');
      setStatus('ACTIVO');
      setAssignedRoute('');
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-slate-950">
      <Header
        user={user}
        onHomeClick={() => openView('home')}
        onLoginClick={() => openView('login')}
        onRegisterClick={() => openView('register')}
        onLogout={async () => {
          await handleLogout();
          openView('home');
        }}
      />

      <section className="mx-auto w-full max-w-6xl px-4 py-8">
        {!user && view === 'home' && <HomeSection />}

        {!user && (view === 'login' || view === 'register') && (
          <AuthCard
            view={view}
            name={name}
            email={email}
            password={password}
            role={role}
            message={message}
            isSubmitting={isSubmitting}
            setName={setName}
            setEmail={setEmail}
            setPassword={setPassword}
            setRole={setRole}
            setView={openView}
            onSubmit={handleAuthSubmit}
          />
        )}

        {user?.role === 'CLIENTE' && (
          <RolePanel
            title="Vista Cliente"
            description="Puedes validar tu acceso como cliente y consultar la vista permitida para este rol."
            message={message}
            onCheck={() => handleCheckView('cliente')}
          />
        )}

        {user?.role === 'ADMIN' && (
          <RolePanel
            title="Vista Admin"
            description="Puedes validar acceso a recursos de cliente y administrador."
            message={message}
            onCheck={() => handleCheckView('admin')}
          />
        )}

        {user?.role === 'SUPERADMIN' && (
          <SuperAdminPanel
            message={message}
            transportMessage={transportMessage}
            transports={transports}
            busType={busType}
            plate={plate}
            passengerCapacity={passengerCapacity}
            status={status}
            assignedRoute={assignedRoute}
            isSavingTransport={isSavingTransport}
            isChangingTransport={isChangingTransport}
            setBusType={setBusType}
            setPlate={setPlate}
            setPassengerCapacity={setPassengerCapacity}
            setStatus={setStatus}
            setAssignedRoute={setAssignedRoute}
            onCheck={() => handleCheckView('superadmin')}
            onListTransports={loadTransports}
            onCreateTransport={handleCreateTransportSubmit}
            onUpdateTransport={handleUpdateTransportClick}
            onDeleteTransport={handleDeleteTransportClick}
          />
        )}
      </section>
    </main>
  );
}
