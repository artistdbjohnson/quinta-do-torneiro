import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export function SeedMedia({
  src,
  alt,
  sizes,
  fillHeight,
  priority,
  position = "center 42%",
}: {
  src: string;
  alt: string;
  sizes: string;
  fillHeight?: boolean;
  priority?: boolean;
  position?: string;
}) {
  return (
    <span className={fillHeight ? "seed-media fill" : "seed-media"}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} style={{ objectFit: "cover", objectPosition: position }} />
      <span className="seed-overlay" />
      <span className="seed-plus" aria-hidden="true">+</span>
      <i className="br tl" />
      <i className="br tr" />
      <i className="br bl" />
      <i className="br brr" />
    </span>
  );
}

export function Pill({ kind, children }: { kind: "garden" | "brand" | "gold" | "navy"; children: React.ReactNode }) {
  return <span className={`pill ${kind}`}>{children}</span>;
}

export function SeedCard({
  href,
  external,
  src,
  alt,
  title,
  cat,
  kind,
  position,
}: {
  href: string;
  external?: boolean;
  src: string;
  alt: string;
  title: ReactNode;
  cat: ReactNode;
  kind: "garden" | "brand" | "gold" | "navy";
  position?: string;
}) {
  const media = <SeedMedia src={src} alt={alt} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" position={position} />;
  const body = (
    <>
      {media}
      <span className="seed-card-top">
        <h3>{title}</h3>
        <Pill kind={kind}>{cat}</Pill>
      </span>
    </>
  );
  if (external) {
    return (
      <a className="seed-card" href={href} target="_blank" rel="noopener noreferrer">
        {body}
      </a>
    );
  }
  return (
    <Link className="seed-card" href={href}>
      {body}
    </Link>
  );
}
