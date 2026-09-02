"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

type SmartImageProps = Omit<ImageProps, "onError"> & {
  label?: string;
  wrapperClassName?: string;
};

/**
 * Wraps next/image with a graceful fallback: demo images are hotlinked from
 * Unsplash, and if a given photo ever 404s, we render a themed gradient
 * placeholder instead of a broken-image icon.
 */
export default function SmartImage({
  label,
  wrapperClassName,
  className,
  alt,
  fill,
  ...props
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-sand via-cream to-line text-center",
          fill ? "absolute inset-0" : "",
          wrapperClassName,
          className
        )}
        role="img"
        aria-label={alt as string}
      >
        <span className="px-4 font-serif-display text-sm tracking-wide text-ink-soft/70">
          {label ?? alt}
        </span>
      </div>
    );
  }

  return (
    <Image
      alt={alt}
      fill={fill}
      className={className}
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
