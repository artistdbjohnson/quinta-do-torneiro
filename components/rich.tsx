import { Bi } from "./bi";
import { fixTypos, tr } from "@/lib/i18n";
import { resolveHref } from "@/lib/links";
import type { LinkItem } from "@/lib/types";

function parts(text: string, links?: LinkItem[]) {
  if (!links?.length) return [{ t: text }];
  const out: { t: string; href?: string }[] = [];
  let rest = text;
  for (const link of links) {
    const i = rest.indexOf(link.text);
    if (i < 0) continue;
    if (i > 0) out.push({ t: rest.slice(0, i) });
    out.push({ t: link.text, href: link.href });
    rest = rest.slice(i + link.text.length);
  }
  if (rest) out.push({ t: rest });
  if (!out.length) return [{ t: text }];
  return out;
}

export function Rich({
  text,
  links,
  className,
  bold,
}: {
  text: string;
  links?: LinkItem[];
  className?: string;
  bold?: boolean;
}) {
  const pt = fixTypos(text);
  const segs = parts(pt, links);
  const body = (lang: "pt" | "en") =>
    segs.map((seg, i) => {
      const value = lang === "en" ? tr(seg.t) : fixTypos(seg.t);
      if (!seg.href) return <span key={i}>{value}</span>;
      const r = resolveHref(seg.href);
      return (
        <a key={i} href={r.href} target={r.external ? "_blank" : undefined} rel={r.external ? "noopener noreferrer" : undefined}>
          {value}
        </a>
      );
    });
  const same = segs.every((s) => tr(s.t) === fixTypos(s.t));
  return (
    <p className={bold ? `bold ${className ?? ""}` : className}>
      {same ? body("pt") : (
        <>
          <span className="lang-pt">{body("pt")}</span>
          <span className="lang-en">{body("en")}</span>
        </>
      )}
    </p>
  );
}

export function QuietUrl({ text }: { text: string }) {
  const href = text.trim();
  return (
    <p className="quiet-link">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <Bi text={href} />
      </a>
    </p>
  );
}
