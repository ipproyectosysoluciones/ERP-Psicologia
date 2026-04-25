# Changelog / Registro de Cambios

Todos los cambios notables de este proyecto se documentarán en este archivo.

---

## [1.1.0] - 2025-04-25

### Cambios / Changes
- Security: Resueltas 9 vulnerabilidades npm con pnpm overrides
- Tests: Agregados unit tests para Leads y Citas módulos
- Documentation: Swagger/JSDoc bilingüe completado

### Issues
- Closes #4: Vulnerabilidades de seguridad
- Closes #5, #6: Documentación Swagger
- Closes #7: Tests unitarios

---

## [1.0.0] - 2025-04-24

### Cambios / Changes
- Historias Clínicas frontend completo
- Leads módulo full stack
- Landing page con LeadForm widget
- ChatBot fixes + ERP integración
- n8n workflows para automatización

### Módulos completos
- Backend: Auth, Pacientes, Citas, Leads, Historias
- Frontend: Dashboard, Pacientes, Citas, Leads, Historias, Landing
- ChatBot: BuilderBot flows

### Convenciones

Los cambios se documentan siguiendo [Semantic Versioning](https://semver.org/lang/es/) (MAJOR.MINOR.PATCH):

- **MAJOR**: Cambios incompatibles en la API
- **MINOR**: Nueva funcionalidad compatible con versiones anteriores
- **PATCH**: Correcciones de errores compatibles

### Formato de entradas

```markdown
## [Version] - YYYY-MM-DD

### Cambios
- Descripción del cambio

### Deprecaciones
- Funcionalidad obsoleta

### Correcciones
- Bug fixes
```

---

## English

### Conventions

Changes are documented following [Semantic Versioning](https://semver.org/):

- **MAJOR**: Incompatible API changes
- **MINOR**: New backward-compatible functionality
- **PATCH**: Backward-compatible bug fixes

### Entry Format

```markdown
## [Version] - YYYY-MM-DD

### Changes
- Change description

### Deprecations
- Deprecated functionality

### Fixes
- Bug fixes
```

---

## [0.1.0] - 2025-04-23

### Added / Agregado
- **Auth + RBAC Module**
  - User registration (`POST /auth/register`)
  - Login with JWT (`POST /auth/login`)
  - Token refresh (`POST /auth/refresh`)
  - Logout with token blacklist (`POST /auth/logout`)
  - Role-based access control (ADMIN, PSICOLOGO, PSIQUIATRA, SECRETARIO, USER)

- **Pacientes Module**
  - Full CRUD for patient management
  - Patient model with: DNI, nombre, apellido, fechaNac, contacto, direccion, obraSocial
  - Soft-delete support
  - Frontend: PacientesPage, PacienteFormPage, PacienteList, PacienteForm

- **Historias Clínicas Module**
  - Clinical records management
  - Templates support (ANAMNESIS, EVOLUCION, CIERRE, LIBRE)
  - Professional-patient relationship
  - JSON content storage

- **Project Documentation**
  - Bilingual README (ES/EN)
  - Architecture documentation
  - SDD workflow artifacts

### Changed / Cambiado
- Project structure updated to pnpm workspaces monorepo
- UUID package updated to fix vulnerability

### Fixed / Corregido
- Build configuration (tsconfig rootDir)
- Frontend import paths fixed
- Test configuration for localStorage mock

---

## [0.0.1] - 2025-04-16

### Added / Agregado
- Initial project scaffolding
- Monorepo setup with pnpm workspaces
- Backend: NestJS + Sequelize + PostgreSQL
- Frontend: React 19 + Vite + Tailwind CSS + Zustand
- Shared types and enums package
- Health check endpoint

---

## Formas de contribución / Ways to Contribute

Ver [CONTRIBUTING.md](CONTRIBUTING.md) para detalles.

---

## Históricas versiones / Historical Versions

Las versiones anteriores se pueden encontrar en [GitHub Releases](https://github.com/ipproyectosysoluciones/ERP-Psicologia/releases).