"use client";

import { useState } from "react";
import { ClickableArtwork } from "./ClickableArtwork";

type IllustrationItem = {
  file: string;
  number: number;
};

export function IllustrationArchive({ items }: { items: IllustrationItem[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <details
      className="illustration-archive"
      onToggle={(event) => setIsOpen(event.currentTarget.open)}
    >
      <summary>
        <span className="archive-summary-copy">
          <strong>View all illustrations</strong>
          <small>{items.length} more works from the complete archive</small>
        </span>
        <span className="archive-summary-action archive-summary-action--open">
          Open archive ↓
        </span>
        <span className="archive-summary-action archive-summary-action--close">
          Close archive ↑
        </span>
      </summary>
      {isOpen ? (
        <div className="illustration-grid illustration-grid--archive">
          {items.map((item) => (
            <figure key={item.file}>
              <ClickableArtwork
                src={`/portfolio/illustration/${item.file}`}
                alt={`Alexandra Enck illustration ${String(item.number).padStart(2, "0")}`}
                loading="lazy"
                sizes="(max-width: 600px) 46vw, 20vw"
              />
              <figcaption>
                Illustration {String(item.number).padStart(2, "0")}
              </figcaption>
            </figure>
          ))}
        </div>
      ) : null}
    </details>
  );
}
