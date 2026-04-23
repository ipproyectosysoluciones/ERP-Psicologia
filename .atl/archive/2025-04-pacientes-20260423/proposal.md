# Proposal: Módulo Pacientes

** CHANGE **: Módulo Pacientes
** MODE **: engram-mode
** PROJECT **: ERP-Psicologia

---

## 📋 Proposal: Módulo Pacientes

### 1. Intent (WHY)

Construir el módulo de Pacientes completo para el ERP de clínicas de psicología/psiquiatría.

**Problema actual:**
- El módulo pacientes es solo un stub que reusa el modelo de historias
- No hay CRUD para gestionar pacientes
- El frontend no tiene interfaz para ver/crear/editar pacientes
- Falta información completa del paciente (falta apellido, contacto, dirección, obra social)

**Beneficio esperado:**
- Gestionar pacientes de forma independiente a las historias clínicas
- Interfaz frontend para listar, crear y editar pacientes
- Trazabilidad completa de datos del paciente

### 2. Scope (WHAT)

**Backend:**
- Extender el modelo Paciente con campos adicionales
- Crear PacientesController con endpoints REST
- Crear PacientesService con lógica de negocio
- DTOs para create y update

**Frontend:**
- Página de lista de pacientes
- Formulario para crear/editar paciente
- Routing `/pacientes`

**Roles que pueden acceder:**
- PSICOLOGO, PSIQUIATRA, SECRETARIO, ADMIN (todos los roles)

### 3. Capabilities

| # | Capability | Descripción |
|---|------------|--------------|
| 1 | list-pacientes | Listar todos los pacientes activos |
| 2 | get-paciente | Obtener un paciente por ID |
| 3 | create-paciente | Crear nuevo paciente |
| 4 | update-paciente | Actualizar datos de paciente |
| 5 | delete-paciente | Soft-delete (inactivar) paciente |
| 6 | frontend-list | Lista de pacientes en React |
| 7 | frontend-form | Formulario crear/editar |

### 4. Constraints

- No hard delete (usa soft delete con campo activo)
- DNI único por paciente
- Sincronización con historias clínicas (foreign key existente)
- Usar JWT auth existente

### 5. Success Criteria

- [ ] Endpoints REST funcionales
- [ ] Frontend lista pacientes renderiza correctamente
- [ ] Frontend formulario crear/edita paciente
- [ ] Tests unitarios para service
- [ ] RBAC aplicado (todos los roles pueden acceder)