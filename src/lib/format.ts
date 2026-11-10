const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function parse(isoDate: string): Date {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

/** "2025-04-12" -> "Sat 12 Apr" */
export function dayLabel(isoDate: string): string {
  const d = parse(isoDate);
  return `${DAYS[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;
}

/** "2025-04-11", "2025-04-13" -> "Fri 11 – Sun 13 Apr 2025" */
export function stayRange(checkIn: string, checkOut: string): string {
  const a = parse(checkIn);
  const b = parse(checkOut);
  const sameMonth = a.getUTCMonth() === b.getUTCMonth();
  const start = sameMonth
    ? `${DAYS[a.getUTCDay()]} ${a.getUTCDate()}`
    : `${DAYS[a.getUTCDay()]} ${a.getUTCDate()} ${MONTHS[a.getUTCMonth()]}`;
  return `${start} – ${dayLabel(checkOut)} ${b.getUTCFullYear()}`;
}

export function hours(h: number): string {
  return `${h} ${h === 1 ? "hour" : "hours"}`;
}
