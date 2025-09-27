import { sql } from "../lib/neon";


const sendToGoogleSheets = async (message: string) => {


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



    try {
      await sql`
        INSERT INTO signals (message, date, hour)
        VALUES (${message}, ${onlyDate}, ${hour})
      `;
      console.log(
        `[LOG SUCCESS] Registro guardado -> Date: ${onlyDate}, Hour: ${hour}`
      );
    } catch (error) {
      console.error("[LOG ERROR] No se pudo insertar en logs:", error);
    }
};

export default sendToGoogleSheets;
