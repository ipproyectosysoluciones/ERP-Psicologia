# n8n Workflows - ERP-Psicologia

## Webhooks Disponibles

### Citas

| Webhook | URL | Descripción |
|--------|-----|-------------|
| `POST /webhook/citas-create` | `http://localhost:5678/webhook/citas-create` | Crea cita en Calendar + Sheets + email |
| `POST /webhook/chatbot-citas` | `http://localhost:5678/webhook/chatbot-citas` | Consulta citas desde ChatBot |

### Leads

| Webhook | URL | Descripción |
|--------|-----|-------------|
| `POST /webhook/lead-email` | `http://localhost:5678/webhook/lead-email` | Envía email de confirmación |
| `POST /webhook/chatbot-lead` | `http://localhost:5678/webhook/chatbot-lead` | Crea lead desde ChatBot |

### ChatBot → ERP Flows

```
[ChatBot] → /webhook/chatbot-lead → [ERP /api/leads] → [HubSpot] → [Response]
[ChatBot] → /webhook/chatbot-citas → [ERP /api/citas] → [Response]
```

## Setup en n8n

1. **Importar workflows**: Ir a n8n → Import → seleccionar archivo JSON
2. **Credentials**: Configurar Google Calendar y Google Sheets OAuth
3. **Activar**: Click en "Activate" en cada workflow
4. **URLs productivo**: Reemplazar localhost con URL de producción

## Variables de entorno (Backend)

```env
N8N_WEBHOOK_CITA_CREATE=http://n8n:5678/webhook/citas-create
N8N_WEBHOOK_LEAD_EMAIL=http://n8n:5678/webhook/lead-email
```

## Workflow: Citas Create

```
[Webhook] → [Google Calendar] → [Google Sheets] → [Email] → [Respond]
```

## Workflow: Leads Email

```
[Webhook] → [Send Email] → [Respond]
```