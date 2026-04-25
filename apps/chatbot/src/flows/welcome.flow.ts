import { addKeyword, EVENTS } from '@builderbot/bot';
import type { BaileysProvider } from '@builderbot/provider-baileys';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BotContext = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BotState = any;

export const welcomeFlow = addKeyword<BaileysProvider>(EVENTS.WELCOME)
  .addAnswer(
    `👋 *¡Bienvenido a la Clínica de Psicología!*

Soy el asistente virtual de nuestra clínica. Estoy aquí para ayudarte.

¿Con qué puedo ayudarte hoy?

1️⃣ *Agendar* una cita
2️⃣ Información sobre nuestros servicios
3️⃣ Hablar con un profesional
4️⃣ Consultar mis citas

Escribe el número o la opción que necesites.`
  )
  .addAction(
    async (ctx: BotContext, { state }: { state: BotState }) => {
      const phone = ctx?.key?.remoteJid ?? '';
      const name = ctx?.pushName ?? 'Paciente';
      
      await state.update({ 
        phone, 
        name,
        step: 'welcome',
      });
    }
  );
