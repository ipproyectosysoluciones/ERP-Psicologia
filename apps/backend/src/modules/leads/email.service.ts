import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { leadConfirmationTemplate } from './templates/lead-confirmation.template';

@Injectable()
export class EmailService {
  private readonly n8nWebhookUrl: string;
  private readonly fromEmail: string;

  constructor(private config: ConfigService) {
    this.n8nWebhookUrl = this.config.get('N8N_WEBHOOK_EMAIL', '');
    this.fromEmail = this.config.get('EMAIL_FROM', 'noreply@clinica.com');
  }

  async sendLeadConfirmation(lead: {
    id: string;
    nombre: string;
    email: string;
    origen?: string;
    campaign?: string;
  }): Promise<void> {
    if (!this.n8nWebhookUrl) {
      console.warn('[EmailService] N8N_WEBHOOK_EMAIL not configured, skipping email');
      return;
    }

    const { subject, html, text } = leadConfirmationTemplate({
      nombre: lead.nombre,
      email: lead.email,
      origen: lead.origen,
      campaign: lead.campaign,
    });

    try {
      const response = await fetch(this.n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: lead.email,
          from: this.fromEmail,
          subject,
          html,
          text,
          leadId: lead.id,
        }),
      });

      if (!response.ok) {
        console.error('[EmailService] Failed to send email:', response.statusText);
      }
    } catch (error) {
      console.error('[EmailService] Error sending email:', error);
    }
  }
}