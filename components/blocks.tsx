import Link from "next/link";
import { groupLists, isJunkText } from "@/lib/content";
import { wixSrc } from "@/lib/media";
import { resolveHref } from "@/lib/links";
import type { Block } from "@/lib/types";
import { Bi } from "./bi";
import { QuietUrl, Rich } from "./rich";
import { PlateView } from "./plate";
import { realPlate } from "@/lib/media";

export function Blocks({ blocks, images = true }: { blocks: Block[]; images?: boolean }) {
  let shown = 0;
  const grouped = groupLists(blocks.filter((b) => !isJunkText(b.text)));
  return (
    <div className="prose">
      {grouped.map((node, i) => {
        if ("items" in node && node.t === "ul") {
          return (
            <ul key={i}>
              {node.items.map((item, j) => (
                <li key={j}>
                  {item.links?.length ? (
                    <Rich text={item.text || ""} links={item.links} />
                  ) : (
                    <Bi text={item.text || ""} />
                  )}
                </li>
              ))}
            </ul>
          );
        }
        const b = node as Block;
        if (b.t === "img") {
          if (!images) return null;
          const src = wixSrc(b.id);
          if (!src || shown >= 3) return null;
          shown += 1;
          const alt = b.alt && !/whatsapp image|\.jpe?g|\.png/i.test(b.alt) ? b.alt : "Quinta do Torneiro";
          return <PlateView key={i} plate={realPlate(src, "A QUINTA", alt)} sizes="(min-width: 900px) 70vw, 100vw" />;
        }
        const text = b.text || "";
        if (/^https?:\/\//i.test(text.trim())) return <QuietUrl key={i} text={text} />;
        if (b.t === "button") {
          const r = resolveHref(b.href);
          const cls = "navy-pill";
          return r.external ? (
            <p key={i}><a className={cls} href={r.href} target="_blank" rel="noopener noreferrer"><Bi text={text} /></a></p>
          ) : (
            <p key={i}><Link className={cls} href={r.href}><Bi text={text} /></Link></p>
          );
        }
        if (b.t === "p") return <Rich key={i} text={text} links={b.links} bold={b.bold} />;
        if (b.t === "li") return <Rich key={i} text={text} links={b.links} />;
        const Tag = (["h1", "h2", "h3", "h4", "h5", "h6"].includes(b.t) ? b.t : "h2") as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
        return <Tag key={i}><Bi text={text} /></Tag>;
      })}
    </div>
  );
}
