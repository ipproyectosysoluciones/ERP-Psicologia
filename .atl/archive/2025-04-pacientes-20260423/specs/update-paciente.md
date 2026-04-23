# SPEC: update-paciente

** CAPABILITY **: update-paciente
** CHANGE **: Módulo Pacientes
** PRIORITY **: P0
** MODE **: engram-mode

---

## Specification: Actualizar Paciente

### 1. Requirement

El sistema debe permitir actualizar los datos de un paciente existente.

### 2. Scenarios

| ID | Scenario | Given | When | Then |
|----|----------|-------|------|------|
| S1 | Update exitoso | paciente existe | usuario PUT /pacientes/123 con datos válidos | retorna 200 + paciente actualizado |
| S2 | Paciente no existe | no existe paciente con id=999 | usuario PUT /pacientes/999 | retorna 404 Not Found |
| S3 | DNI duplicado | paciente A tiene DNI "12345678" | usuario POST/update con DNI "12345678" | retorna 400 con error |

### 3. Request Body

Todos los campos opcionales (solo actualizar los enviados):
```json
{
  "dni": "string optional unique",
  "nombre": "string optional",
  "apellido": "string optional",
  "fechaNac": "date optional",
  "contacto": "string optional",
  "direccion": "string optional",
  "obraSocial": "string optional"
}
```

### 4. Response

```json
{
  "id": "uuid",
  "dni": "string",
  "nombre": "string",
  "apellido": "string",
  "fechaNac": "date",
  "contacto": "string",
  "direccion": "string",
  "obraSocial": "string",
  "activo": true
}
```

### 5. Validation Rules

- Al menos un campo debe ser actualizado
- Las mismas reglas que create-paciente para cada campo
- El DNI no puede duplicarse con otro paciente

### 6. Auth

- Required: JWT token válido
- Roles: PSICOLOGO, PSIQUIATRA, SECRETARIO, ADMIN

---

## Verification

| S1 | COMPLIANT | Verificar status === 200 && response.nombre === nombre_enviado |
| S2 | COMPLIANT | Verificar status === 404 |
| S3 | COMPLIANT | Verificar status === 400 |