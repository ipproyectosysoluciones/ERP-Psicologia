# Design: Módulo Pacientes

** CHANGE **: Módulo Pacientes
** MODE **: engram-mode
** PROJECT **: ERP-Psicologia

---

## Architecture

### Stack
- **Backend**: NestJS + Sequelize (PostgreSQL)
- **Frontend**: React 19 + Zustand
- **Auth**: JWT existente

### Module Structure

```
apps/backend/src/modules/pacientes/
├── pacientes.module.ts      (exists - stub)
├── pacientes.controller.ts (NEW)
├── pacientes.service.ts   (NEW)
├── dto/
│   ├── create-paciente.dto.ts
│   └── update-paciente.dto.ts
└── entities/
    └── paciente.entity.ts   (NEW - extiende modelo existente)

apps/frontend/src/
├── pages/
│   ├── PacientesPage.tsx    (NEW)
│   └── PacienteFormPage.tsx  (NEW)
├── components/
│   └── paciente/
│       ├── PacienteList.tsx
│       └── PacienteForm.tsx
└── api/
    └── pacientes.ts         (NEW - cliente API)
```

---

## Decisions

| # | Decision | Rationale | Alternatives |
|---|----------|---------|-------------|
| D1 | Usar modelo Paciente existente de historias como base | Evita duplicar entidad | Crear modelo nuevo — rejected: DRY |
| D2 | Extender modelo con campos nuevos en pacientes.entity.ts | No modificar modelo de historias directamente | Directly modify — rejected: tight coupling |
| D3 | Soft-delete para delete-paciente | Mantiene trazabilidad, no rompe foreign keys | Hard delete — rejected: pierde datos |
| D4 | Zustand para state management | Patrón existente en frontend | Redux — rejected: overkill |
| D5 | Componentes separados para lista y form | Reusabilidad, testabilidad | Todo en una página — rejected: violates SRP |

---

## Data Model

### Extended Paciente Entity

```typescript
interface Paciente {
  id: string;              // UUID
  dni: string;            // unique
  nombre: string;
  apellido?: string;
  fechaNac?: Date;
  contacto?: string;       // email o teléfono
  direccion?: string;
  obraSocial?: string;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Database

- Reutiliza tabla `pacientes` del modelo existente en historias
- Sequelize migrará automáticamente los campos nuevos

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /pacientes | Listar activos |
| GET | /pacientes/:id | Obtener por ID |
| POST | /pacientes | Crear |
| PUT | /pacientes/:id | Actualizar |
| DELETE | /pacientes/:id | Soft-delete |

---

## Security

- JWT auth en todos los endpoints
- Roles: PSICOLOGO, PSIQUIATRA, SECRETARIO, ADMIN (todos acceden)
- Uso de Decorators @Roles() existente

---

## Integration Points

- Dependencies: SequelizeModule forFeature([Paciente])
- El modelo Paciente ya está importado desde historias/models
- No hay circular dependencies

---

## Out of Scope

- Historias clínicas del paciente (futuro change)
- Export PDF/Excel de pacientes
- Búsqueda avanzada por nombre/dni
- Tests E2E (solo unitarios)