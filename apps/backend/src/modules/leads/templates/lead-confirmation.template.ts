export function leadConfirmationTemplate(data: {
  nombre: string;
  email: string;
  origen?: string;
  campaign?: string;
}): { subject: string; html: string; text: string } {
  const { nombre, email, origen, campaign } = data;

  const text = `
¡Hola ${nombre}!

Gracias por contactarnos. Hemos recibido tu información y un profesional de nuestro equipo se comunicará con vos a la brevedad.

Datos recibidos:
- Nombre: ${nombre}
- Email: ${email}
${origen ? `- Origen: ${origen}` : ''}
${campaign ? `- Campaña: ${campaign}` : ''}

Si necesitás ayuda inmediata:
- Teléfono: [AGREGAR]
- Horarios: Lunes a Viernes 9:00 - 18:00

Saludos,
Clínica de Psicología
  `.trim();

  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmación de contacto</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 32px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">
                🧠 Clínica de Psicología
              </h1>
              <p style="color: #e0e7ff; margin: 8px 0 0; font-size: 14px;">
                Tu bienestar es nuestra prioridad
              </p>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px 32px;">
              <h2 style="color: #1e293b; margin: 0 0 24px; font-size: 20px;">
                ¡Gracias por contactarnos, ${nombre}! 🎉
              </h2>
              
              <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                Hemos recibido tu información exitosamente. Un profesional de nuestro equipo se pondrá en contacto con vos a la brevedad.
              </p>
              
              <!-- Info Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border-radius: 8px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 8px; color: #64748b; font-size: 14px;">
                      <strong>Resumen:</strong>
                    </p>
                    <p style="margin: 4px 0; color: #334155; font-size: 14px;">
                      <strong>Nombre:</strong> ${nombre}
                    </p>
                    <p style="margin: 4px 0; color: #334155; font-size: 14px;">
                      <strong>Email:</strong> ${email}
                    </p>
                    ${origen ? `<p style="margin: 4px 0; color: #334155; font-size: 14px;"><strong>Origen:</strong> ${origen}</p>` : ''}
                    ${campaign ? `<p style="margin: 4px 0; color: #334155; font-size: 14px;"><strong>Campaña:</strong> ${campaign}</p>` : ''}
                  </td>
                </tr>
              </table>
              
              <!-- CTA -->
              <div style="text-align: center; margin: 32px 0;">
                <p style="color: #475569; font-size: 14px; margin: 0 0 16px;">
                  ¿Necesitás ayuda inmediata?
                </p>
                <a href="tel:+5491112345678" style="display: inline-block; background-color: #4f46e5; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                  📞 Llamanos ahora
                </a>
              </div>
              
              <p style="color: #64748b; font-size: 13px; line-height: 1.6; margin: 24px 0 0;">
                <strong>Horarios de atención:</strong><br>
                Lunes a Viernes: 9:00 - 18:00<br>
                Sábados: 9:00 - 13:00 (solo citas programadas)
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f1f5f9; padding: 24px 32px; text-align: center;">
              <p style="color: #64748b; font-size: 12px; margin: 0;">
                Este mensaje fue enviado automáticamente. No respondas a este email.<br>
                <strong>Clínica de Psicología</strong> — [Dirección] — [Teléfono]
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  return { subject: '¡Gracias por contactarnos!', html, text };
}