# SPEC: create-paciente

** CAPABILITY **: create-paciente
** CHANGE **: Módulo Pacientes
** PRIORITY **: P0
** MODE **: engram-mode

---

## Specification: Crear Paciente

### 1. Requirement

El sistema debe permitir crear un nuevo paciente en el sistema.

### 2. Scenarios

| ID | Scenario | Given | When | Then |
|----|----------|-------|------|------|
| S1 | Creación exitosa | datos válidos, DNI único | usuario POST /pacientes con body válido | retorna 201 + paciente creado |
| S2 | DNI duplicado | DNI "12345678" ya existe | usuario POST /pacientes con DNI "12345678" | retorna 400 con error |
| S3 | Nombre vacío | campo nombre vacío | usuario POST /pacientes sin nombre | retorna 400 con error validación |

### 3. Request Body

```json
{
  "dni": "string required unique",
  "nombre": "string required",
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
  "activo": true,
  "createdAt": "timestamp"
}
```

### 5. Validation Rules

- DNI: requerido, único, máximo 20 caracteres
- nombre: requerido, máximo 100 caracteres
- apellido: opcional, máximo 100 caracteres
- fechaNac: opcional, debe ser fecha válida
- contacto: opcional, máximo 100 caracteres
- direccion: opcional, máximo 255 caracteres
- obraSocial: opcional, máximo 100 caracteres

### 6. Auth

- Required: JWT token válido
- Roles: PSICOLOGO, PSIQUIATRA, SECRETARIO, ADMIN

---

## Verification

| S1 | COMPLIANT | Verificar status === 201 && response.dni === dni_enviado |
| S2 | COMPLIANT | Verificar status === 400 && error.includes("DNI") |
| S3 | COMPLIANT | Verificar status === 400 && error.includes("nombre") |