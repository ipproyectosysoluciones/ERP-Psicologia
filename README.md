# ERP-Psicologia

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB)](https://react.dev/)
[![NestJS](https://img.shields.io/badge/NestJS-10-E0234D)](https://nestjs.com/)

---

## Español

### Descripción

**ERP-Psicologia** es un sistema de planificación de recursos empresariales (ERP) diseñado específicamente para clínicas de psicología y psiquiatría. Proporciona una solución integral para la gestión de pacientes, historias clínicas, citas y administrativa.

### Características Principales

| Módulo | Descripción |
|--------|-------------|
| **Auth + RBAC** | Sistema de autenticación JWT con control de acceso basado en roles |
| **Pacientes** | Gestión completa de pacientes con datos personales y de contacto |
| **Historias Clínicas** | Registro y gestión de historias clínicas con plantillas |
| **Citas** | Sistema de citas y agenda (próximamente) |
| **Reportes** | Generación de reportes y estadísticas (próximamente) |

### Roles de Usuario

| Rol | Descripción |
|-----|-------------|
| `ADMIN` | Acceso completo al sistema |
| `PSICOLOGO` | Profesional de psicología |
| `PSIQUIATRA` | Profesional de psiquiatría |
| `SECRETARIO` | Personal administrativo |
| `USER` | Usuario básico |

### Tech Stack

- **Frontend**: React 19 + Vite + Tailwind CSS + Zustand
- **Backend**: NestJS + Sequelize + PostgreSQL
- **Monorepo**: pnpm workspaces
- **Auth**: JWT con refresh tokens

### Estructura del Proyecto

```
erp-psicologia/
├── apps/
│   ├── backend/          # API NestJS
│   └── frontend/         # Aplicación React
├── packages/
│   └── shared/           # Tipos y enumeraciones compartidas
├── .atl/                 # SDD artifacts
└── pnpm-workspace.yaml
```

### Instalación

```bash
# Instalar dependencias
pnpm install

# Desarrollo (ambos servicios)
pnpm dev

# Build
pnpm build

# Tests
pnpm test
```

### Swagger API Documentation / Documentación API

**English**
The interactive API documentation is available at:

```
http://localhost:3000/api/docs
```

**Features:**
- Interactive documentation (Swagger UI)
- Test endpoints directly from browser
- Auto-generated from JSDoc annotations
- Bilingual documentation (Spanish/English)

---
**Español**
La documentación interactiva de la API está disponible en:

```
http://localhost:3000/api/docs
```

**Características:**
- Documentación interactiva (Swagger UI)
- Pruebas de endpoints directamente desde el navegador
- Generación automática desde anotaciones JSDoc
- Documentación bilingüe (español/inglés)

### API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | /auth/register | Registrar usuario |
| POST | /auth/login | Iniciar sesión |
| POST | /auth/refresh | Refrescar token |
| POST | /auth/logout | Cerrar sesión |
| GET | /pacientes | Listar pacientes |
| POST | /pacientes | Crear paciente |
| GET | /pacientes/:id | Obtener paciente |
| PUT | /pacientes/:id | Actualizar paciente |
| DELETE | /pacientes/:id | Eliminar paciente |
| GET | /historias | Listar historias |
| POST | /historias | Crear historia |

### Contribución

1. Fork el repositorio
2. Crear rama feature (`git checkout -b feature/Nombre`)
3. Commit cambios (`git commit -m 'feat: descripcion'`)
4. Push a rama (`git push origin feature/Nombre`)
5. Crear Pull Request

---

## English

### Description

**ERP-Psicologia** is an Enterprise Resource Planning (ERP) system designed specifically for psychology and psychiatry clinics. It provides a comprehensive solution for managing patients, clinical records, appointments, and administrative tasks.

### Key Features

| Module | Description |
|--------|-------------|
| **Auth + RBAC** | JWT authentication with role-based access control |
| **Patients** | Complete patient management with personal and contact data |
| **Clinical Records** | Clinical history management with templates |
| **Appointments** | Scheduling and calendar system (coming soon) |
| **Reports** | Report generation and statistics (coming soon) |

### User Roles

| Role | Description |
|------|-------------|
| `ADMIN` | Full system access |
| `PSICOLOGO` | Psychology professional |
| `PSIQUIATRA` | Psychiatry professional |
| `SECRETARIO` | Administrative staff |
| `USER` | Basic user |

### Tech Stack

- **Frontend**: React 19 + Vite + Tailwind CSS + Zustand
- **Backend**: NestJS + Sequelize + PostgreSQL
- **Monorepo**: pnpm workspaces
- **Auth**: JWT with refresh tokens

### Project Structure

```
erp-psicologia/
├── apps/
│   ├── backend/          # NestJS API
│   └── frontend/         # React Application
├── packages/
│   └── shared/           # Shared types and enums
├── .atl/                 # SDD artifacts
└── pnpm-workspace.yaml
```

### Installation

```bash
# Install dependencies
pnpm install

# Development (both services)
pnpm dev

# Build
pnpm build

# Tests
pnpm test
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/register | Register user |
| POST | /auth/login | Login |
| POST | /auth/refresh | Refresh token |
| POST | /auth/logout | Logout |
| GET | /pacientes | List patients |
| POST | /pacientes | Create patient |
| GET | /pacientes/:id | Get patient |
| PUT | /pacientes/:id | Update patient |
| DELETE | /pacientes/:id | Delete patient |
| GET | /historias | List clinical records |
| POST | /historias | Create clinical record |

### Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/Name`)
3. Commit changes (`git commit -m 'feat: description'`)
4. Push to branch (`git push origin feature/Name`)
5. Create Pull Request

---

## Licencia / License

MIT License - ver [LICENSE](LICENSE) para detalles / see [LICENSE](LICENSE) for details.