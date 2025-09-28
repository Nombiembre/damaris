import type { AstroGlobal } from "astro";
import displayDate from "./displayTime";
import { sql } from "../lib/neon";

const getClientIp = (request: Request): string | null => {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded
    ? forwarded.split(",")[0]
    : request.headers.get("cf-connecting-ip") ||
        request.headers.get("x-real-ip") ||
        null;
};

const getLookUp = async (Astro: AstroGlobal) => {
  let clientIp = getClientIp(Astro.request) as string;
  const userAgent = Astro.request.headers.get("user-agent") ?? "Unknown";
  const pathname = Astro.url.pathname;

  // Fecha en formato DATE (solo día, mes, año)
  const date = new Date();
  const onlyDate = date.toISOString().split("T")[0]; // yyyy-mm-dd

  // Nueva variable para la hora con AM/PM
  const hour = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "America/Bogota",
  });

  const localip = import.meta.env.OWNIP;

  if (clientIp !== null && clientIp !== localip) {
    try {
      await sql`
        INSERT INTO logs (ip, path, agent, date, hour)
        VALUES (${clientIp}, ${pathname}, ${userAgent}, ${onlyDate}, ${hour})
      `;
      console.log(
        `[LOG SUCCESS] Registro guardado -> IP: ${clientIp}, Path: ${pathname}, Date: ${onlyDate}, Hour: ${hour}`
      );
    } catch (error) {
      console.error("[LOG ERROR] No se pudo insertar en logs:", error);
    }
  }
};

export default getLookUp;
