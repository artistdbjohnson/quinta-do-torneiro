import Image from "next/image";
import type { Plate } from "@/lib/media";

export function PlateView({
  plate,
  sizes,
  priority,
  ratio = "16 / 10",
  className = "",
}: {
  plate: Plate;
  sizes: string;
  priority?: boolean;
  ratio?: string;
  className?: string;
}) {
  return (
    <figure className={className} style={{ margin: 0 }}>
      <div className="plate reveal" style={{ aspectRatio: ratio }}>
        <Image
          src={plate.src}
          alt={plate.alt}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectPosition: plate.position || "center 42%" }}
        />
      </div>
      <figcaption className="caption">{plate.caption}</figcaption>
    </figure>
  );
}
