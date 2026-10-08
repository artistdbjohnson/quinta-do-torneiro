/** NOAA solar calculator for sunset, evaluated in Europe/Lisbon. */
const LAT = 38.6996;
const LNG = -9.2953;
const RAD = Math.PI / 180;
const DEG = 180 / Math.PI;

function norm(n: number, mod: number) {
  return ((n % mod) + mod) % mod;
}

/** Sunset as a UTC Date on the Europe/Lisbon calendar day of `now`. */
export function sunsetUtc(now = new Date()): Date | null {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Lisbon",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const year = Number(parts.find((p) => p.type === "year")?.value);
  const month = Number(parts.find((p) => p.type === "month")?.value);
  const day = Number(parts.find((p) => p.type === "day")?.value);

  const n1 = Math.floor((275 * month) / 9);
  const n2 = Math.floor((month + 9) / 12);
  const n3 = 1 + Math.floor((year - 4 * Math.floor(year / 4) + 2) / 3);
  const n = n1 - n2 * n3 + day - 30;
  const lngHour = LNG / 15;
  const t = n + (18 - lngHour) / 24;
  const m = 0.9856 * t - 3.289;
  let l = m + 1.916 * Math.sin(m * RAD) + 0.02 * Math.sin(2 * m * RAD) + 282.634;
  l = norm(l, 360);
  let ra = DEG * Math.atan(0.91764 * Math.tan(l * RAD));
  ra = norm(ra, 360);
  const lq = Math.floor(l / 90) * 90;
  const rq = Math.floor(ra / 90) * 90;
  ra = (ra + (lq - rq)) / 15;
  const sinDec = 0.39782 * Math.sin(l * RAD);
  const cosDec = Math.cos(Math.asin(sinDec));
  const cosH =
    (Math.cos(90.833 * RAD) - sinDec * Math.sin(LAT * RAD)) / (cosDec * Math.cos(LAT * RAD));
  if (cosH > 1 || cosH < -1) return null;
  const h = DEG * Math.acos(cosH) / 15;
  const tt = h + ra - 0.06571 * t - 6.622;
  const ut = norm(tt - lngHour, 24);
  const hours = Math.floor(ut);
  const minutes = Math.round((ut - hours) * 60);
  const base = new Date(Date.UTC(year, month - 1, day, hours, 0, 0));
  base.setUTCMinutes(minutes);
  return base;
}

export function formatSunset(date: Date, lang: "pt" | "en"): string {
  if (lang === "pt") {
    const hm = new Intl.DateTimeFormat("pt-PT", {
      timeZone: "Europe/Lisbon",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).format(date);
    return `Pôr do sol hoje · ${hm}`;
  }
  const hm = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Lisbon",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
  return `Sunset today · ${hm.toLowerCase()}`;
}
