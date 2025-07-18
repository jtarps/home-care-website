import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceImageProps {
  src: string;
  alt: string;
  title: string;
  className?: string;
}

export default function ServiceImage({
  src,
  alt,
  title,
  className = "",
}: ServiceImageProps) {
  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <div className="aspect-video relative bg-muted">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-4 left-4">
          <h3 className="text-white font-semibold text-lg drop-shadow-lg">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}
