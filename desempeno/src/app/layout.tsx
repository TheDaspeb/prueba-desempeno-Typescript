import './globals.css';

export const metadata = {
  title: 'Sistema de Transporte',
  description: 'Auth JWT + roles + CRUD transportes en Next.js'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
