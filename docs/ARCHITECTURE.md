# Architecture Documentation / Documentación de Arquitectura

---

## Español

### Visión General de la Arquitectura

ERP-Psicologia sigue una arquitectura de **monorepo** utilizando pnpm workspaces, separando claramente el backend y el frontend en aplicaciones independientes pero sharing código común.

```
┌─────────────────────────────────────────────────────────────┐
│                    ERP-Psicologia                           │
├─────────────────────────────────────────────────────────────┤
│  apps/                                                      │
│  ├── backend/    → NestJS API (Port 3001)                  │
│  └── frontend/   → React 19 SPA (Port 5173)                │
├─────────────────────────────────────────────────────────────┤
│  packages/                                                   │
│  └── shared/    → Tipos, enums, utilidades                 │
└─────────────────────────────────────────────────────────────┘
```

### Decisiones Arquitectónicas

| Decisión | Selección | Alternativas | Razón |
|----------|-----------|--------------|-------|
| ORM | Sequelize | TypeORM, Prisma | Patrón activo en equipo |
| State | Zustand | Redux, Context | Simplicidad, boilerplate bajo |
| Styling | Tailwind CSS | CSS Modules, Styled | Velocidad desarrollo |
| Auth | JWT + Refresh | Session, OAuth | Stateless, escalable |

### Flujo de Datos

```
┌──────────┐    JWT Token    ┌──────────┐    HTTP     ┌──────────┐
│ Frontend │ ──────────────→ │  NestJS  │ ──────────→ │ PostgreSQL│
│  (React) │ ←────────────── │   API    │ ←────────── │   (DB)    │
└──────────┘   JSON Data     └──────────┘   SQL      └──────────┘
```

### Patrones de Diseño

#### Backend (NestJS)
- **Service Layer**: Lógica de negocio encapsulada
- **Controller Layer**: Endpoints REST, validación con class-validator
- **Module Layer**: Organización por dominio
- **Guard**: Protección de rutas por roles
- **Interceptor**: Transformación de respuestas

#### Frontend (React 19)
- **Atomic Design**: Componentes organizados por nivel
- **Presentational/Container**: Separación UI/lógica
- **Zustand Stores**: Estado global比分
- **Custom Hooks**: Lógica reutilizable

---

## English

### Architecture Overview

ERP-Psicologia follows a **monorepo** architecture using pnpm workspaces, clearly separating backend and frontend into independent applications while sharing common code.

```
┌─────────────────────────────────────────────────────────────┐
│                    ERP-Psicologia                           │
├─────────────────────────────────────────────────────────────┤
│  apps/                                                      │
│  ├── backend/    → NestJS API (Port 3001)                  │
│  └── frontend/   → React 19 SPA (Port 5173)                │
├─────────────────────────────────────────────────────────────┤
│  packages/                                                   │
│  └── shared/    → Types, enums, utilities                  │
└─────────────────────────────────────────────────────────────┘
```

### Architectural Decisions

| Decision | Choice | Alternatives | Rationale |
|----------|--------|--------------|-----------|
| ORM | Sequelize | TypeORM, Prisma | Team's active pattern |
| State | Zustand | Redux, Context | Simplicity, low boilerplate |
| Styling | Tailwind CSS | CSS Modules, Styled | Dev speed |
| Auth | JWT + Refresh | Session, OAuth | Stateless, scalable |

### Data Flow

```
┌──────────┐    JWT Token    ┌──────────┐    HTTP     ┌──────────┐
│ Frontend │ ──────────────→ │  NestJS  │ ──────────→ │ PostgreSQL│
│  (React) │ ←────────────── │   API    │ ←────────── │   (DB)    │
└──────────┘   JSON Data     └──────────┘   SQL      └──────────┘
```

### Design Patterns

#### Backend (NestJS)
- **Service Layer**: Business logic encapsulated
- **Controller Layer**: REST endpoints, validation with class-validator
- **Module Layer**: Domain organization
- **Guard**: Role-based route protection
- **Interceptor**: Response transformation

#### Frontend (React 19)
- **Atomic Design**: Components organized by level
- **Presentational/Container**: UI/logic separation
- **Zustand Stores**: Global state
- **Custom Hooks**: Reusable logic

---

## Module Structure / Estructura de Módulos

### Backend Modules

```
apps/backend/src/modules/
├── auth/              # JWT, register, login, refresh, logout
├── pacientes/         # Patient management
├── historias/         # Clinical records
├── usuarios/          # User management (future)
└── health/            # Health check
```

### Frontend Structure

```
apps/frontend/src/
├── components/
│   ├── ui/            # Base components (Button, Input, Spinner)
│   └── paciente/      # Patient-specific components
├── pages/             # Route pages
├── store/             # Zustand stores
├── services/          # API clients
└── types/             # TypeScript definitions
```

---

## Security / Seguridad

### Authentication
- JWT access tokens (15 min expiry)
- Refresh tokens (7 days expiry)
- Token blacklist for logout

### Authorization (RBAC)
| Endpoint | ADMIN | PSICOLOGO | PSIQUIATRA | SECRETARIO | USER |
|----------|:-----:|:---------:|:----------:|:----------:|:----:|
| POST /auth/* | ✅ | ✅ | ✅ | ✅ | ✅ |
| GET /pacientes | ✅ | ✅ | ✅ | ✅ | ❌ |
| POST /pacientes | ✅ | ✅ | ✅ | ✅ | ❌ |
| GET /historias | ✅ | ✅ | ✅ | ❌ | ❌ |
| POST /historias | ✅ | ✅ | ✅ | ❌ | ❌ |

---

## Database Schema / Esquema de Base de Datos

### Users Table
```sql
users (
  id UUID PK
  email VARCHAR(255) UNIQUE
  password_hash VARCHAR(255)
  nombre VARCHAR(100)
  rol ENUM('ADMIN','PSICOLOGO','PSIQUIATRA','SECRETARIO','USER')
  activo BOOLEAN DEFAULT true
  created_at TIMESTAMP
  updated_at TIMESTAMP
)
```

### Pacientes Table
```sql
pacientes (
  id UUID PK
  dni VARCHAR(20) UNIQUE
  nombre VARCHAR(100)
  apellido VARCHAR(100)
  fecha_nac DATE
  contacto VARCHAR(255)
  direccion TEXT
  obra_social VARCHAR(255)
  activo BOOLEAN DEFAULT true
  created_at TIMESTAMP
  updated_at TIMESTAMP
)
```

### Historias Clínicas Table
```sql
historias (
  id UUID PK
  paciente_id UUID FK
  profesional_id UUID FK
  fecha TIMESTAMP
  contenido JSONB
  tipo_plantilla ENUM('ANAMNESIS','EVOLUCION','CIERRE','LIBRE')
  created_at TIMESTAMP
  updated_at TIMESTAMP
)
```