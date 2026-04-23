# Contributing / Contribución

¡Gracias por tu interés en contribuir a ERP-Psicologia! Este documento te ayudará a comenzar.

---

## Español

### Código de Conducta

Al participar en este proyecto, te comprometes a mantener un ambiente respetuoso e inclusivo. Sea amable, servicial y constructivo.

### ¿Cómo contribuir?

#### 1. Reportar Bugs

Si encontraste un bug, por favor crea un [issue](https://github.com/ipproyectosysoluciones/ERP-Psicologia/issues) incluyendo:

- Descripción clara del problema
- Pasos para reproducir
- Comportamiento esperado vs actual
- Screenshots si aplica
- Entorno (Node version, SO, etc.)

#### 2. Sugerir Features

Para sugerir nuevas features:

- Busca si ya existe la idea en issues
- Crea un issue con标签 `enhancement`
- Explica el caso de uso y por qué sería útil
- Considera si es algo que debería estar en el core o como plugin

#### 3. Pull Requests

**Pasos para crear un PR:**

```bash
# 1. Fork el repositorio
# 2. Clona tu fork
git clone https://github.com/TU-USUARIO/ERP-Psicologia.git

# 3. Crea una rama
git checkout -b feature/nombre-feature
# o
git checkout -b fix/descripcion-bug

# 4. Haz tus cambios
# 5. Commit con mensaje convencional
git commit -m 'feat: agregar nueva feature'

# 6. Push a tu fork
git push origin feature/nombre-feature

# 7. Crea PR en GitHub
```

**Conventional Commits:**

```
feat:     Nueva feature
fix:      Bug fix
docs:     Documentación
style:    Formateo (sin cambio de lógica)
refactor: Refactorización de código
test:     Tests
chore:    Mantenimiento
```

**Requisitos del PR:**

- [ ] Tests pasando
- [ ] Build sin errores
- [ ] Código sigue las convenciones del proyecto
- [ ] Documentación actualizada si es necesario

#### 4. Estándares de Código

- **TypeScript**: Modo estricto, tipos explícitos
- **Naming**: camelCase para variables, PascalCase para componentes
- **Frontend**: Componentes funcionales con hooks
- **Backend**: Service/Controller pattern de NestJS

---

## English

### Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment. Be kind, helpful, and constructive.

### How to Contribute?

#### 1. Reporting Bugs

If you found a bug, please create an [issue](https://github.com/ipproyectosysoluciones/ERP-Psicologia/issues) including:

- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment (Node version, OS, etc.)

#### 2. Suggesting Features

To suggest new features:

- Search if the idea already exists in issues
- Create an issue with label `enhancement`
- Explain the use case and why it would be useful
- Consider if it should be in core or as a plugin

#### 3. Pull Requests

**Steps to create a PR:**

```bash
# 1. Fork the repository
# 2. Clone your fork
git clone https://github.com/YOUR-USERNAME/ERP-Psicologia.git

# 3. Create a branch
git checkout -b feature/feature-name
# or
git checkout -v fix/bug-description

# 4. Make your changes
# 5. Commit with conventional message
git commit -m 'feat: add new feature'

# 6. Push to your fork
git push origin feature/feature-name

# 7. Create PR on GitHub
```

**Conventional Commits:**

```
feat:     New feature
fix:      Bug fix
docs:     Documentation
style:    Formatting (no logic change)
refactor: Code refactoring
test:     Tests
chore:    Maintenance
```

**PR Requirements:**

- [ ] Tests passing
- [ ] Build without errors
- [ ] Code follows project conventions
- [ ] Documentation updated if necessary

#### 4. Code Standards

- **TypeScript**: Strict mode, explicit types
- **Naming**: camelCase for variables, PascalCase for components
- **Frontend**: Functional components with hooks
- **Backend**: NestJS Service/Controller pattern

---

## Development Setup / Configuración de Desarrollo

```bash
# Install dependencies
pnpm install

# Development (both services)
pnpm dev

# Backend only
pnpm --filter backend dev

# Frontend only
pnpm --filter frontend dev

# Build
pnpm build

# Tests
pnpm test
```

---

## Preguntas? / Questions?

- Abre un issue para讨论
- Revisa la documentación en [docs/](docs/)
- Consulta el [README.md](README.md)