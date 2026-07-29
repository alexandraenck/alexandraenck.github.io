"use client";

import { useState } from "react";

const videoUrl =
  "https://www-ccv.adobe.io/v1/player/ccv/KRTHs7gpr6g/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View";

export function DeferredVideo() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="video-shell">
      {isPlaying ? (
        <iframe
          src={videoUrl}
          title="Alexandra Enck commercial reel"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      ) : (
        <button
          className="video-poster"
          type="button"
          onClick={() => setIsPlaying(true)}
          aria-label="Play Alexandra Enck commercial reel"
        >
          <span className="video-poster__eyebrow">Commercial reel</span>
          <span className="video-poster__title">Geico commercial</span>
          <span className="video-poster__play" aria-hidden="true">▶</span>
        </button>
      )}
      <span>Commercial reel · Geico commercial</span>
    </div>
  );
}
