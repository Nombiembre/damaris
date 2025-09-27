import type { APIRoute } from 'astro';
import { Resend } from 'resend';
const resend = new Resend(import.meta.env.RESEND_APIKEY);

const emailSource = 'horizons@nombiembre.dev'; // Replace with your email and domain
const emailDestination = 'emanuelt.marin9@gmail.com'; // Where you want to send the email

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { messageValue } = body;

  const send = await resend.emails.send({
    from: emailSource,
    to: emailDestination,
    subject: '📡 Incoming Transmission - Signal Home',
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #ddd; background: #080c1a; padding: 20px; border-radius: 8px; max-width: 800px; margin: 0 auto; border: 1px solid #333;">
      <h1 style="color: #6dd5fa; text-align: center;">📡 Incoming Transmission</h1>
      <p style="font-size: 16px; text-align: center; color: #bbb;">
        Una nueva señal ha sido enviada a través del espacio. A continuación, el mensaje recibido:
      </p>
      <div style="background: #11172d; padding: 15px; border-radius: 6px; border-left: 4px solid #6dd5fa;">
        <p style="font-size: 16px; color: #eee;">
          <strong>📜 Mensaje:</strong>
          <br>
          ${messageValue}
        </p>
      </div>
      <p style="font-size: 14px; color: #888; text-align: center; margin-top: 20px;">
        📡 La señal ha sido captada.
      </p>
    </div>
    <footer style="text-align: center; margin-top: 20px; font-size: 12px; color: #666;">
      <p>🌌 Signal Home - Transmissions Across the Stars</p>
    </footer>
    `,
    text: `🚀 Incoming Transmission\nMessage: ${messageValue}`,
  });

  if (send.data) {
    console.log("Mail send")
    return new Response(
      JSON.stringify({
        message: send.data,
      }),
      {
        status: 200,
        statusText: 'OK',
      }
    );
  } else {
    console.log("Mail not send")
    return new Response(
      JSON.stringify({
        message: send.error,
      }),
      {
        status: 500,
        statusText: 'Internal Server Error',
      }
    );
  }
};
