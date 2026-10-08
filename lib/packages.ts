import type { Block } from "./types";
import { resolveHref } from "./links";

export type Season = "winter" | "shoulder" | "summer";

export type PackRow = {
  title: string;
  days: string;
  fee: string;
  guests: string;
  extra: string;
  stay: string;
  vat: string;
  price: string;
  infoHref: string;
  bookHref: string;
  season: Season;
};

const SEASON_LABEL: Record<Season, string> = {
  winter: "Novembro – Março",
  shoulder: "Abril, Maio e Outubro",
  summer: "Junho a Setembro",
};

export function seasonLabel(season: Season): string {
  return SEASON_LABEL[season];
}

function seasonOf(title: string): Season {
  if (/November - March/i.test(title)) return "winter";
  if (/April, May and October/i.test(title)) return "shoulder";
  return "summer";
}

export function parsePackages(blocks: Block[]): PackRow[] {
  const rows: PackRow[] = [];
  let cur: Partial<PackRow> | null = null;
  const flush = () => {
    if (cur?.title && cur.price) {
      rows.push({
        title: cur.title,
        days: cur.days || "",
        fee: cur.fee || "",
        guests: cur.guests || "",
        extra: cur.extra || "Extra wedding guests 180€",
        stay: cur.stay || "Stay for up to 16 sleeping guests, 2 nights",
        vat: cur.vat || "VAT not included / TVA non incluse / IVA não incluso",
        price: cur.price.replace(/^NEW PACK:\s*/i, ""),
        infoHref: cur.infoHref || "/detalhes-pacotes-de-casamento",
        bookHref: cur.bookHref || "/contato-portugal",
        season: seasonOf(cur.title),
      });
    }
    cur = null;
  };

  for (const b of blocks) {
    if (b.t === "h1") continue;
    if (b.t === "img") {
      flush();
      cur = {};
      continue;
    }
    if (b.t !== "p" || !b.text) {
      if (b.t === "h3") flush();
      continue;
    }
    const t = b.text.trim();
    if (!cur) cur = {};
    const isTitle = (/wedding package/i.test(t) || /^NEW PACK!/i.test(t)) && !/^NEW PACK:/i.test(t);
    if (isTitle) {
      if (cur.title) flush();
      cur = { title: t };
      continue;
    }
    if (!cur.title) continue;
    if (/WEEKDAY|MONDAY|SATURDAY|FRIDAY|Monday to|Friday to/i.test(t)) cur.days = t;
    else if (/Villa Rental/i.test(t)) cur.fee = t;
    else if (/wedding guests/i.test(t) && !/extra/i.test(t)) cur.guests = t;
    else if (/Extra wedding/i.test(t)) cur.extra = t;
    else if (/sleeping guests|Stay for/i.test(t)) cur.stay = t;
    else if (/VAT not included/i.test(t)) cur.vat = t;
    else if (/€/.test(t)) cur.price = t;
    else if (t === "PACKAGE INFO") cur.infoHref = resolveHref(b.links?.[0]?.href || "/detalhes-pacotes-de-casamento").href;
    else if (t === "BOOK NOW") cur.bookHref = resolveHref(b.links?.[0]?.href || "/contato-portugal").href;
  }
  flush();
  return rows;
}

export function packageRest(blocks: Block[]): Block[] {
  const firstFaq = blocks.findIndex((b) => b.t === "h3");
  if (firstFaq === -1) return blocks.filter((b) => b.t === "h1");
  return [blocks.find((b) => b.t === "h1")!, ...blocks.slice(firstFaq)].filter(Boolean);
}
