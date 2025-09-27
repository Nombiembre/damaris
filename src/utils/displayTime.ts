interface Options {
  day?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  year?: 'numeric' | '2-digit';
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: 'numeric' | '2-digit';
  hour12?: boolean; // Controla si el formato es de 12 o 24 horas
}


const displayDate = (date: Date, options?: Options, zone?: 'America/Bogota') => {
  return new Intl.DateTimeFormat('es-ES', { timeZone: zone || 'UTC', ...options }).format(date);
}

export default displayDate;
