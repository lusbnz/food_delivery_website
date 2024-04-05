"use client";

import React from "react";
import Image from "next/image";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, alt }) => {
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = "temporary/m1.png";
  };

  return (
    <Image
      src={src}
      alt={alt}
      className="object-contain"
      fill
      onError={handleImageError}
    />
  );
};

export default ImageWithFallback;
