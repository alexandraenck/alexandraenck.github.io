"use client";

import { useEffect, useRef } from "react";

const pixelColors = [
  "var(--pink)",
  "var(--mint)",
  "var(--mint)",
  "var(--lilac)",
  "var(--cobalt)",
  "var(--pink)",
  "var(--mint)",
  "var(--mint)",
];

export function PixelTrail() {
  const trailRef = useRef<HTMLDivElement>(null);
  const pixelRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const canFollow =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canFollow) return;

    const target = { x: -40, y: -40 };
    const positions = pixelColors.map(() => ({ x: -40, y: -40 }));
    let animationFrame = 0;

    const move = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      const trail = trailRef.current;
      const hoveredElement =
        event.target instanceof Element
          ? event.target.closest(
              'a, button, summary, input, textarea, select, label, [role="button"]',
            )
          : null;

      trail?.classList.add("is-visible");
      trail?.classList.toggle("is-interactive", Boolean(hoveredElement));
    };

    const hide = () => {
      trailRef.current?.classList.remove("is-visible", "is-interactive");
    };

    const animate = () => {
      positions.forEach((position, index) => {
        const leader = index === 0 ? target : positions[index - 1];
        const ease = Math.max(0.18, 0.48 - index * 0.04);
        position.x += (leader.x - position.x) * ease;
        position.y += (leader.y - position.y) * ease;

        const pixel = pixelRefs.current[index];
        if (pixel) {
          pixel.style.transform = `translate3d(${position.x}px, ${position.y}px, 0) rotate(${index * 9}deg)`;
        }
      });

      animationFrame = window.requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", hide);
    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", hide);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="pixel-trail" ref={trailRef} aria-hidden="true">
      {pixelColors.map((color, index) => (
        <span
          className="pixel-trail__pixel"
          key={`${color}-${index}`}
          ref={(element) => {
            pixelRefs.current[index] = element;
          }}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}
