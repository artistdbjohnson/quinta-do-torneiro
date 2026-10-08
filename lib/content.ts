import rawPages from "@/docs/pages.json";
import rawNav from "@/docs/nav.json";
import type { Block, NavGroup, PageDoc } from "./types";

export const pages = rawPages as Record<string, PageDoc>;
export const nav = (rawNav as NavGroup[]).filter((g) => g.label !== "Mais");

export function getPage(slug: string): PageDoc {
  const page = pages[slug];
  if (!page) throw new Error(`Missing page ${slug}`);
  return page;
}

export const PAGE_SLUGS = Object.keys(pages);

export function liveUrl(slug: string): string {
  if (slug === "home") return "https://www.quintadotorneiro-eventos.com/";
  return `https://www.quintadotorneiro-eventos.com/${slug}`;
}

export function isJunkText(text?: string): boolean {
  if (!text) return false;
  const t = text.trim();
  if (!t) return true;
  if (/^(top of page|bottom of page|retornar para a home|reproduzir v[ií]deo)$/i.test(t)) return true;
  if (/^[A-Z]$/.test(t) || /^[0-5]$/.test(t)) return true;
  return false;
}

export function groupLists(blocks: Block[]): Array<Block | { t: "ul"; items: Block[] }> {
  const out: Array<Block | { t: "ul"; items: Block[] }> = [];
  let items: Block[] | null = null;
  for (const b of blocks) {
    if (b.t === "li") {
      if (!items) {
        items = [];
        out.push({ t: "ul", items });
      }
      items.push(b);
    } else {
      items = null;
      out.push(b);
    }
  }
  return out;
}
