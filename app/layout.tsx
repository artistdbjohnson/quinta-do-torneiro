import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Enriqueta, Jost, Playfair_Display } from "next/font/google";
import { Footer } from "@/components/footer";
import { Opening } from "@/components/opening";
import { SiteNav } from "@/components/site-nav";
import { getPage } from "@/lib/content";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const enriqueta = Enriqueta({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-enriqueta",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

const home = getPage("home");

export const metadata: Metadata = {
  title: { default: home.title, template: "%s" },
  description: home.description,
  openGraph: {
    title: home.title,
    description: home.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Quinta do Torneiro" }],
  },
};

const boot = `(function(){try{var t=localStorage.getItem("qdt-theme");if(t==="dark")document.documentElement.classList.add("dark");var l=localStorage.getItem("qdt-lang");document.documentElement.lang=l==="en"?"en":"pt-PT";var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;var seen=sessionStorage.getItem("qdt-open-seen");var replay=location.search.indexOf("replay=1")>=0;if((replay||!seen)&&!reduce&&!location.hash)document.documentElement.classList.add("qdt-opening");}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-PT" className={`${playfair.variable} ${enriqueta.variable} ${jost.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <Opening />
        <SiteNav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
