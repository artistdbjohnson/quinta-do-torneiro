"use client";

import { useState } from "react";

export function ContactForm({ id, showTitle = true }: { id?: string; showTitle?: boolean }) {
  const [shown, setShown] = useState(false);
  return (
    <form
      id={id}
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        setShown(true);
      }}
    >
      {showTitle ? (
        <p className="display" style={{ fontSize: 28, margin: "0 0 8px" }}>
          <span className="lang-pt">Fale Connosco!</span>
          <span className="lang-en">Talk to us!</span>
        </p>
      ) : null}
      <label>
        <span className="lang-pt">Nome</span>
        <span className="lang-en">Name</span>
        <input name="nome" autoComplete="name" required />
      </label>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        <span className="lang-pt">Mensagem</span>
        <span className="lang-en">Message</span>
        <textarea name="mensagem" required />
      </label>
      <button className="navy-pill" type="submit" style={{ justifySelf: "start" }}>
        <span className="lang-pt">Enviar</span>
        <span className="lang-en">Send</span>
      </button>
      {shown ? (
        <p className="study-note" role="status">
          <span className="lang-pt">
            Este é um estudo de design independente — a sua mensagem não foi enviada. Contacte a Quinta pelo{" "}
            <a href="https://wa.me/351938903880">WhatsApp</a> <a href="tel:+351938903880">+351 938 903 880</a> ou pelo site{" "}
            <a href="https://www.quintadotorneiro-eventos.com/contato-portugal" target="_blank" rel="noopener noreferrer">
              quintadotorneiro-eventos.com
            </a>
            .
          </span>
          <span className="lang-en">
            This is an independent design study — your message was not sent. Please contact the Quinta on{" "}
            <a href="https://wa.me/351938903880">WhatsApp</a> <a href="tel:+351938903880">+351 938 903 880</a> or at{" "}
            <a href="https://www.quintadotorneiro-eventos.com/contato-portugal" target="_blank" rel="noopener noreferrer">
              quintadotorneiro-eventos.com
            </a>
            .
          </span>
        </p>
      ) : null}
    </form>
  );
}
