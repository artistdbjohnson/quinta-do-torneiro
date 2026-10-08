"use client";

import { usePathname } from "next/navigation";

export function LiveLink() {
  const path = usePathname() || "/";
  const href = path === "/" ? "https://www.quintadotorneiro-eventos.com/" : `https://www.quintadotorneiro-eventos.com${path}`;
  return (
    <p>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <span className="lang-pt">Ver em quintadotorneiro-eventos.com</span>
        <span className="lang-en">View on quintadotorneiro-eventos.com</span>
      </a>
    </p>
  );
}
