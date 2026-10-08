"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, type MotionValue } from "framer-motion";
import Link from "next/link";

export type Door = {
  slug: string;
  titlePt: string;
  titleEn: string;
  src: string;
  caption: string;
  linePt: string;
  lineEn: string;
};

function layout(progress: number, vw: number) {
  const focus = progress * 4;
  const widths = [0, 1, 2, 3, 4].map((i) => {
    const dist = Math.abs(focus - i);
    const t = Math.max(0, 1 - dist);
    return (0.38 + t * 0.32) * vw;
  });
  const gap = 28;
  const centerOf = (i: number) => {
    let x = 0;
    for (let k = 0; k < i; k += 1) x += widths[k] + gap;
    return x + widths[i] / 2;
  };
  const i0 = Math.min(4, Math.floor(focus));
  const frac = focus - i0;
  const c = i0 >= 4 ? centerOf(4) : centerOf(i0) * (1 - frac) + centerOf(Math.min(4, i0 + 1)) * frac;
  return { widths, x: vw / 2 - c };
}

function DoorBody({ door }: { door: Door }) {
  return (
    <>
      <div className="door-photo" style={{ backgroundImage: `url(${door.src})` }} />
      <p className="door-name">
        <span className="lang-pt">{door.titlePt}</span>
        <span className="lang-en">{door.titleEn}</span>
      </p>
      <p className="door-line">
        <span className="lang-pt">{door.linePt}</span>
        <span className="lang-en">{door.lineEn}</span>
      </p>
      <p className="caption" style={{ marginTop: 8 }}>{door.caption}</p>
      <Link href={`/${door.slug}`}>
        <span className="lang-pt">Ver {door.titlePt}</span>
        <span className="lang-en">View {door.titleEn}</span>
      </Link>
    </>
  );
}

export function Enfilade({ doors, headPt, headEn, subPt, subEn, anchored = true }: { doors: Door[]; headPt: string; headEn: string; subPt: string; subEn: string; anchored?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useMotionValue(0);
  const w0 = useMotionValue(0);
  const w1 = useMotionValue(0);
  const w2 = useMotionValue(0);
  const w3 = useMotionValue(0);
  const w4 = useMotionValue(0);
  const widths = useRef([w0, w1, w2, w3, w4]);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const apply = () => setDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!desktop) return;
    const apply = (p: number) => {
      const box = layout(p, window.innerWidth);
      box.widths.forEach((w, i) => widths.current[i].set(w));
      x.set(box.x);
    };
    apply(scrollYProgress.get());
    return scrollYProgress.on("change", apply);
  }, [desktop, scrollYProgress, x]);

  const head = (
    <div className="enfilade-head">
      <h2>
        <span className="lang-pt">{headPt}</span>
        <span className="lang-en">{headEn}</span>
      </h2>
      <p style={{ margin: 0 }}>
        <span className="lang-pt">{subPt}</span>
        <span className="lang-en">{subEn}</span>
      </p>
    </div>
  );

  return (
    <section id={anchored ? "saloes" : undefined} className="anchor" ref={ref} style={{ height: desktop ? "calc(100vh - var(--nav-h) + 150vh)" : "auto" }}>
      {desktop ? (
        <div className="enfilade-sticky enfilade-desktop">
          {head}
          <motion.div style={{ display: "flex", gap: 28, x }}>
            {doors.map((door, i) => (
              <DoorFrame key={door.slug} door={door} width={widths.current[i]} />
            ))}
          </motion.div>
        </div>
      ) : (
        <div className="chapter enfilade-mobile" style={{ paddingTop: 72 }}>
          {head}
          <div className="snap-row">
            {doors.map((door) => (
              <article className="door" key={door.slug}>
                <DoorBody door={door} />
              </article>
            ))}
          </div>
        </div>
      )}
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
        <clipPath id="door-arch" clipPathUnits="objectBoundingBox">
          <path d="M0,0.07 Q0.5,0 1,0.07 L1,1 L0,1 Z" />
        </clipPath>
      </svg>
    </section>
  );
}

function DoorFrame({ door, width }: { door: Door; width: MotionValue<number> }) {
  return (
    <motion.article style={{ width, flex: "none" }}>
      <DoorBody door={door} />
    </motion.article>
  );
}
