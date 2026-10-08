import { nav } from "@/lib/content";
import { tr } from "@/lib/i18n";
import { resolveHref } from "@/lib/links";
import { Nav, type NavNode } from "./nav";

export function SiteNav() {
  const groups: NavNode[] = nav.map((g) => {
    const top = g.href ? resolveHref(g.href) : { href: "/", external: false };
    return {
      labelPt: g.label,
      labelEn: tr(g.label),
      href: g.label === "Home" ? "/" : top.href,
      external: g.label === "Home" ? false : top.external,
      children: g.children.map((c) => {
        const r = resolveHref(c.href);
        return { labelPt: c.label, labelEn: tr(c.label), href: r.href, external: r.external };
      }),
    };
  });
  return <Nav groups={groups} />;
}
