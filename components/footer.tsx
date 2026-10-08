import Image from "next/image";
import Link from "next/link";
import { nav } from "@/lib/content";
import { resolveHref } from "@/lib/links";
import { Bi } from "./bi";
import { ContactForm } from "./contact-form";
import { LiveLink } from "./live-link";

const PARTNERS = [
  ["Portugal Wedding Guide", "https://www.portugalweddingguide.com/"],
  ["My Destination Wedding Portugal", "https://www.my-destination-wedding-portugal.com/"],
  ["Wedding Venues Portugal", "https://www.weddingvenuesportugal.com/"],
  ["Arriba by the Sea", "https://www.arribabythesea-portugal.com/"],
  ["Lisbon Wedding Celebrants", "https://www.lisbonweddingcelebrant.com/"],
  ["Lisbon Wedding PLanner", "https://www.lisbonweddingplanner.com/"],
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div style={{ position: "relative", height: 28 }}>
        <Image src="/media/logo/frieze-top.jpg" alt="" fill sizes="100vw" style={{ objectFit: "cover" }} />
      </div>
      <div className="shell footer-grid">
        <div>
          <h2><Bi text="Contatos" /></h2>
          <p><Bi text="Quinta do Torneiro - Espaço de Eventos e Casamentos" /></p>
          <p><Bi text="Lisboa - Portugal" /></p>
          <p>
            <Bi text="Sinta-se à vontade para nos contatar por telefone ou email. Você também pode preencher o formulário anexo e entraremos em contato o mais rápido possível." />
          </p>
          <p>
            <a href="https://goo.gl/maps/ccY2N3NcF6HZS4RL6" target="_blank" rel="noopener noreferrer">
              <Bi text="Nos encontre no Google Maps" />
            </a>
          </p>
          <p>
            EMAIL:{" "}
            <a href="mailto:events@lisbonweddingplanner.com?subject=Pedido de Informação Quinta do Torneiro">
              events@lisbonweddingplanner.com
            </a>
          </p>
          <p>
            Celular/ Whatsapp:{" "}
            <a href="tel:+351938903880">+351 938 903 880</a> Joana ·{" "}
            <a href="https://wa.me/351938903880" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </p>
          <p>
            <a href="mailto:info@myvintageweddingportugal.com?subject=Pedido informação Quinta do Torneiro">
              info@myvintageweddingportugal.com
            </a>
          </p>
          <p>
            <a href="https://instagram.com/quintadotorneiro" target="_blank" rel="noopener noreferrer">Instagram</a>
            {" · "}
            <a href="https://pt-pt.facebook.com/pages/category/Product-Service/Quinta-do-Torneiro-379200112140687/" target="_blank" rel="noopener noreferrer">Facebook</a>
          </p>
          <p>
            <Link href="/localizacao-quinta-do-torneiro">
              Morada: Estrada da Quinta do Torneiro - Quinta do Torneiro - 2770-144 Paço d´Arcos
            </Link>
          </p>
        </div>
        <ContactForm />
        <div>
          <p className="caption">Sitemap</p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {nav.map((g) => {
              const r = g.href ? resolveHref(g.href) : { href: "/", external: false };
              const href = g.label === "Home" ? "/" : r.href;
              return (
                <li key={g.label}>
                  {r.external && g.label !== "Home" ? (
                    <a href={href} target="_blank" rel="noopener noreferrer"><Bi text={g.label} /></a>
                  ) : (
                    <Link href={href}><Bi text={g.label} /></Link>
                  )}
                </li>
              );
            })}
          </ul>
          <LiveLink />
        </div>
      </div>
      <div className="shell">
        <p className="partner">
          {PARTNERS.map(([label, href], i) => (
            <span key={href}>
              {i > 0 ? " | " : null}
              <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
            </span>
          ))}
        </p>
        <p>©2018 Quinta do Torneiro eventos Lisboa</p>
        <p className="logo-plate">
          <Image src="/media/logo/cartouche-lisboa.jpg" alt="Quinta do Torneiro · Lisboa" width={96} height={83} />
        </p>
        <p className="study-line">
          <span className="lang-pt">feito pela dglxss · Estudo de design independente — sem afiliação com a Quinta do Torneiro.</span>
          <span className="lang-en">built by dglxss · Independent design study — not affiliated with Quinta do Torneiro.</span>
        </p>
      </div>
    </footer>
  );
}
