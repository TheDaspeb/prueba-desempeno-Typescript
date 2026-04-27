# 🚀 Sistema de Autenticación y Gestión de Transportes

Aplicación fullstack desarrollada con **Next.js 16**, **TypeScript**, **Prisma** y **PostgreSQL**. 

## 📖 Descripción

Sistema web completo de **autenticación con roles** y **CRUD de transportes** con las siguientes características:

- ✅ Registro e login con JWT
- ✅ Control de acceso basado en roles (RBAC)
- ✅ CRUD de transportes (solo SUPERADMIN)
- ✅ Código modularizado (componentes, hooks, servicios)
- ✅ TypeScript para seguridad de tipos
- ✅ Interfaz responsiva con Tailwind CSS

---

## 🔧 Requisitos

- **Node.js** v18+
- **PostgreSQL** 12+
- **npm** o **yarn**

---

## 📦 Instalación Rápida

```bash
# 1. Instalar dependencias
npm install

# 2. Crear .env.local (copia desde .env.example)
cp .env.example .env.local

# 3. Llenar variables de entorno
# DATABASE_URL=postgresql://...
# ACCESS_TOKEN_SECRET=tu_secret

# 4. Migrar base de datos
npx prisma migrate dev --name init

# 5. Ejecutar servidor
npm run dev

# 6. Abrir en navegador
# http://localhost:3000
```

---

## 🔐 Configuración (.env.local)

```env
DATABASE_URL="postgresql://postgres:password123@localhost:5432/transporte_db"
ACCESS_TOKEN_SECRET="mi_super_secret_key_32_caracteres_minimo"
NODE_ENV="development"
```

Ver [.env.example](.env.example) para más detalles.

---

## 📡 Endpoints Principales

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/auth/register` | Registrar usuario |
| `POST` | `/api/auth/login` | Iniciar sesión |
| `GET` | `/api/view/{cliente\|admin\|superadmin}` | Validar acceso |
| `GET/POST/PATCH/DELETE` | `/api/transporte` | CRUD transportes (SUPERADMIN) |

📚 **Ver [README principal](../README.md) para documentación completa de endpoints**

---

## 👥 Roles

- **CLIENTE** - Acceso básico
- **ADMIN** - Permisos intermedios
- **SUPERADMIN** - Acceso completo + CRUD transportes

---

## 📂 Estructura

```
src/
├── app/api/             # Route handlers
├── app/components/      # Componentes reutilizables
├── app/hooks/           # Custom hooks (useAuth, useTransport)
├── app/services/        # Servicios de API
├── app/types/           # Tipos compartidos
└── lib/                 # Utilidades (auth, hash, prisma)
```

---

## 🛠️ Comandos

```bash
npm run dev              # Desarrollo
npm run build            # Build
npm start                # Producción
npm run lint             # Linter
npx prisma studio       # Ver DB visualmente
npx prisma migrate dev   # Migración
```

---

## 👤 Usuarios de Prueba

```
Email: superadmin@example.com
Password: password123
Role: SUPERADMIN
```

Otros: cliente@example.com, admin@example.com (mismo password)

---

**Para documentación detallada, ver [README principal](../README.md)**
