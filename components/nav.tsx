"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export type NavNode = {
  labelPt: string;
  labelEn: string;
  href: string;
  external: boolean;
  children: { labelPt: string; labelEn: string; href: string; external: boolean }[];
};

function Label({ pt, en }: { pt: string; en: string }) {
  if (pt === en) return <>{pt}</>;
  return (
    <>
      <span className="lang-pt">{pt}</span>
      <span className="lang-en">{en}</span>
    </>
  );
}

function ItemLink({ href, external, className, children }: { href: string; external?: boolean; className?: string; children: ReactNode }) {
  if (external) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
}

const XL = ["A Quinta", "Casamentos", "Eventos", "Galeria", "Preçario", "Contato"];
const LG = ["A Quinta", "Casamentos", "Preçario", "Contato"];

export function Nav({ groups }: { groups: NavNode[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [sheet, setSheet] = useState(false);
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState<"pt" | "en">("pt");

  useLayoutEffect(() => {
    const theme = localStorage.getItem("qdt-theme");
    document.documentElement.classList.toggle("dark", theme === "dark");
    const stored = localStorage.getItem("qdt-lang");
    document.documentElement.lang = stored === "en" ? "en" : "pt-PT";
    setDark(theme === "dark");
    setLang(stored === "en" ? "en" : "pt");
    const el = ref.current;
    if (!el) return;
    const write = () => document.documentElement.style.setProperty("--nav-h", `${el.offsetHeight}px`);
    write();
    const ro = new ResizeObserver(write);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setSheet(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  function toggleTheme() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("qdt-theme", next ? "dark" : "light");
    setDark(next);
  }
  function toggleLang(next: "pt" | "en") {
    document.documentElement.lang = next === "en" ? "en" : "pt-PT";
    localStorage.setItem("qdt-lang", next);
    setLang(next);
  }

  const tools = (
    <div className="nav-tools">
      <Link className="gold-pill pacotes-pill" href="/pacotes-precos-casamentos-portugal">
        <Label pt="Pacotes" en="Packages" />
      </Link>
      <span className="lang-toggle">
        <button type="button" aria-current={lang === "pt"} onClick={() => toggleLang("pt")}>PT</button>
        {" | "}
        <button type="button" aria-current={lang === "en"} onClick={() => toggleLang("en")}>EN</button>
      </span>
      <button className="theme-toggle" type="button" onClick={toggleTheme} aria-pressed={dark}>
        {dark ? "Dark" : "Light"}
      </button>
    </div>
  );

  return (
    <header className="site-nav">
      <div ref={ref}>
      <div style={{ position: "relative", height: 6 }}>
        <Image src="/media/logo/frieze-thin.jpg" alt="" fill sizes="100vw" style={{ objectFit: "cover" }} />
      </div>
      <div className="nav-row">
        <Link href="/" aria-label="Quinta do Torneiro" className="wordmark">
          <Image src="/media/logo/wordmark-azulejo.png" alt="Quinta do Torneiro" width={928} height={120} style={{ width: "100%", height: "auto" }} />
        </Link>
        <nav className="nav-links nav-xl" aria-label="Principal">
          {XL.map((label) => {
            const group = groups.find((g) => g.labelPt === label);
            if (!group) return null;
            return <MenuGroup key={label} group={group} open={open} setOpen={setOpen} alignRight={label === "Contato" || label === "Preçario"} />;
          })}
          <Mais groups={groups.filter((g) => !XL.includes(g.labelPt) && g.labelPt !== "Home")} open={open} setOpen={setOpen} />
        </nav>
        <nav className="nav-links nav-lg" aria-label="Principal">
          {LG.map((label) => {
            const group = groups.find((g) => g.labelPt === label);
            if (!group) return null;
            return <MenuGroup key={label} group={group} open={open} setOpen={setOpen} alignRight={label === "Contato"} />;
          })}
          <Mais groups={groups.filter((g) => !LG.includes(g.labelPt) && g.labelPt !== "Home")} open={open} setOpen={setOpen} />
        </nav>
        <div className="desktop-tools" style={{ marginLeft: "auto" }}>{tools}</div>
        <Link className="gold-pill pacotes-pill" href="/pacotes-precos-casamentos-portugal" style={{ marginLeft: "auto" }} data-phone-pill>
          <Label pt="Pacotes" en="Packages" />
        </Link>
        <button className="menu-toggle" type="button" aria-expanded={sheet} onClick={() => setSheet((v) => !v)}>
          {sheet ? <Label pt="Fechar" en="Close" /> : <Label pt="Menu" en="Menu" />}
        </button>
      </div>
      </div>
      <div className={sheet ? "sheet open" : "sheet"}>
        <div className="sheet-contact">
          <a href="tel:+351938903880">+351 938 903 880</a>
          <a href="https://wa.me/351938903880" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
        {groups.map((group) =>
          group.children.length ? (
            <details key={group.labelPt}>
              <summary>
                <Label pt={group.labelPt} en={group.labelEn} />
              </summary>
              <ItemLink href={group.href} external={group.external} className="child">
                <Label pt={group.labelPt} en={group.labelEn} />
              </ItemLink>
              {group.children.map((c) => (
                <ItemLink key={c.href + c.labelPt} href={c.href} external={c.external} className="child">
                  <Label pt={c.labelPt} en={c.labelEn} />
                </ItemLink>
              ))}
            </details>
          ) : (
            <ItemLink key={group.labelPt} href={group.href} external={group.external} className="sheet-link">
              <Label pt={group.labelPt} en={group.labelEn} />
            </ItemLink>
          ),
        )}
        <div className="sheet-tools">
          <span className="lang-toggle">
            <button type="button" aria-current={lang === "pt"} onClick={() => toggleLang("pt")}>PT</button>
            {" | "}
            <button type="button" aria-current={lang === "en"} onClick={() => toggleLang("en")}>EN</button>
          </span>
          <button className="theme-toggle" type="button" onClick={toggleTheme}>{dark ? "Dark" : "Light"}</button>
        </div>
      </div>
      <style>{`
        @media (min-width: 1024px) {
          [data-phone-pill] { display: none !important; }
        }
        @media (max-width: 1023px) {
          .desktop-tools { display: none !important; }
        }
        @media (min-width: 1280px) {
          .nav-lg { display: none !important; }
        }
        @media (max-width: 1279px) {
          .nav-xl { display: none !important; }
        }
        @media (min-width: 1024px) and (max-width: 1279px) {
          .nav-lg { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

function MenuGroup({
  group,
  open,
  setOpen,
  alignRight,
}: {
  group: NavNode;
  open: string | null;
  setOpen: (v: string | null) => void;
  alignRight?: boolean;
}) {
  if (!group.children.length) {
    return (
      <ItemLink href={group.href} external={group.external} className="nav-a">
        <Label pt={group.labelPt} en={group.labelEn} />
      </ItemLink>
    );
  }
  const cols = group.children.length > 12 ? "columns" : "columns cols-2";
  const shown = open === group.labelPt;
  return (
    <div className="nav-item" onMouseEnter={() => setOpen(group.labelPt)} onMouseLeave={() => setOpen(null)}>
      <button className="nav-btn" type="button" aria-expanded={shown} onClick={() => setOpen(shown ? null : group.labelPt)}>
        <Label pt={group.labelPt} en={group.labelEn} /> ▾
      </button>
      {shown ? (
        <div className={`mega ${cols} ${alignRight ? "right" : ""}`}>
          <ItemLink href={group.href} external={group.external} className="hub">
            <Label pt={group.labelPt} en={group.labelEn} />
          </ItemLink>
          {group.children.map((c) => (
            <ItemLink key={c.href + c.labelPt} href={c.href} external={c.external}>
              <Label pt={c.labelPt} en={c.labelEn} />
            </ItemLink>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Mais({
  groups,
  open,
  setOpen,
}: {
  groups: NavNode[];
  open: string | null;
  setOpen: (v: string | null) => void;
}) {
  const shown = open === "Mais";
  return (
    <div className="nav-item" onMouseEnter={() => setOpen("Mais")} onMouseLeave={() => setOpen(null)}>
      <button className="nav-btn" type="button" aria-expanded={shown} onClick={() => setOpen(shown ? null : "Mais")}>
        <Label pt="Mais" en="More" /> ▾
      </button>
      {shown ? (
        <div className="mega right" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(180px, 1fr))", gap: 16, width: "min(860px, 70vw)" }}>
          {groups.map((g) => (
            <div className="mega-group" key={g.labelPt}>
              <strong>
                <ItemLink href={g.href} external={g.external}>
                  <Label pt={g.labelPt} en={g.labelEn} />
                </ItemLink>
              </strong>
              {g.children.map((c) => (
                <ItemLink key={c.href + c.labelPt} href={c.href} external={c.external}>
                  <Label pt={c.labelPt} en={c.labelEn} />
                </ItemLink>
              ))}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
