# SPEC: list-pacientes

** CAPABILITY **: list-pacientes
** CHANGE **: Módulo Pacientes
** PRIORITY **: P0
** MODE **: engram-mode

---

## Specification: Listar Pacientes

### 1. Requirement

El sistema debe permitir listar todos los pacientes activos en el sistema.

### 2. Scenarios

| ID | Scenario | Given | When | Then |
|----|----------|-------|------|------|
| S1 | Lista básica | existen 3 pacientes activos en DB | usuario llama GET /pacientes | retorna array con 3 pacientes |
| S2 | Lista vacía | no hay pacientes en DB | usuario llama GET /pacientes | retorna array vacío [] |
| S3 | Solo activos | existen 2 activos + 1 inactivo | usuario llama GET /pacientes | retorna solo los 2 activos |

### 3. Data Model

Response array item:
```json
{
  "id": "uuid",
  "dni": "string",
  "nombre": "string",
  "apellido": "string",
  "fechaNac": " date optional",
  "contacto": "string optional",
  "direccion": "string optional",
  "obraSocial": "string optional",
  "activo": "boolean"
}
```

### 4. Auth

- Required: JWT token válido
- Roles: PSICOLOGO, PSIQUIATRA, SECRETARIO, ADMIN

### 5. Edge Cases

- DB vacía → retornar []
- Error DB → 500 con mensaje genérico

---

## Verification

| S1 | COMPLIANT | Verificar array.length === 3 |
| S2 | COMPLIANT | Verificar array.length === 0 |
| S3 | COMPLIANT | Verificar todos activo === true |