import { addKeyword } from '@builderbot/bot';
import type { BaileysProvider } from '@builderbot/provider-baileys';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BotContext = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BotFlowDynamic = (msg: unknown) => Promise<void>;

export const infoFlow = addKeyword<BaileysProvider>(['información', '2', 'servicios', 'info'])
  .addAnswer(
    `📋 *Información de la Clínica*

*Nuestros Servicios:*

🧠 *Psicología Clínica*
- Evaluación psicológica
- Terapia individual
- Terapia de pareja y familia
- Intervención en crisis

💊 *Psiquiatría*
- Evaluación psiquiátrica
- Tratamiento farmacológico
- Seguimiento clínico
- Segunda opinión

*Horarios de Atención:*
Lunes a Viernes: 9:00 - 18:00
Sábados: 9:00 - 13:00 (solo citas programadas)

*¿Qué más te gustaría saber?*

1️⃣ Costos y cobertura
2️⃣ Ubicación
3️⃣ Agendar una cita
4️⃣ Hablar con un profesional
`,
    { capture: true }
  )
  .addAction(
    async (ctx: BotContext, { flowDynamic }: { flowDynamic: BotFlowDynamic }) => {
      const choice = ctx.body as string ?? '';
      
      switch (choice) {
        case '1':
          await flowDynamic([
            { text: `💰 *Costos*\n\n*Consulta Inicial:* $80\n*Consulta de Seguimiento:* $50\n*Evaluación Psicológica:* $150\n*Psiquiatría:* $100\n\n*Aceptamos:*\n✅ Efectivo\n✅ Tarjetas\n✅ Transferencia\n\n*Obras Sociales:*\n- OSDE, Swiss Medical, Galeno, IOMA, PAMI` }
          ]);
          break;
          
        case '2':
          await flowDynamic([
            { text: `📍 *Ubicación*\n\n*Dirección:* [Agregar dirección]\n\n*Cómo llegar:*\n- Colectivos: Líneas 25, 34, 45, 60\n- Subte: Línea A` }
          ]);
          break;
          
        case '3':
          await flowDynamic([
            { text: `Para agendar una cita, escribe *agendar* o *1*` }
          ]);
          break;
          
        case '4':
          await flowDynamic([
            { text: `👨‍⚕️ *Hablar con un Profesional*\n\nUn profesional te contactará en 15-30 minutos.\n\nSi es emergencia: 📞 Llama al [número]` }
          ]);
          break;
          
        default:
          await flowDynamic([
            { text: `¿En qué más puedo ayudarte?\n\nResponde con el número de la opción.` }
          ]);
      }
    }
  );
