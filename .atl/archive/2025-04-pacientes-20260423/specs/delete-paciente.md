# SPEC: delete-paciente

** CAPABILITY **: delete-paciente
** CHANGE **: Módulo Pacientes
** PRIORITY **: P1
** MODE **: engram-mode

---

## Specification: Eliminar (Inactivar) Paciente

### 1. Requirement

El sistema debe permitir inactivar (soft-delete) un paciente del sistema.

### 2. Scenarios

| ID | Scenario | Given | When | Then |
|----|----------|-------|------|------|
| S1 | Inactivación exitosa | paciente con id=123 está activo | usuario DELETE /pacientes/123 | retorna 200, paciente.inactivo = true |
| S2 | Paciente no existe | no existe paciente con id=999 | usuario DELETE /pacientes/999 | retorna 404 Not Found |
| S3 | Ya inactivo | paciente ya está inactivo | usuario DELETE /pacientes/123 | retorna 200 (idempotente) |

### 3. Behavior

- Soft delete: cambia campo `activo` a `false`
- No elimina de la base de datos
- El paciente sigue existiendo pero no aparece en list-pacientes

### 4. Response

```json
{
  "id": "uuid",
  "activo": false
}
```

### 5. Auth

- Required: JWT token válido
- Roles: PSICOLOGO, PSIQUIATRA, SECRETARIO, ADMIN

---

## Verification

| S1 | COMPLIANT | Verificar status === 200 && response.activo === false |
| S2 | COMPLIANT | Verificar status === 404 |
| S3 | COMPLIANT | Verificar status === 200 |