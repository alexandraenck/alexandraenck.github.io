const designWork = [
  { src: "/portfolio/design/49d14d2b61411227.png", title: "Sweaterchef Logo" },
  { src: "/portfolio/design/14a69637ab56fcfd.jpg", title: "Landing Page" },
  { src: "/portfolio/design/53ce7fd1ec800bca.jpeg", title: "Clothing Tags" },
  { src: "/portfolio/design/cf6b79ad9716518c.jpg", title: "MM Logo" },
  { src: "/portfolio/design/6d5fd406b2074767.png", title: "Identity Study" },
  { src: "/portfolio/design/d8ac73cbce0988ed.jpeg", title: "Wildly Out" },
  { src: "/portfolio/design/b4b0557f12ec997e.jpg", title: "Brand Application" },
];

const knitwearWork = [
  "d427cf5ad9d08180.jpeg",
  "137892e9098af142.jpg",
  "990692caa37f7340.jpg",
  "87c4080cd27320c0.jpg",
  "4061d171603af883.jpg",
  "f1f624328c8b0374.jpeg",
  "d04e88dd7366293e.jpeg",
  "500da5f0f92e7f97.jpg",
  "534e9f5d09f237d3.jpeg",
  "321109c7d2133179.jpg",
  "3046a4697affddfc.jpg",
  "4e8ea318c6656dd9.jpg",
  "df96ac12037d54fd.JPG",
  "0f5d7596f1e0b9cb.jpg",
  "c61b66df583c6a45.jpg",
  "2e343b45ddeb391b.jpg",
  "899e600e7c59bec2.jpg",
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Alexandra Enck, home">
          <img
            src="/portfolio/brand/alexandra-enck-mark.jpg"
            alt="Alexandra J. Enck"
          />
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a className="nav-cta" href="#contact">Let&apos;s talk ↗</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Multidisciplinary creative · Selected work 2024</p>
          <h1>
            Ideas with
            <br />
            <em>texture.</em>
          </h1>
          <p className="hero-intro">
            A living archive of illustration, identity, knitwear, and work made
            for the screen.
          </p>
          <a className="circle-link" href="#work" aria-label="Explore selected work">
            Explore
            <br />↓
          </a>
        </div>
        <div className="hero-art" aria-label="Featured work">
          <figure className="hero-image hero-image-main">
            <img
              src="/portfolio/knitwear/d427cf5ad9d08180.jpeg"
              alt="Sculptural grey knit sweater designed by Alexandra Enck"
            />
          </figure>
          <figure className="hero-image hero-image-float">
            <img
              src="/portfolio/design/49d14d2b61411227.png"
              alt="Purple Sweaterchef logo designed by Alexandra Enck"
            />
          </figure>
          <span className="scribble">made by hand</span>
        </div>
        <div className="hero-index" aria-hidden="true">01—03</div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div>
          <span>Graphic Design ✦</span><span>Knitwear ✦</span>
          <span>Television ✦</span><span>Graphic Design ✦</span>
          <span>Knitwear ✦</span><span>Television ✦</span>
        </div>
      </div>

      <section className="work-index section-pad" id="work">
        <div className="section-heading">
          <p className="eyebrow">Selected disciplines</p>
          <h2>Work, in three acts.</h2>
        </div>
        <div className="project-links">
          <a href="#design">
            <span className="project-number">01</span>
            <span className="project-name">Design</span>
            <span className="project-note">Identity / Digital / Print</span>
            <span className="project-arrow">↘</span>
          </a>
          <a href="#knitwear">
            <span className="project-number">02</span>
            <span className="project-name">Knitwear</span>
            <span className="project-note">Form / Fiber / Detail</span>
            <span className="project-arrow">↘</span>
          </a>
          <a href="#television">
            <span className="project-number">03</span>
            <span className="project-name">Television</span>
            <span className="project-note">Commercial / Screen</span>
            <span className="project-arrow">↘</span>
          </a>
        </div>
      </section>

      <section className="project-section design-section" id="design">
        <div className="project-kicker light">
          <span>01 / Design</span>
          <span>Identity, digital &amp; print</span>
        </div>
        <div className="design-intro">
          <h2>Playful by<br /><em>design.</em></h2>
          <p>
            Brand marks, web concepts, and physical touchpoints that pair
            energetic visuals with clear communication.
          </p>
        </div>
        <div className="design-grid">
          {designWork.map((item, index) => (
            <figure className={`design-card card-${index + 1}`} key={item.src}>
              <div className="image-wrap">
                <img src={item.src} alt={`${item.title} by Alexandra Enck`} />
              </div>
              <figcaption>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="project-section knitwear-section" id="knitwear">
        <div className="project-kicker">
          <span>02 / Knitwear</span>
          <span>Selected constructions</span>
        </div>
        <div className="knitwear-intro">
          <h2>Soft structure.<br />Strong <em>point of view.</em></h2>
          <p>
            An exploration of silhouette, stitch, and unexpected construction—
            each piece considered from fiber to final form.
          </p>
        </div>
        <div className="knitwear-grid">
          {knitwearWork.map((file, index) => (
            <figure key={file}>
              <img
                src={`/portfolio/knitwear/${file}`}
                alt={`Alexandra Enck knitwear study ${String(index + 1).padStart(2, "0")}`}
                loading={index > 5 ? "lazy" : "eager"}
              />
              <figcaption>Study {String(index + 1).padStart(2, "0")}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="project-section television-section" id="television">
        <div className="project-kicker light">
          <span>03 / Television</span>
          <span>Commercial work</span>
        </div>
        <div className="tv-grid">
          <div>
            <p className="eyebrow">Featured reel</p>
            <h2>Made for<br />the <em>screen.</em></h2>
            <p>
              Commercial work with a sharp sense of story, pace, and visual
              character.
            </p>
          </div>
          <div className="video-shell">
            <iframe
              src="https://www-ccv.adobe.io/v1/player/ccv/KRTHs7gpr6g/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View"
              title="Alexandra Enck commercial reel"
              allow="autoplay; fullscreen"
              loading="lazy"
              allowFullScreen
            />
            <span>Commercial reel · Geico commercial</span>
          </div>
        </div>
      </section>

      <section className="about section-pad" id="about">
        <p className="eyebrow">About the practice</p>
        <div className="about-grid">
          <h2>
            Across disciplines,
            <br />the idea comes <em>first.</em>
          </h2>
          <div>
            <p>
              Alexandra Enck is a multidisciplinary creative working across
              illustration, design, knitwear, and television. Her portfolio
              moves fluidly between tactile craft and bold visual systems.
            </p>
            <p className="about-small">
              This archive brings those threads together—one practice, many
              materials.
            </p>
          </div>
        </div>
      </section>

      <footer id="contact">
        <div className="footer-top">
          <p className="eyebrow">Have a project in mind?</p>
          <h2>Let&apos;s make<br /><em>something good.</em></h2>
          <a
            className="contact-link"
            href="https://alexandraenck.myportfolio.com/contact"
            target="_blank"
            rel="noreferrer"
          >
            Start a conversation <span>↗</span>
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Alexandra Enck</span>
          <span>Illustration · Design · Knitwear · Television</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
