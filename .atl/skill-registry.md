# Skill Registry — ERP-Psicologia

Generated: 2026-04-16
Stack: React 19 + Vite | NestJS + Express | PostgreSQL + Sequelize | Tailwind 4 + shadcn/ui

## Compact Rules

### react-19
- No useMemo/useCallback needed (React Compiler)
- Use `use()` for promises, Server Components where applicable

### tailwind-4
- Use cn() for conditional classes
- Theme variables via CSS, no var() in className

### typescript
- Strict mode always
- Prefer interfaces for objects, type for unions
- No `any` — use `unknown` + type guards

### nextjs-15 → N/A (using Vite, not Next.js)

### shadcn-ui
- Install components via CLI: `npx shadcn-ui@latest add <component>`
- Customize in components/ui/

### database-schema-design
- PostgreSQL with Sequelize ORM
- Use migrations, not sync
- Index foreign keys

### api-design-principles
- RESTful with NestJS controllers
- JWT auth, RBAC middleware
- Consistent error responses

## User Skills (by trigger)

| Trigger | Skill |
|---------|-------|
| React components | react-19 |
| Tailwind styling | tailwind-4 |
| TypeScript code | typescript |
| shadcn/ui components | shadcn-ui |
| Database design | database-schema-design |
| API endpoints | api-design-principles |
| Playwright tests | playwright-best-practices |
| Vitest tests | vitest |

## Project Conventions

- No project-level convention files detected (greenfield)
- Agent-level: ~/.config/opencode/AGENTS.md (Rioplatense Spanish, Senior Architect persona)
