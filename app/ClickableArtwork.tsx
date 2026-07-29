"use client";

import { useRef, useState } from "react";
import imageManifestData from "./image-manifest.json";

type ImageManifestEntry = {
  src: string;
  srcSet: string;
  width: number;
  height: number;
};

const imageManifest = imageManifestData as Record<string, ImageManifestEntry>;
const transparentPixel =
  "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

type ClickableArtworkProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
  sizes?: string;
  fetchPriority?: "high" | "low" | "auto";
  media?: string;
};

export function ClickableArtwork({
  src,
  alt,
  className = "",
  loading = "lazy",
  sizes = "(max-width: 600px) 46vw, (max-width: 900px) 92vw, 24vw",
  fetchPriority = "auto",
  media,
}: ClickableArtworkProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const preview = imageManifest[src];

  const openArtwork = () => {
    setIsOpen(true);
    dialogRef.current?.showModal();
  };

  const closeArtwork = () => {
    dialogRef.current?.close();
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className={`artwork-trigger ${className}`.trim()}
        aria-label={`Open full-size view: ${alt}`}
        onClick={openArtwork}
      >
        {preview ? (
          <picture>
            <source
              type="image/webp"
              media={media}
              srcSet={preview.srcSet}
              sizes={sizes}
            />
            <img
              src={media ? transparentPixel : preview.src}
              alt={alt}
              loading={loading}
              fetchPriority={fetchPriority}
              decoding="async"
              width={preview.width}
              height={preview.height}
            />
          </picture>
        ) : (
          <img
            src={src}
            alt={alt}
            loading={loading}
            fetchPriority={fetchPriority}
            decoding="async"
          />
        )}
        <span className="artwork-trigger__hint" aria-hidden="true">View</span>
      </button>
      <dialog
        ref={dialogRef}
        className="artwork-lightbox"
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeArtwork();
          }
        }}
      >
        <div className="artwork-lightbox__content">
          <button
            type="button"
            className="artwork-lightbox__close"
            aria-label="Close full-size image"
            onClick={closeArtwork}
          >
            ×
          </button>
          {isOpen ? <img src={src} alt={alt} decoding="async" /> : null}
          <p>{alt}</p>
        </div>
      </dialog>
    </>
  );
}
