# SPEC: get-paciente

** CAPABILITY **: get-paciente
** CHANGE **: Módulo Pacientes
** PRIORITY **: P0
** MODE **: engram-mode

---

## Specification: Obtener Paciente por ID

### 1. Requirement

El sistema debe permitir obtener los datos de un paciente específico por su ID.

### 2. Scenarios

| ID | Scenario | Given | When | Then |
|----|----------|-------|------|------|
| S1 | Paciente existe | paciente con id=123 existe en DB | usuario llama GET /pacientes/123 | retorna datos del paciente |
| S2 | Paciente no existe | no existe paciente con id=999 | usuario llama GET /pacientes/999 | retorna 404 Not Found |

### 3. Response

```json
{
  "id": "uuid",
  "dni": "string",
  "nombre": "string",
  "apellido": "string",
  "fechaNac": "date optional",
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

- ID inexistente → 404
- ID inválido (formato) → 400

---

## Verification

| S1 | COMPLIANT | Verificar paciente_retornado.id === id_solicitado |
| S2 | COMPLIANT | Verificar status === 404 |