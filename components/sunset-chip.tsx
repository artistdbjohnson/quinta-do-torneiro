"use client";

import { useEffect, useState } from "react";
import { formatSunset, sunsetUtc } from "@/lib/sunset";

export function SunsetChip() {
  const [label, setLabel] = useState("");
  useEffect(() => {
    const apply = () => {
      const when = sunsetUtc();
      if (!when) return;
      const lang = document.documentElement.lang === "en" ? "en" : "pt";
      setLabel(formatSunset(when, lang));
    };
    apply();
    const mo = new MutationObserver(apply);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    return () => mo.disconnect();
  }, []);
  return <span className="sunset-chip">{label}</span>;
}
