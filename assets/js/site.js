const portfolioRoot = "assets/images/portfolio";
const imageManifest = window.portfolioImageManifest;

const designWork = [
  { file: "49d14d2b61411227.png", title: "Sweaterchef Logo" },
  { file: "14a69637ab56fcfd.jpg", title: "Landing Page" },
  { file: "53ce7fd1ec800bca.jpeg", title: "Clothing Tags" },
  { file: "cf6b79ad9716518c.jpg", title: "MM Logo" },
  { file: "6d5fd406b2074767.png", title: "Identity Study" },
  { file: "d8ac73cbce0988ed.jpeg", title: "Wildly Out" },
  { file: "b4b0557f12ec997e.jpg", title: "Brand Application" },
];

const featuredKnitwear = [
  "d427cf5ad9d08180.jpeg",
  "3046a4697affddfc.jpg",
  "321109c7d2133179.jpg",
  "990692caa37f7340.jpg",
  "0f5d7596f1e0b9cb.jpg",
  "d04e88dd7366293e.jpeg",
  "4061d171603af883.jpg",
  "500da5f0f92e7f97.jpg",
  "534e9f5d09f237d3.jpeg",
  "137892e9098af142.jpg",
];

const archivedKnitwear = [
  "87c4080cd27320c0.jpg",
  "f1f624328c8b0374.jpeg",
  "4e8ea318c6656dd9.jpg",
  "df96ac12037d54fd.JPG",
  "c61b66df583c6a45.jpg",
  "2e343b45ddeb391b.jpg",
  "899e600e7c59bec2.jpg",
];

const featuredIllustrations = [1, 6, 7, 8, 14, 3, 29, 30, 42, 43];
const pngIllustrations = new Set([13, 30, 37, 40, 43, 44]);

function illustrationFile(number) {
  const extension = number === 46 ? "jpeg" : pngIllustrations.has(number) ? "png" : "jpg";
  return `${String(number).padStart(2, "0")}.${extension}`;
}

const archivedIllustrations = Array.from({ length: 52 }, (_, index) => index + 1)
  .filter((number) => !featuredIllustrations.includes(number));

// Gallery rendering ---------------------------------------------------------

function artworkButton({ source, alt, sizes, manifest }) {
  const preview = manifest[source];
  if (!preview) {
    return "";
  }

  return `
    <button
      class="artwork-trigger"
      type="button"
      data-full="${source}"
      data-alt="${alt}"
      aria-label="Open full-size view: ${alt}"
    >
      <picture>
        <source
          type="image/webp"
          srcset="${preview.srcSet}"
          sizes="${sizes}"
        />
        <img
          src="${preview.src}"
          alt="${alt}"
          loading="lazy"
          decoding="async"
          width="${preview.width}"
          height="${preview.height}"
        />
      </picture>
      <span class="artwork-trigger__hint" aria-hidden="true">View</span>
    </button>
  `;
}

function renderIllustrations(container, numbers, manifest) {
  container.innerHTML = numbers
    .map((number) => {
      const label = String(number).padStart(2, "0");
      const source = `${portfolioRoot}/illustration/${illustrationFile(number)}`;
      return `
        <figure>
          ${artworkButton({
            source,
            alt: `Alexandra Enck illustration ${label}`,
            sizes: "(max-width: 600px) 46vw, 20vw",
            manifest,
          })}
          <figcaption>Illustration ${label}</figcaption>
        </figure>
      `;
    })
    .join("");
}

function renderDesign(manifest) {
  const container = document.querySelector("#design-grid");
  container.innerHTML = designWork
    .map((item, index) => {
      const source = `${portfolioRoot}/design/${item.file}`;
      const alt = `${item.title} by Alexandra Enck`;
      return `
        <figure class="design-card card-${index + 1}">
          <div class="image-wrap">
            ${artworkButton({
              source,
              alt,
              sizes: "(max-width: 600px) 46vw, (max-width: 900px) 80vw, 35vw",
              manifest,
            })}
          </div>
          <figcaption>
            <span>${String(index + 1).padStart(2, "0")}</span>
            ${item.title}
          </figcaption>
        </figure>
      `;
    })
    .join("");
}

function renderKnitwear(container, files, startingNumber, manifest) {
  container.innerHTML = files
    .map((file, index) => {
      const label = String(index + startingNumber).padStart(2, "0");
      const source = `${portfolioRoot}/knitwear/${file}`;
      return `
        <figure>
          ${artworkButton({
            source,
            alt: `Alexandra Enck knitwear ${label}`,
            sizes: "(max-width: 600px) 46vw, 20vw",
            manifest,
          })}
          <figcaption>Knitwear ${label}</figcaption>
        </figure>
      `;
    })
    .join("");
}

renderIllustrations(
  document.querySelector("#featured-illustrations"),
  featuredIllustrations,
  imageManifest,
);
renderDesign(imageManifest);
renderKnitwear(
  document.querySelector("#knitwear-grid"),
  featuredKnitwear,
  1,
  imageManifest,
);

const illustrationArchive = document.querySelector("#illustration-archive");
illustrationArchive.addEventListener("toggle", () => {
  if (!illustrationArchive.open || illustrationArchive.dataset.loaded) {
    return;
  }

  renderIllustrations(
    document.querySelector("#illustration-archive-grid"),
    archivedIllustrations,
    imageManifest,
  );
  illustrationArchive.dataset.loaded = "true";
});

const knitwearArchive = document.querySelector("#knitwear-archive");
knitwearArchive.addEventListener("toggle", () => {
  if (!knitwearArchive.open || knitwearArchive.dataset.loaded) {
    return;
  }

  renderKnitwear(
    document.querySelector("#knitwear-archive-grid"),
    archivedKnitwear,
    featuredKnitwear.length + 1,
    imageManifest,
  );
  knitwearArchive.dataset.loaded = "true";
});

// Shared full-size artwork viewer -------------------------------------------

const artworkDialog = document.querySelector("#artwork-lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");

function closeArtwork() {
  artworkDialog.close();
  lightboxImage.removeAttribute("src");
  lightboxImage.alt = "";
  lightboxCaption.textContent = "";
}

document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-full]");
  if (!trigger) {
    return;
  }

  lightboxImage.src = trigger.dataset.full;
  lightboxImage.alt = trigger.dataset.alt;
  lightboxCaption.textContent = trigger.dataset.alt;
  artworkDialog.showModal();
});

document.querySelector("#close-artwork").addEventListener("click", closeArtwork);
artworkDialog.addEventListener("click", (event) => {
  if (event.target === artworkDialog) {
    closeArtwork();
  }
});
artworkDialog.addEventListener("close", () => {
  lightboxImage.removeAttribute("src");
});

// Contact dialog ------------------------------------------------------------

const contactDialog = document.querySelector("#contact-dialog");
document.querySelector("#open-contact").addEventListener("click", () => {
  contactDialog.showModal();
});
document.querySelector("#close-contact").addEventListener("click", () => {
  contactDialog.close();
});
contactDialog.addEventListener("click", (event) => {
  if (event.target === contactDialog) {
    contactDialog.close();
  }
});

// Deferred commercial player -----------------------------------------------

document.querySelector("#video-poster").addEventListener("click", () => {
  const iframe = document.createElement("iframe");
  iframe.src =
    "https://www-ccv.adobe.io/v1/player/ccv/KRTHs7gpr6g/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View";
  iframe.title = "Alexandra Enck commercial reel";
  iframe.allow = "autoplay; fullscreen";
  iframe.allowFullscreen = true;
  document.querySelector("#video-poster").replaceWith(iframe);
});

// Desktop cursor trail ------------------------------------------------------

const trail = document.querySelector(".pixel-trail");
const pixels = [...document.querySelectorAll(".pixel-trail__pixel")];
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

pixelColors.forEach((color, index) => {
  pixels[index].style.backgroundColor = color;
});

const canFollow =
  window.matchMedia("(pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canFollow) {
  const target = { x: -40, y: -40 };
  const positions = pixels.map(() => ({ x: -40, y: -40 }));

  window.addEventListener(
    "pointermove",
    (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
      const hoveredElement = event.target.closest(
        'a, button, summary, input, textarea, select, label, [role="button"]',
      );
      trail.classList.add("is-visible");
      trail.classList.toggle("is-interactive", Boolean(hoveredElement));
    },
    { passive: true },
  );

  document.documentElement.addEventListener("mouseleave", () => {
    trail.classList.remove("is-visible", "is-interactive");
  });

  function animateTrail() {
    positions.forEach((position, index) => {
      const leader = index === 0 ? target : positions[index - 1];
      const ease = Math.max(0.18, 0.48 - index * 0.04);
      position.x += (leader.x - position.x) * ease;
      position.y += (leader.y - position.y) * ease;
      pixels[index].style.transform =
        `translate3d(${position.x}px, ${position.y}px, 0) rotate(${index * 9}deg)`;
    });
    window.requestAnimationFrame(animateTrail);
  }

  window.requestAnimationFrame(animateTrail);
}

document.querySelector("#current-year").textContent = new Date().getFullYear();
