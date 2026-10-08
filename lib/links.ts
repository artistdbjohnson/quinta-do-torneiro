import { pages } from "./content";

const ORIGIN = "https://www.quintadotorneiro-eventos.com";

export type Resolved = { href: string; external: boolean };

export function resolveHref(href: string | null | undefined): Resolved {
  if (!href) return { href: "/", external: false };
  if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) {
    return { href, external: false };
  }
  let url: URL;
  try {
    url = new URL(href, ORIGIN);
  } catch {
    return { href, external: true };
  }
  const host = url.hostname.replace(/^www\./, "");
  if (host !== "quintadotorneiro-eventos.com") {
    return { href: url.toString(), external: true };
  }
  const slug = decodeURIComponent(url.pathname.replace(/^\/|\/$/g, ""));
  const hash = url.hash || "";
  if (!slug) return { href: `/${hash}`, external: false };
  if (pages[slug]) return { href: `/${slug}${hash}`, external: false };
  return { href: url.toString(), external: true };
}

/** Home-only link fixes from the harvest. */
export function fixHomeHref(label: string, href: string): string {
  if (label === "Contate a Quinta do Torneiro") return "/contato-portugal";
  if (label === "Clique Aqui" && href.includes("pacotes-de-casamento-2026")) {
    return href;
  }
  return resolveHref(href).href;
}
