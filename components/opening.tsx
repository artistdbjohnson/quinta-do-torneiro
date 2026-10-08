"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";

const COLS = 5;
const ROWS = 4;
const EASE_LAY: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_FLIP: [number, number, number, number] = [0.65, 0, 0.35, 1];

type Metrics = {
  vw: number;
  vh: number;
  cols: number;
  rows: number;
  size: number;
  cartW: number;
  cartH: number;
  cartX: number;
  cartY: number;
  hero: { x: number; y: number; w: number; h: number; dw: number; dh: number; ox: number; oy: number };
};

function measure(): Metrics {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const phone = vw < 768;
  const cap = phone ? 48 : 96;
  let size = phone ? 96 : 120;
  let cols = Math.ceil(vw / size);
  let rows = Math.ceil(vh / size);
  while (cols * rows > cap) {
    size += 8;
    cols = Math.ceil(vw / size);
    rows = Math.ceil(vh / size);
  }
  const cartW = Math.min(vw * 0.56, vh * 0.56, 420);
  const cartH = cartW * (1354 / 1567);
  const cartX = (vw - cartW) / 2;
  const cartY = (vh - cartH) / 2 - 28;
  const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 78;
  const inset = phone ? 16 : 24;
  const hx = inset;
  const hy = navH + inset + 10;
  const hw = vw - inset * 2;
  const hh = Math.min(vh * 0.68, 740);
  const imgW = 1800;
  const imgH = 1200;
  const scale = Math.max(hw / imgW, hh / imgH);
  const dw = imgW * scale;
  const dh = imgH * scale;
  const ox = hx + (hw - dw) * 0.5;
  const oy = hy + (hh - dh) * 0.42;
  return { vw, vh, cols, rows, size, cartW, cartH, cartX, cartY, hero: { x: hx, y: hy, w: hw, h: hh, dw, dh, ox, oy } };
}

function shouldPlay() {
  try {
    const replay = new URLSearchParams(window.location.search).has("replay");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("qdt-open-seen");
    if (reduce || window.location.hash) return false;
    if (seen && !replay) return false;
    return true;
  } catch {
    return false;
  }
}

export function Opening() {
  const [phase, setPhase] = useState<"off" | "lay" | "flip">("off");
  const [box, setBox] = useState<Metrics | null>(null);

  useEffect(() => {
    if (!shouldPlay()) {
      document.documentElement.classList.remove("qdt-opening");
      return;
    }
    document.documentElement.classList.add("qdt-opening");
    sessionStorage.setItem("qdt-open-seen", "1");
    setBox(measure());
    setPhase("lay");
    const flipAt = window.setTimeout(() => setPhase("flip"), 1400);
    const doneAt = window.setTimeout(() => finish(), 2350);
    const onKey = () => finish();
    window.addEventListener("keydown", onKey);
    function finish() {
      window.clearTimeout(flipAt);
      window.clearTimeout(doneAt);
      document.documentElement.classList.remove("qdt-opening");
      setPhase("off");
      window.removeEventListener("keydown", onKey);
    }
    return () => {
      window.clearTimeout(flipAt);
      window.clearTimeout(doneAt);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  function finishNow() {
    document.documentElement.classList.remove("qdt-opening");
    setPhase("off");
  }

  if (phase === "off" || !box) {
    return <div className="open-root" aria-hidden="true" />;
  }

  return (
    <div className="open-root" aria-hidden="true" data-phase={phase} onClick={finishNow}>
      <div className="open-grid" />
      {phase === "lay" ? <Lay box={box} /> : <Flip box={box} />}
    </div>
  );
}

function Lay({ box }: { box: Metrics }) {
  const tiles = [];
  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      const order = (ROWS - 1 - row) * COLS + col;
      tiles.push(
        <motion.div
          key={`${row}-${col}`}
          initial={{ opacity: 0, y: 6, scale: 1.02 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: order * 0.045, duration: 0.28, ease: EASE_LAY }}
          style={{
            backgroundImage: "url(/media/logo/cartouche-lisboa.jpg)",
            backgroundSize: "500% 400%",
            backgroundPosition: `${(col / 4) * 100}% ${(row / 3) * 100}%`,
            backgroundRepeat: "no-repeat",
          }}
        />,
      );
    }
  }
  return (
    <div style={{ position: "absolute", left: box.cartX, top: box.cartY, width: box.cartW }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gridTemplateRows: "repeat(4, 1fr)", width: box.cartW, height: box.cartH }}>
        {tiles}
      </div>
      <motion.p className="tagline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.4 }}>
        <span className="lang-pt">Espaço para Eventos e Casamentos em Portugal</span>
        <span className="lang-en">A venue for events and weddings in Portugal</span>
      </motion.p>
    </div>
  );
}

function Flip({ box }: { box: Metrics }) {
  const tiles = [];
  for (let row = 0; row < box.rows; row += 1) {
    for (let col = 0; col < box.cols; col += 1) {
      const x = col * box.size;
      const y = row * box.size;
      tiles.push(
        <div key={`${row}-${col}`} style={{ position: "absolute", left: x, top: y, width: box.size, height: box.size, perspective: 900 }}>
          <motion.div
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 180 }}
            transition={{ delay: (row + col) * 0.028, duration: 0.55, ease: EASE_FLIP }}
            style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d" }}
          >
            <div style={face(false, cartoucheFront(box, x, y))} />
            <div style={face(true, heroBack(box, x, y))} />
          </motion.div>
        </div>,
      );
    }
  }
  return <div style={{ position: "absolute", inset: 0 }}>{tiles}</div>;
}

function face(back: boolean, background: CSSProperties): CSSProperties {
  return {
    position: "absolute",
    inset: 0,
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    transform: back ? "rotateY(180deg)" : undefined,
    backgroundColor: "var(--glaze)",
    ...background,
  };
}

function cartoucheFront(box: Metrics, x: number, y: number): CSSProperties {
  return {
    backgroundImage: "linear-gradient(to right, rgba(32,69,94,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(32,69,94,0.05) 1px, transparent 1px), url(/media/logo/cartouche-lisboa.jpg)",
    backgroundSize: "48px 48px, 48px 48px, " + `${box.cartW}px ${box.cartH}px`,
    backgroundPosition: `${-x}px ${-y}px, ${-x}px ${-y}px, ${box.cartX - x}px ${box.cartY - y}px`,
    backgroundRepeat: "repeat, repeat, no-repeat",
  };
}

function heroBack(box: Metrics, x: number, y: number): CSSProperties {
  const h = box.hero;
  const overlaps = x < h.x + h.w && x + box.size > h.x && y < h.y + h.h && y + box.size > h.y;
  if (!overlaps) return { backgroundColor: "var(--paper)" };
  return {
    backgroundColor: "var(--paper)",
    backgroundImage: "url(/media/location/entrada-01.jpg)",
    backgroundSize: `${h.dw}px ${h.dh}px`,
    backgroundPosition: `${h.ox - x}px ${h.oy - y}px`,
    backgroundRepeat: "no-repeat",
  };
}
