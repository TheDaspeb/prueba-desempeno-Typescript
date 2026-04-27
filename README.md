# 🚀 Sistema de Autenticación y Gestión de Transportes

Sistema completo de autenticación con control de roles (CLIENTE, ADMIN, SUPERADMIN) y CRUD de transportes. Desarrollado con Next.js, TypeScript, Prisma, PostgreSQL y Tailwind CSS.

---

##  Índice

1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Requisitos Previos](#requisitos-previos)
3. [Instalación](#instalación)
4. [Configuración de Variables de Entorno](#configuración-de-variables-de-entorno)
5. [Estructura del Proyecto](#estructura-del-proyecto)
6. [Explicación de Cambios Realizados](#explicación-de-cambios-realizados)
7. [Cómo Ejecutar el Proyecto](#cómo-ejecutar-el-proyecto)
8. [API Endpoints](#api-endpoints)
9. [Roles y Permisos](#roles-y-permisos)
10. [Flujo de Autenticación](#flujo-de-autenticación)

---

##  Descripción del Proyecto

Este proyecto es una aplicación web de **autenticación y gestión de transportes** que implementa:

- ✅ Sistema de login y registro con validación JWT
- ✅ Control de acceso basado en roles (RBAC)
- ✅ CRUD completo de transportes (solo para SUPERADMIN)
- ✅ Vistas específicas según rol del usuario
- ✅ Código modularizado y escalable
- ✅ TypeScript para seguridad de tipos
- ✅ Tailwind CSS para diseño responsivo

---

##  Requisitos Previos

Asegúrate de tener instalado:

- **Node.js** v18+ ([descargar](https://nodejs.org/))
- **npm** o **yarn**
- **PostgreSQL** corriendo localmente o accesible remotamente
- **Git** (opcional)

---

##  Instalación

### 1. Clonar o acceder al proyecto

```bash
cd /home/cohorte6/Desktop/prueba-desempeno-Typescript/desempeno
```

### 2. Instalar dependencias

```bash
npm install
```

---

##  Configuración de Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# Base de datos PostgreSQL
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_base_datos"

# JWT Secret para firmar tokens
ACCESS_TOKEN_SECRET="tu_secret_super_seguro_aqui"

# Node Environment
NODE_ENV="development"
```

**Ejemplo de DATABASE_URL válido:**
```env
DATABASE_URL="postgresql://postgres:password123@localhost:5432/transporte_db"
```

---

##  Estructura del Proyecto

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts           # Endpoint de login
│   │   │   ├── register/route.ts        # Endpoint de registro
│   │   │   ├── logout/route.ts          # Endpoint de logout
│   │   │   └── refresh/route.ts         # Refresh token
│   │   ├── transporte/
│   │   │   ├── route.ts                 # GET (listar) y POST (crear)
│   │   │   └── [id]/route.ts            # PATCH (actualizar) y DELETE
│   │   └── view/
│   │       └── [view]/route.ts          # Validar acceso por rol
│   ├── components/                      # Componentes de UI reutilizables
│   │   ├── Header.tsx                   # Navegación
│   │   ├── HomeSection.tsx              # Página de inicio
│   │   ├── AuthCard.tsx                 # Formulario login/registro
│   │   ├── RolePanel.tsx                # Panel de validación por rol
│   │   └── SuperAdminPanel.tsx          # Panel CRUD de transportes
│   ├── hooks/                           # Custom hooks
│   │   ├── useAuth.ts                   # Lógica de autenticación
│   │   └── useTransport.ts              # Lógica de transportes
│   ├── services/                        # Servicios de API
│   │   ├── authService.ts               # Llamadas a endpoints de auth
│   │   └── transportService.ts          # Llamadas a endpoints de transporte
│   ├── types/                           # Tipos TypeScript
│   │   └── index.ts                     # Definiciones de tipos globales
│   ├── auth-form.tsx                    # Componente principal
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── lib/
│   ├── lib.ts                           # Cliente Prisma
│   ├── auth.ts                          # Funciones de JWT y autorización
│   ├── hash.ts                          # Hash de contraseñas
│   └── prisma.ts                        # Exportación de Prisma
├── generated/
│   └── prisma/                          # Tipos generados por Prisma
└── middleware.ts                        # Middleware para proteger rutas
```

---

## Explicación de Cambios Realizados

### 1. **Modularización de Componentes**

El archivo `auth-form.tsx` original tenía más de 700 líneas y contenía toda la lógica. Se dividió en:

- **5 componentes de UI** (`Header`, `HomeSection`, `AuthCard`, `RolePanel`, `SuperAdminPanel`)
- **2 custom hooks** (`useAuth`, `useTransport`)
- **2 servicios de API** (`authService`, `transportService`)
- **1 archivo de tipos** (`types/index.ts`)

**Beneficio:** Código más limpio, reutilizable y fácil de mantener.

### 2. **Creación de Servicios de API**

#### `src/app/services/authService.ts`
- `loginUser()` - Realiza login
- `registerUser()` - Registra nuevo usuario
- `logoutUser()` - Cierra sesión
- `checkView()` - Valida acceso a vista

#### `src/app/services/transportService.ts`
- `fetchTransports()` - Obtiene lista de transportes
- `createTransport()` - Crea nuevo transporte
- `updateTransport()` - Actualiza transporte
- `deleteTransport()` - Elimina transporte
- `findTransportByPlate()` - Busca por placa

**Beneficio:** Separación clara de responsabilidades, fácil de testear.

### 3. **Custom Hooks para Lógica de Estado**

#### `src/app/hooks/useAuth.ts`
Encapsula toda la lógica de autenticación:
- Estado del usuario
- Estado del token
- Manejo de login/register/logout
- Validación de acceso a vistas

#### `src/app/hooks/useTransport.ts`
Encapsula lógica de transportes:
- Estado de transportes
- Cargar, crear, actualizar, eliminar
- Mensajes de estado

**Beneficio:** Lógica reutilizable y estado centralizado.

### 4. **Tipos Centralizados**

Archivo `src/app/types/index.ts` con definiciones de tipos:
- `PageView`, `Role`, `TransportStatus`
- `AuthUser`, `AuthResponse`
- `Transport`

**Beneficio:** Una única fuente de verdad para tipos.

---

##  Cómo Ejecutar el Proyecto

### Paso 1: Instalar dependencias

```bash
npm install
```

### Paso 2: Configurar base de datos

```bash
# Ejecutar migraciones de Prisma
npx prisma migrate dev --name init
```

```bash
# Opcional: Abrir Prisma Studio para ver/editar datos
npx prisma studio
```

### Paso 3: Ejecutar servidor de desarrollo

```bash
npm run dev
```

El servidor estará disponible en: **http://localhost:3000**

### Paso 4: Acceder a la aplicación

1. Abre el navegador en `http://localhost:3000`
2. Usa **"Registro"** para crear una cuenta
3. Usa **"Login"** para iniciar sesión
4. Accede a funcionalidades según tu rol

---

## 📡 API Endpoints

### Autenticación

| Método | Ruta | Descripción | Requiere Auth |
|--------|------|-------------|---------------|
| `POST` | `/api/auth/login` | Iniciar sesión |
| `POST` | `/api/auth/register` | Registrar usuario |
| `POST` | `/api/auth/logout` | Cerrar sesión |
| `POST` | `/api/auth/refresh` | Refrescar token |

### Validación de Vistas

| Método | Ruta | Descripción | Requiere Auth |
|--------|------|-------------|---------------|
| `GET` | `/api/view/cliente` | Validar acceso CLIENTE | 
| `GET` | `/api/view/admin` | Validar acceso ADMIN | 
| `GET` | `/api/view/superadmin` | Validar acceso SUPERADMIN | 

### Transportes (Solo SUPERADMIN)

| Método | Ruta | Descripción | Requiere Auth |
|--------|------|-------------|---------------|
| `GET` | `/api/transporte` | Listar transportes | SUPERADMIN |
| `POST` | `/api/transporte` | Crear transporte | SUPERADMIN |
| `PATCH` | `/api/transporte/:id` | Actualizar transporte | SUPERADMIN |
| `DELETE` | `/api/transporte/:id` | Eliminar transporte | SUPERADMIN |

---

##  Roles y Permisos

### CLIENTE
- Puede iniciar sesión
- Puede acceder a vista `/api/view/cliente`
- No puede acceder a transportes

### ADMIN
- Puede iniciar sesión
- Puede acceder a vistas `/api/view/cliente` y `/api/view/admin`
- No puede acceder a transportes

### SUPERADMIN
- Puede iniciar sesión
- Puede acceder a todas las vistas
- **Acceso completo a CRUD de transportes**

---

##  Flujo de Autenticación

```
1. Usuario se registra
   ↓
2. Contraseña se hashea con SHA-256
   ↓
3. Usuario inicia sesión
   ↓
4. Se genera JWT (válido 15 minutos)
   ↓
5. Token se envía en header Authorization: Bearer <token>
   ↓
6. Backend valida firma y expiración
   ↓
7. Acceso otorgado según rol
```

---

## � Datos de Prueba

### Usuarios Pre-cargados para Testing

#### Usuario 1: Cliente
```
Email: daniel@gmail.com.com
Contraseña: daniel123456
Rol: CLIENTE
```

#### Usuario 2: Admin
```
Email: aleja@gmail.com
Contraseña: aleja123
Rol: ADMIN
```

#### Usuario 3: SuperAdmin
```
Email: admin@admin.com
Contraseña: admin123
Rol: SUPERADMIN
```

---

## 📚 Documentación de Endpoints

### 1️⃣ Registro de Usuario

**Endpoint:** `POST /api/auth/register`

**Descripción:** Crea un nuevo usuario en el sistema

**Request:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "password123",
    "role": "CLIENTE"
  }'
```

**Body Params:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|----------|-------------|
| `name` | string | ✅ | Nombre del usuario (mín. 2 caracteres) |
| `email` | string | ✅ | Email único |
| `password` | string | ✅ | Contraseña (mín. 6 caracteres) |
| `role` | enum | ✅ | CLIENTE, ADMIN o SUPERADMIN |

**Response (201):**
```json
{
  "message": "Usuario creado",
  "user": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "role": "CLIENTE"
  }
}
```

**Response Error (409):**
```json
{
  "message": "El correo ya está registrado"
}
```

---

### 2️⃣ Login (Iniciar Sesión)

**Endpoint:** `POST /api/auth/login`

**Descripción:** Autentica un usuario y devuelve JWT

**Request:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "cliente@example.com",
    "password": "password123"
  }'
```

**Body Params:**
| Parámetro | Tipo | Requerido |
|-----------|------|----------|
| `email` | string | ✅ |
| `password` | string | ✅ |

**Response (200):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwic...",
  "user": {
    "id": 1,
    "name": "Cliente Test",
    "email": "cliente@example.com",
    "role": "CLIENTE"
  }
}
```

**Response Error (401):**
```json
{
  "message": "Credenciales inválidas"
}
```

---

###  Validar Acceso a Vista

**Endpoint:** `GET /api/view/{viewName}`

**Descripción:** Valida si el usuario tiene acceso a una vista específica

**Parámetros de Ruta:**
- `viewName`: `cliente`, `admin`, o `superadmin`

**Request:**
```bash
# Como cliente
curl -X GET http://localhost:3000/api/view/cliente \
  -H "Authorization: Bearer <ACCESS_TOKEN>"

# Como admin
curl -X GET http://localhost:3000/api/view/admin \
  -H "Authorization: Bearer <ACCESS_TOKEN>"

# Como superadmin
curl -X GET http://localhost:3000/api/view/superadmin \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

**Response (200):**
```json
{
  "message": "Bienvenido a la vista cliente",
  "user": {
    "id": 1,
    "email": "cliente@example.com",
    "role": "CLIENTE"
  }
}
```

**Response Error (403):**
```json
{
  "message": "No autorizado para este recurso"
}
```

---

### 4️⃣ Listar Transportes (SUPERADMIN)

**Endpoint:** `GET /api/transporte`

**Descripción:** Obtiene la lista de todos los transportes

**Requisito:** Token de SUPERADMIN

**Request:**
```bash
curl -X GET http://localhost:3000/api/transporte \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

**Response (200):**
```json
[
  {
    "id": 1,
    "busType": "Urbano",
    "plate": "ABC123",
    "passengerCapacity": 40,
    "status": "ACTIVO",
    "assignedRoute": "Ruta Centro"
  },
  {
    "id": 2,
    "busType": "Interurbano",
    "plate": "DEF456",
    "passengerCapacity": 50,
    "status": "INACTIVO",
    "assignedRoute": "Ruta Periferia"
  }
]
```

---

### 5️⃣ Crear Transporte (SUPERADMIN)

**Endpoint:** `POST /api/transporte`

**Descripción:** Crea un nuevo transporte

**Requisito:** Token de SUPERADMIN

**Request:**
```bash
curl -X POST http://localhost:3000/api/transporte \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "busType": "Urbano",
    "plate": "XYZ789",
    "passengerCapacity": 40,
    "status": "ACTIVO",
    "assignedRoute": "Ruta 5"
  }'
```

**Body Params:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|----------|-------------|
| `busType` | string | ✅ | Tipo de autobús (mín. 2 caracteres) |
| `plate` | string | ✅ | Placa única (mín. 5 caracteres) |
| `passengerCapacity` | number | ✅ | Capacidad de pasajeros (> 0) |
| `status` | enum | ✅ | ACTIVO, INACTIVO o MANTENIMIENTO |
| `assignedRoute` | string | ✅ | Ruta asignada (mín. 3 caracteres) |

**Response (201):**
```json
{
  "id": 3,
  "busType": "Urbano",
  "plate": "XYZ789",
  "passengerCapacity": 40,
  "status": "ACTIVO",
  "assignedRoute": "Ruta 5"
}
```

**Response Error (409):**
```json
{
  "message": "La placa ya existe"
}
```

---

### 6️⃣ Actualizar Transporte (SUPERADMIN)

**Endpoint:** `PATCH /api/transporte/:id`

**Descripción:** Actualiza un transporte existente

**Requisito:** Token de SUPERADMIN

**Request:**
```bash
curl -X PATCH http://localhost:3000/api/transporte/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "status": "MANTENIMIENTO",
    "passengerCapacity": 35
  }'
```

**Body Params:** Todos son opcionales, solo envía los que deseas actualizar

**Response (200):**
```json
{
  "id": 1,
  "busType": "Urbano",
  "plate": "ABC123",
  "passengerCapacity": 35,
  "status": "MANTENIMIENTO",
  "assignedRoute": "Ruta Centro"
}
```

---

### 7️⃣ Eliminar Transporte (SUPERADMIN)

**Endpoint:** `DELETE /api/transporte/:id`

**Descripción:** Elimina un transporte del sistema

**Requisito:** Token de SUPERADMIN

**Request:**
```bash
curl -X DELETE http://localhost:3000/api/transporte/1 \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

**Response (204):**
```
(sin contenido)
```

**Response Error (404):**
```json
{
  "message": "Transporte no encontrado"
}
```

---

### 8️⃣ Logout (Cerrar Sesión)

**Endpoint:** `POST /api/auth/logout`

**Descripción:** Cierra la sesión del usuario

**Request:**
```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

**Response (200):**
```json
{
  "message": "Sesión cerrada"
}
```

---

## 📮 Colección Postman

### Importar en Postman

1. Abre Postman
2. Click en **Import**
3. Pega el siguiente JSON:

```json
{
  "info": {
    "name": "Sistema Autenticación y Transportes",
    "description": "API de autenticación y gestión de transportes",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Registrar Usuario",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "url": {
              "raw": "http://localhost:3000/api/auth/register",
              "protocol": "http",
              "host": ["localhost"],
              "port": "3000",
              "path": ["api", "auth", "register"]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Test User\",\n  \"email\": \"test@example.com\",\n  \"password\": \"password123\",\n  \"role\": \"CLIENTE\"\n}"
            }
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "url": {
              "raw": "http://localhost:3000/api/auth/login",
              "protocol": "http",
              "host": ["localhost"],
              "port": "3000",
              "path": ["api", "auth", "login"]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"superadmin@example.com\",\n  \"password\": \"password123\"\n}"
            }
          }
        }
      ]
    },
    {
      "name": "Transportes",
      "item": [
        {
          "name": "Listar Transportes",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer <ACCESS_TOKEN>"
              }
            ],
            "url": {
              "raw": "http://localhost:3000/api/transporte",
              "protocol": "http",
              "host": ["localhost"],
              "port": "3000",
              "path": ["api", "transporte"]
            }
          }
        },
        {
          "name": "Crear Transporte",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              },
              {
                "key": "Authorization",
                "value": "Bearer <ACCESS_TOKEN>"
              }
            ],
            "url": {
              "raw": "http://localhost:3000/api/transporte",
              "protocol": "http",
              "host": ["localhost"],
              "port": "3000",
              "path": ["api", "transporte"]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"busType\": \"Urbano\",\n  \"plate\": \"ABC123\",\n  \"passengerCapacity\": 40,\n  \"status\": \"ACTIVO\",\n  \"assignedRoute\": \"Ruta Centro\"\n}"
            }
          }
        }
      ]
    }
  ]
}
```

---

## 📄 Archivo .env.example

Crea un archivo `.env.example` en la raíz del proyecto (para documentar las variables necesarias):

```env
# Base de datos PostgreSQL
# Ejemplo: postgresql://postgres:password@localhost:5432/transporte_db
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_base_datos"

# JWT Secret para firmar tokens (mínimo 32 caracteres recomendado)
# Usar un valor seguro y complejo en producción
ACCESS_TOKEN_SECRET="tu_secret_super_seguro_aqui_minimo_32_caracteres"

# Environment
# Valores: development, production
NODE_ENV="development"
```

**Para usar:**
```bash
# Copiar a .env.local y llenar con tus valores
cp .env.example .env.local
```

---

## 🛠️ Comandos Útiles

```bash
# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev

# Build para producción
npm build

# Iniciar servidor de producción
npm start

# Ejecutar linter
npm run lint

# Migrar base de datos
npx prisma migrate dev

# Ver base de datos (Prisma Studio)
npx prisma studio

# Reset de base de datos
npx prisma migrate reset
```

---

## 🎨 Tecnologías Utilizadas

- **Next.js 16** - Framework React
- **TypeScript** - Tipado estático
- **Prisma** - ORM para base de datos
- **PostgreSQL** - Base de datos relacional
- **Zod** - Validación de esquemas
- **Tailwind CSS** - Estilos responsivos
- **Node.js Crypto** - Hashing y JWT

---

## 📌 Notas Importantes

1. **Variables de Entorno:** Asegúrate de crear `.env.local` con `DATABASE_URL` y `ACCESS_TOKEN_SECRET`
2. **Base de Datos:** Necesitas PostgreSQL corriendo antes de ejecutar migraciones
3. **Tokens JWT:** Los tokens expiran después de 15 minutos
4. **Seguridad:** En producción, usa valores seguros para `ACCESS_TOKEN_SECRET`
5. **CORS:** Configura CORS si vas a consumir desde otro dominio

---

## 📞 Soporte

Si encuentras problemas:

1. Verifica que PostgreSQL esté corriendo
2. Comprueba las variables de entorno en `.env.local`
3. Ejecuta `npm install` nuevamente
4. Limpia caché con `rm -rf .next && npm run dev`

---

**Versión:** 0.1.0 | **Última actualización:** 27 de abril de 2026
