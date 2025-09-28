// src/pages/api/sendLog.json.ts
import { sql } from '~/lib/neon'; // ajusta la ruta según tu proyecto

export async function POST({ request }: { request: Request }) {
  try {
    // IP robusta (intenta varias cabeceras comunes)
    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('cf-connecting-ip') ??
      request.headers.get('x-real-ip') ??
      'unknown';

    const userAgent = request.headers.get('user-agent') ?? 'Unknown';

    // body opcional enviado desde cliente (e.g. path)
    const body = await request.json().catch(() => ({}));
    let pathname = body.path ?? '/';

    // si no se envió path, intenta extraerlo desde referer
    if (!body.path && request.headers.get('referer')) {
      try {
        pathname = new URL(request.headers.get('referer')!).pathname;
      } catch (e) {
        // ignore
      }
    }

    const date = new Date();
    const onlyDate = date.toISOString().split('T')[0]; // yyyy-mm-dd
    const hour = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'America/Bogota',
    });

    // Inserción en DB
    await sql`
      INSERT INTO logs (ip, path, agent, date, hour)
      VALUES (${clientIp}, ${pathname}, ${userAgent}, ${onlyDate}, ${hour})
    `;

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[API sendLog] error:', error);
    return new Response(JSON.stringify({ success: false, error: String(error) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

