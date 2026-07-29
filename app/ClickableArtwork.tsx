"use client";

import { useRef } from "react";

type ClickableArtworkProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
};

export function ClickableArtwork({
  src,
  alt,
  className = "",
  loading = "lazy",
}: ClickableArtworkProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        className={`artwork-trigger ${className}`.trim()}
        aria-label={`Open full-size view: ${alt}`}
        onClick={() => dialogRef.current?.showModal()}
      >
        <img src={src} alt={alt} loading={loading} />
        <span className="artwork-trigger__hint" aria-hidden="true">View</span>
      </button>
      <dialog
        ref={dialogRef}
        className="artwork-lightbox"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            event.currentTarget.close();
          }
        }}
      >
        <div className="artwork-lightbox__content">
          <button
            type="button"
            className="artwork-lightbox__close"
            aria-label="Close full-size image"
            onClick={() => dialogRef.current?.close()}
          >
            ×
          </button>
          <img src={src} alt={alt} />
          <p>{alt}</p>
        </div>
      </dialog>
    </>
  );
}
