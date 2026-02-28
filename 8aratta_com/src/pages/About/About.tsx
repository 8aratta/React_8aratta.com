import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useTheme } from '../../contexts';
import styles from './About.module.css';

/**
 * Custom hook: applies a `.visible` class when the element scrolls into view.
 * Uses the snap-scroll container as the IntersectionObserver root.
 */
function useScrollReveal(
  scrollRoot: React.RefObject<HTMLDivElement | null>,
  threshold = 0.15
) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el); // reveal once only
        }
      },
      { threshold, root: scrollRoot.current }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, scrollRoot]);

  return { ref, isVisible };
}

function About() {
  const { theme } = useTheme();
  const logo = theme === 'dark' ? '/assets/images/logo_white.png' : '/assets/images/logo.png';

  // Ref for the snap-scroll container
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax offset for hero background
  const heroRef = useRef<HTMLDivElement>(null);
  const [parallaxY, setParallaxY] = useState(0);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (heroRef.current && container) {
      const rect = heroRef.current.getBoundingClientRect();
      // Only apply when hero is still partially in view
      if (rect.bottom > 0) {
        setParallaxY(container.scrollTop * 0.3);
      }
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Scroll-reveal for each narrative section
  const description = useScrollReveal(containerRef, 0.15);
  const purpose = useScrollReveal(containerRef, 0.15);
  const identity = useScrollReveal(containerRef, 0.15);
  const whyEight = useScrollReveal(containerRef, 0.15);

  return (
    <div className={styles.aboutPage} data-theme={theme} ref={containerRef}>

      {/* ─── Section 1: Hero ─── */}
      <section className={`${styles.section} ${styles.heroSection}`} ref={heroRef}>
        <div className={styles.heroBackground}>
          <div
            className={styles.heroBgGradient}
            style={{ transform: `translateY(${parallaxY * 0.15}px)` }}
          />
          <img
            src="/assets/images/enso.png"
            alt=""
            className={styles.heroEnso}
            aria-hidden="true"
            draggable={false}
          />
        </div>

        <div className={styles.heroContent}>
          <img
            src={logo}
            alt="8aratta logo"
            className={styles.heroLogo}
            draggable={false}
          />
          <h1 className={styles.heroTitle}>
            About <span className={styles.heroTitleAccent}>8</span>aratta
          </h1>
          <p className={styles.heroSubtitle}>Personal Label · Portfolio · Creative Outlet</p>
        </div>

        <div className={styles.scrollIndicator}>
          <span className={styles.scrollLine} />
          <span className={styles.scrollLabel}>Scroll</span>
        </div>
      </section>

      {/* ─── Section 2: Description ─── */}
      <section className={`${styles.section} ${styles.descriptionSection}`}>
        <div
          ref={description.ref}
          className={`${styles.sectionInner} ${styles.fromLeft} ${description.isVisible ? styles.visible : ''}`}
        >
          <p className={styles.descriptionLabel}>What is 8aratta</p>
          <p className={styles.descriptionText}>
            <span className={styles.descriptionHighlight}>8aratta</span> is a personal label — an
            unofficial brand representing my work, projects, and online presence. It reflects my
            identity and serves as a way to share my passions and creations with the world.
          </p>
        </div>
      </section>

      {/* ─── Section 3: Purpose ─── */}
      <section className={`${styles.section} ${styles.purposeSection}`}>
        <div
          ref={purpose.ref}
          className={`${styles.sectionInner} ${purpose.isVisible ? styles.visible : ''}`}
        >
          <div className={styles.purposeBorder}>
            <h2 className={styles.purposeTitle}>Purpose</h2>
            <p className={styles.purposeText}>
              8aratta functions as a portfolio, blog, and creative outlet for my web design and
              development work.
            </p>
            <p className={styles.purposeText}>
              In simple terms, it's my personal website —{' '}
              <span className={styles.purposeEm}>still evolving, still being shaped, and still in progress.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ─── Section 4: Identity & Name Origin ─── */}
      <section className={`${styles.section} ${styles.identitySection}`}>
        <div
          ref={identity.ref}
          className={`${styles.sectionInner} ${styles.fromRight} ${identity.isVisible ? styles.visible : ''}`}
        >
          <div className={styles.identityContent}>
            <div className={styles.nameTransform}>
              <span className={styles.nameOriginal}>Baratta</span>
              <span className={styles.nameArrow}>→</span>
              <span className={styles.nameNew}>
                <span className={styles.nameEight}>8</span>aratta
              </span>
            </div>

            <p className={styles.identityText}>
              The name "8aratta" is derived from my last name "Baratta," with the letter "B" replaced
              by the number "8" to create a unique and memorable identity.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Section 5: Why 8? ─── */}
      <section className={`${styles.section} ${styles.whySection}`}>
        <div
          ref={whyEight.ref}
          className={`${styles.sectionInner} ${whyEight.isVisible ? styles.visible : ''}`}
        >
          <h2 className={styles.whyTitle}>Why the number 8?</h2>

          <p className={styles.whyText}>
            People often ask why the number eight. There isn't a deep symbolic reason — it was a
            creative choice I naturally grew into. I liked the visual symmetry and aesthetic of the
            number.
          </p>

          <div className={styles.coincidences}>
            <div className={styles.coincidenceCard}>
              <div className={styles.coincidenceNumber}>8</div>
              <div className={styles.coincidenceLabel}>
                Letters in<br />"Domenico"
              </div>
            </div>
            <div className={styles.coincidenceCard}>
              <div className={styles.coincidenceNumber}>8/8</div>
              <div className={styles.coincidenceLabel}>
                St. Dominic's Day<br />August 8th
              </div>
            </div>
          </div>

          <p className={styles.whyClosing}>
            But ultimately, it's simply a{' '}
            <span className={styles.whyClosingAccent}>personal stylistic decision</span>{' '}
            that felt right for my online identity.
          </p>
        </div>
      </section>
    </div>
  );
}

export default About;
