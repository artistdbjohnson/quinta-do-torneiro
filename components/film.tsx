"use client";

import { useState } from "react";
import Image from "next/image";

export function Film() {
  const [on, setOn] = useState(false);
  return (
    <div className="film">
      {on ? (
        <iframe
          src="https://player.vimeo.com/video/438508117?dnt=1"
          title="Quinta do Torneiro Wedding in Portugal by Lisbon Wedding Planner"
          allow="fullscreen; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <>
          <Image src="/media/location/patio-01.jpg" alt="Jardim do Pátio, Quinta do Torneiro" fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "center 42%" }} />
          <button className="play" type="button" onClick={() => setOn(true)}>
            <span className="play-mark" aria-hidden="true"><i /></span>
            <span className="lang-pt" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden" }}>Reproduzir filme</span>
            <span className="lang-en" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden" }}>Play film</span>
          </button>
        </>
      )}
    </div>
  );
}
