"use client";

import { useLayoutEffect } from "react";

export function TitleSync({ pt, en }: { pt: string; en: string }) {
  useLayoutEffect(() => {
    const apply = () => {
      document.title = document.documentElement.lang === "en" ? en : pt;
    };
    apply();
    const mo = new MutationObserver(apply);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    return () => mo.disconnect();
  }, [pt, en]);
  return null;
}
