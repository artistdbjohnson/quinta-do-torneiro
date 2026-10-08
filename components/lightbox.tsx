"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Plate } from "@/lib/media";

export function GalleryGrid({ plates }: { plates: Plate[] }) {
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((v) => (v === null ? v : (v + 1) % plates.length));
      if (e.key === "ArrowLeft") setOpen((v) => (v === null ? v : (v - 1 + plates.length) % plates.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, plates.length]);

  return (
    <>
      <div className="masonry">
        {plates.map((plate, i) => (
          <figure key={`${plate.src}-${i}`}>
            <button type="button" onClick={() => setOpen(i)} aria-label={plate.alt}>
              <span className="plate" style={{ position: "relative", display: "block", aspectRatio: "16 / 10" }}>
                <Image src={plate.src} alt={plate.alt} fill sizes="(min-width: 900px) 33vw, 100vw" style={{ objectFit: "cover", objectPosition: plate.position || "center 42%" }} />
              </span>
            </button>
            <figcaption className="caption">{plate.caption}</figcaption>
          </figure>
        ))}
      </div>
      {open !== null ? (
        <div className="lb" role="dialog" aria-modal="true" aria-label={plates[open].alt}>
          <button className="x" type="button" onClick={() => setOpen(null)}>
            <span className="lang-pt">Fechar</span>
            <span className="lang-en">Close</span>
          </button>
          <button className="prev" type="button" onClick={() => setOpen((open - 1 + plates.length) % plates.length)}>
            <span className="lang-pt">Anterior</span>
            <span className="lang-en">Previous</span>
          </button>
          <Image src={plates[open].src} alt={plates[open].alt} width={1600} height={1067} style={{ width: "auto", height: "auto", maxWidth: "min(1100px, 92vw)", maxHeight: "82vh", objectFit: "contain" }} />
          <button className="next" type="button" onClick={() => setOpen((open + 1) % plates.length)}>
            <span className="lang-pt">Seguinte</span>
            <span className="lang-en">Next</span>
          </button>
        </div>
      ) : null}
    </>
  );
}
