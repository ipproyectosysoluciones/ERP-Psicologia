import { addKeyword } from '@builderbot/bot';
import type { BaileysProvider } from '@builderbot/provider-baileys';
import { ERPService } from '../services/erp.service.js';

const erpService = new ERPService(
  process.env.ERP_BASE_URL || 'http://localhost:3000',
  process.env.ERP_API_KEY || ''
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BotContext = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BotState = any;

export const schedulingFlow = addKeyword<BaileysProvider>(['agendar', '1', 'cita', 'turno'])
  .addAnswer(
    `📅 *Agendamiento de Citas*

Para agendar una cita, necesito algunos datos:

*¿Qué tipo de atención prefieres?*

1️⃣ *Presencial* - Ven a nuestra clínica
2️⃣ *Telemedicina* - Consulta por videollamada

Responde con el número de tu preferencia.`,
    { capture: true }
  )
  .addAction(
    async (ctx: BotContext, { state, flowDynamic }: { state: BotState; flowDynamic: (msg: unknown) => Promise<void> }) => {
      const choice = (ctx.body as string)?.toLowerCase() ?? '';
      const tipo = choice === '2' ? 'telemedicina' : 'presencial';
      
      await state.update({ tipo });
      
      await flowDynamic([
        { text: `✅ *Entendido!* \nTipo de atención: *${tipo === 'telemedicina' ? 'Telemedicina' : 'Presencial'}*\n\n*¿Para qué fecha deseas la cita?*\n\nPor favor, indica la fecha en formato: *YYYY-MM-DD*\n(Por ejemplo: 2025-04-28)` }
      ]);
    }
  )
  .addAction(
    { capture: true },
    async (ctx: BotContext, { state, flowDynamic }: { state: BotState; flowDynamic: (msg: unknown) => Promise<void> }) => {
      const fecha = ctx.body as string ?? '';
      
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(fecha)) {
        await flowDynamic([
          { text: `⚠️ *Formato incorrecto*\n\nPor favor, usa el formato: *YYYY-MM-DD*\nEjemplo: 2025-04-28` }
        ]);
        return;
      }

      await state.update({ fecha });
      
      await flowDynamic([
        { text: `📅 *Fecha:* ${fecha}\n\nAhora necesito saber *¿con qué profesional?*\n\nNuestros profesionales disponibles:\n1️⃣ Dr. Juan Pérez (Psicología)\n2️⃣ Dra. María García (Psiquiatría)\n3️⃣ No tengo preferencia\n\nResponde con el número.` }
      ]);
    }
  )
  .addAction(
    { capture: true },
    async (ctx: BotContext, { state, flowDynamic }: { state: BotState; flowDynamic: (msg: unknown) => Promise<void> }) => {
      const choice = ctx.body as string ?? '';
      const profesionalMap: Record<string, string> = {
        '1': 'profesional-uuid-1',
        '2': 'profesional-uuid-2',
      };
      
      const profesionalId = choice === '3' ? profesionalMap['1'] : (profesionalMap[choice] || profesionalMap['1']);
      const myState = state.getMyState() as BotState;
      const fecha = myState?.fecha ?? '';
      
      await state.update({ profesionalId });

      try {
        const disponibilidad = await erpService.getAvailability(profesionalId, fecha);
        
        const disponibles = disponibilidad.slots
          .filter((s: { disponible: boolean }) => s.disponible)
          .map((s: { hora: string }) => s.hora);

        if (disponibles.length === 0) {
          await flowDynamic([
            { text: `⚠️ *No hay horarios disponibles* para el ${fecha}.\n\n¿Deseas buscar otra fecha?` }
          ]);
          return;
        }

        const availableSlots = disponibles.slice(0, 5);
        await state.update({ disponibles: availableSlots });

        const opciones = availableSlots.map((h: string, i: number) => `${i + 1}️⃣ ${h}`).join('\n');
        
        await flowDynamic([
          { text: `🕐 *Horarios disponibles* para el ${fecha}:\n\n${opciones}\n\n*¿Qué horario prefieres?*\n(Responde con el número)` }
        ]);
      } catch {
        await flowDynamic([
          { text: `⚠️ *Error al obtener horarios*\n\nPor favor, intenta más tarde o llama a la clínica.` }
        ]);
      }
    }
  )
  .addAction(
    { capture: true },
    async (ctx: BotContext, { state, flowDynamic }: { state: BotState; flowDynamic: (msg: unknown) => Promise<void> }) => {
      const choice = parseInt(ctx.body as string ?? '0', 10) - 1;
      const myState = state.getMyState() as BotState;
      
      const disponibles = (myState?.disponibles as string[]) ?? [];
      const horaInicio = disponibles[choice];
      
      if (!horaInicio) {
        await flowDynamic([
          { text: `⚠️ *Opción inválida*\n\nPor favor, selecciona un horario de la lista.` }
        ]);
        return;
      }

      try {
        const pacienteId = 'paciente-uuid-from-phone';
        
        await erpService.createAppointment({
          pacienteId,
          profesionalId: (myState?.profesionalId as string) ?? '',
          fecha: (myState?.fecha as string) ?? '',
          horaInicio,
          motivo: 'Solicitado vía ChatBot',
          tipo: (myState?.tipo as 'presencial' | 'telemedicina') ?? 'presencial',
        });

        await flowDynamic([
          { text: `✅ *¡Cita Agendada!*\n\n📅 Fecha: ${myState?.fecha}\n🕐 Hora: ${horaInicio}\n🏥 Tipo: ${myState?.tipo === 'telemedicina' ? 'Telemedicina' : 'Presencial'}\n\n📱 *Recordatorio:* Recibirás un mensaje de confirmación.\n\n¿Hay algo más en lo que pueda ayudarte?` }
        ]);
        
        await state.update({ 
          citaConfirmada: true,
          fecha: myState?.fecha,
          hora: horaInicio,
        });
      } catch {
        await flowDynamic([
          { text: `⚠️ *Error al agendar*\n\nPor favor, contacta a la clínica directamente.\nDisculpa las molestias.` }
        ]);
      }
    }
  );
