import type { APIRoute } from 'astro';
import { Resend } from 'resend';
const resend = new Resend(import.meta.env.RESEND_APIKEY);

const emailSource = 'wifey@nombiembre.dev';
const emailDestination = 'etoro@unicoc.edu.co';

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { messageValue } = body;

  const send = await resend.emails.send({
    from: emailSource,
    to: emailDestination,
    subject: '📝 Daily Log - Echo Capsules',
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #ddd; background: #0b0f2a; padding: 20px; border-radius: 8px; max-width: 800px; margin: 0 auto; border: 1px solid #222;">
      <h2 style="color: #6dd5fa; text-align: center;">📖 New Log Entry</h2>
      <p style="font-size: 16px; text-align: center; color: #bbb;">
        Una nueva entrada ha sido registrada en el diario de abordo.
      </p>
      <div style="background: #151b3e; padding: 15px; border-radius: 6px; border-left: 4px solid #6dd5fa;">
        <p style="font-size: 16px; color: #eee;">
          <strong>Entrada:</strong>
          <br>
          ${messageValue}
        </p>
      </div>
      <p style="font-size: 14px; color: #888; text-align: center; margin-top: 20px;">
        ✍️ El registro ha sido archivado en el viaje a través de las estrellas.
      </p>
    </div>
    <footer style="text-align: center; margin-top: 20px; font-size: 12px; color: #666;">
      <p>🌌 Daily Logs</p>
    </footer>
    `,
    text: `📖 New Log Entry\nEntry: ${messageValue}`,
  });


  if (send.data) {
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
