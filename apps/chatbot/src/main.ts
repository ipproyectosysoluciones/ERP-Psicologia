import 'dotenv/config';
import { createBot, createFlow, createProvider, MemoryDB } from '@builderbot/bot';
import { BaileysProvider } from '@builderbot/provider-baileys';

import { welcomeFlow } from './flows/welcome.flow.js';
import { schedulingFlow } from './flows/scheduling.flow.js';
import { infoFlow } from './flows/info.flow.js';
import { humanFlow } from './flows/human.flow.js';

const PORT = parseInt(process.env.PORT || '3001', 10);

const main = async (): Promise<void> => {
  // Use MemoryDB for now (switch to PostgreSQLAdapter in production)
  const adapterDB = new MemoryDB();

  // Initialize Provider (Baileys with optimization)
  const adapterProvider = createProvider(BaileysProvider, {
    usePairingCode: true,
    phoneNumber: process.env.PHONE_NUMBER || '',
    experimentalStore: true,
    timeRelease: 10800000,
  });

  // Create Flows
  const adapterFlow = createFlow([
    welcomeFlow,
    schedulingFlow,
    infoFlow,
    humanFlow,
  ]);

  // Create and start Bot
  const { httpServer } = await createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  httpServer(PORT);

  console.log(`
╔═══════════════════════════════════════════════════════════╗
║          🤖 ChatBot ERP-Psicologia Started               ║
╠═══════════════════════════════════════════════════════════╣
║  📱 WhatsApp Bot running on port: ${PORT}                  ║
║  🗄️  Database: PostgreSQL                                  ║
║  🤖 AI: OpenAI Agents ready                                ║
║                                                           ║
║  📋 Endpoints:                                            ║
║  - Bot API: http://localhost:${PORT}                        ║
║  - QR Code: Use pairing code to connect                   ║
╚═══════════════════════════════════════════════════════════╝
  `);
};

main().catch((error) => {
  console.error('❌ Error starting ChatBot:', error);
  process.exit(1);
});