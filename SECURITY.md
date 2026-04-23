# Security / Seguridad

---

## Español

### Políticas de Seguridad

En ERP-Psicologia, nos tomamos la seguridad seriamente. Si descubres una vulnerabilidad de seguridad, por favor repórtala de manera responsable.

### ¿Cómo reportar?

1. **NO** crees un issue público
2. Envía un email al equipo de desarrollo
3. Incluye:
   - Descripción de la vulnerabilidad
   - Pasos para reproducir
   - Impacto potencial
   - Información de contacto

### Dependencias

- Mantenemos las dependencias actualizadas
- Usamos `pnpm audit` regularmente
- Revisamos alertas de GitHub Dependabot

### Buenas prácticas implementadas

- Contraseñas hasheadas con bcrypt
- Tokens JWT con expiración
- Blacklist de tokens en logout
- Validación de datos con class-validator
- SQL injection prevención via Sequelize

---

## English

### Security Policy

At ERP-Psicologia, we take security seriously. If you discover a security vulnerability, please report it responsibly.

### How to Report

1. **DO NOT** create a public issue
2. Email the development team
3. Include:
   - Vulnerability description
   - Steps to reproduce
   - Potential impact
   - Contact information

### Dependencies

- We keep dependencies updated
- Regular `pnpm audit` checks
- GitHub Dependabot alerts reviewed

### Implemented Best Practices

- Passwords hashed with bcrypt
- JWT tokens with expiration
- Token blacklist on logout
- Data validation with class-validator
- SQL injection prevention via Sequelize

---

## Supported Versions / Versiones Soportadas

| Versión | Soportada |
|---------|-----------|
| 0.1.x   | ✅        |
| 0.0.x   | ❌ Fin de vida |

---

## Vulnerabilidades conocidas / Known Vulnerabilities

Revisa nuestro [Security Advisories](https://github.com/ipproyectosysoluciones/ERP-Psicologia/security/advisories) en GitHub.

---

## Créditos / Credits

Gracias a los siguientes recursos que nos ayudaron a mejorar la seguridad:

- [OWASP](https://owasp.org/) - Security guidelines
- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit) - Dependency scanning
- [GitHub Dependabot](https://github.com/dependabot) - Automated updates