import Link from "next/link";

export default function NotFound() {
  return (
    <section className="chapter">
      <div className="shell">
        <p className="num">404</p>
        <h1>
          <span className="lang-pt">Esta página não está na Quinta.</span>
          <span className="lang-en">This page is not at the Quinta.</span>
        </h1>
        <p>
          <Link href="/">
            <span className="lang-pt">Home</span>
            <span className="lang-en">Home</span>
          </Link>
          {" · "}
          <Link href="/contato-portugal">
            <span className="lang-pt">Contato</span>
            <span className="lang-en">Contact</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
