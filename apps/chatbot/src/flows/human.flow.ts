import { addKeyword } from '@builderbot/bot';
import type { BaileysProvider } from '@builderbot/provider-baileys';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BotContext = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BotFlowDynamic = (msg: unknown) => Promise<void>;

export const humanFlow = addKeyword<BaileysProvider>(['hablar humano', '3', 'profesional', 'urgencia', 'emergencia'])
  .addAnswer(
    `👨‍⚕️ *Derivación a Profesional*

Entiendo que necesitas hablar con un profesional. Voy a derivarte.

*Tiempo estimado:* 15-30 minutos en horario de atención.

📞 *Si es emergencia:*
- Teléfono: [AGREGAR]
- Guardia 24hs: [AGREGAR]

Antes de derivarte, ¿podrías contarme brevemente de qué se trata?`,
    { capture: true }
  )
  .addAction(
    async (ctx: BotContext, { flowDynamic }: { flowDynamic: BotFlowDynamic }) => {
      const motivo = (ctx.body as string ?? '').substring(0, 100);
      
      await flowDynamic([
        { text: `✅ *Derivación Enviada*\n\nHe registrado tu solicitud. Un profesional te contactará pronto.\n\n📱 Mientras esperas, mantén tu teléfono cerca.\n\n¿Hay algo más en lo que pueda ayudarte?` }
      ]);
      
      console.log('Human handover requested:', {
        motivo,
        timestamp: new Date().toISOString(),
      });
    }
  );
