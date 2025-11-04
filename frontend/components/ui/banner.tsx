"use client";

import Image from "next/image";

export function Banner() {
  return (
    <div className="relative w-full h-[300px] bg-primary/5">
      <div className="absolute inset-0 bg-linear-to-r from-primary/90 to-background/50 z-10" />
      {/* <Image
        src="/banner.jpg"
        alt="Banner Marketplace"
        fill
        className="object-cover"
        priority
      /> */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Marketplace de ONGs
        </h1>
        <p className="text-lg md:text-xl text-muted max-w-2xl">
          Apoie organizações sociais comprando produtos artesanais e sustentáveis
        </p>
      </div>
    </div>
  );
}