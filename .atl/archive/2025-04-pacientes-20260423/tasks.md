# Tasks: Módulo Pacientes

** CHANGE **: Módulo Pacientes
** MODE **: engram-mode
** PROJECT **: ERP-Psicologia

---

## Task Breakdown

### Backend

- [ ] **T1**: Extender modelo Paciente
  - [ ] T1.1: Crear `entities/paciente.entity.ts` con campos adicionales
  - [ ] T1.2: Actualizar `pacientes.module.ts` para usar nuevo entity

- [ ] **T2**: Crear DTOs
  - [ ] T2.1: Crear `dto/create-paciente.dto.ts`
  - [ ] T2.2: Crear `dto/update-paciente.dto.ts`

- [ ] **T3**: Crear PacientesService
  - [ ] T3.1: Crear `pacientes.service.ts`
  - [ ] T3.2: Implementar método findAll()
  - [ ] T3.3: Implementar método findOne()
  - [ ] T3.4: Implementar método create()
  - [ ] T3.5: Implementar método update()
  - [ ] T3.6: Implementar método remove()

- [ ] **T4**: Crear PacientesController
  - [ ] T4.1: Crear `pacientes.controller.ts`
  - [ ] T4.2: Agregar endpoints REST
  - [ ] T4.3: Agregar @Roles() decorators

- [ ] **T5**: Registro en AppModule
  - [ ] T5.1: Importar PacientesModule en app.module.ts

- [ ] **T6**: Tests unitarios
  - [ ] T6.1: Crear `pacientes.service.spec.ts`
  - [ ] T6.2: Test findAll retorna solo activos
  - [ ] T6.3: Test create valida DNI único

### Frontend

- [ ] **F1**: Cliente API
  - [ ] F1.1: Crear `api/pacientes.ts`

- [ ] **F2**: Componentes UI
  - [ ] F2.1: Crear `components/paciente/PacienteList.tsx`
  - [ ] F2.2: Crear `components/paciente/PacienteForm.tsx`

- [ ] **F3**: Páginas
  - [ ] F3.1: Crear `pages/PacientesPage.tsx` (lista)
  - [ ] F3.2: Crear `pages/PacienteFormPage.tsx` (crear/editar)

- [ ] **F4**: Routing
  - [ ] F4.1: Agregar rutas en App.tsx

---

## Execution Order

```
Backend: T1 → T2 → T3 → T4 → T5 → T6
Frontend: F1 → F2 → F3 → F4
```

---

## Dependencies

- backend/users (User model como referencia)
- backend/auth (JWT, Roles)
- frontend/store (Zustand store existente)