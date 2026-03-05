import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '../../contexts';
import styles from './Travel.module.css';

// ─── Scroll-reveal hook ────────────────────────────────────────────────────────
// Fires once when the element intersects the viewport (or scroll root).
function useScrollReveal(
  scrollRoot: React.RefObject<HTMLDivElement | null>,
  threshold = 0.2
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
          observer.unobserve(el);
        }
      },
      { threshold, root: scrollRoot.current }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, scrollRoot]);

  return { ref, isVisible };
}

// ─── Active section tracking ────────────────────────────────────────────────────
// Returns which dot index is active based on scroll position.
function Travel() {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  // Section dot tracking
  const [activeDot, setActiveDot] = useState(0);
  const sectionRefs = [
    useRef<HTMLElement>(null), // hero
    useRef<HTMLElement>(null), // tokyo · vending machine
    useRef<HTMLElement>(null), // tokyo · shibuya
    useRef<HTMLElement>(null), // tokyo · kokyo gaien
    useRef<HTMLElement>(null), // tokyo · animal cafes
    useRef<HTMLElement>(null), // nara
    useRef<HTMLElement>(null), // osaka
    useRef<HTMLElement>(null), // kyoto · walk
    useRef<HTMLElement>(null), // kyoto · fushimi inari
    useRef<HTMLElement>(null), // hakone · onsen
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const viewH = container.clientHeight;

      let best = 0;
      sectionRefs.forEach((ref, i) => {
        if (!ref.current) return;
        const { offsetTop } = ref.current as HTMLElement;
        if (scrollTop >= offsetTop - viewH * 0.5) best = i;
      });
      setActiveDot(best);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reveal hooks — one per animated block
  const vendingReveal       = useScrollReveal(containerRef, 0.2);
  const shibuyaReveal       = useScrollReveal(containerRef, 0.2);
  const kokyoReveal         = useScrollReveal(containerRef, 0.2);
  const cafeReveal          = useScrollReveal(containerRef, 0.2);
  const cafePolaroidReveal  = useScrollReveal(containerRef, 0.15);
  const naraReveal          = useScrollReveal(containerRef, 0.2);
  const polaroidReveal      = useScrollReveal(containerRef, 0.15);
  const osakaReveal         = useScrollReveal(containerRef, 0.2);
  const kyotoReveal         = useScrollReveal(containerRef, 0.2);
  const kyotoPolaroidReveal = useScrollReveal(containerRef, 0.15);
  const fushimiReveal       = useScrollReveal(containerRef, 0.2);
  const onsenReveal         = useScrollReveal(containerRef, 0.2);

  const dots = ['Hero', 'Vending Machine', 'Shibuya', 'Kokyo Gaien', 'Animal Cafes', 'Nara', 'Osaka', 'Kyoto', 'Fushimi Inari', 'Onsen'];

  return (
    <div
      className={styles.travelPage}
      data-theme={theme}
      ref={containerRef}
    >
      {/* ─── Section indicator dots ─────────────────────────────────────── */}
      <div className={styles.sectionDots} aria-hidden="true">
        {dots.map((_, i) => (
          <div
            key={i}
            className={`${styles.dot} ${activeDot === i ? styles.active : ''}`}
          />
        ))}
      </div>

      {/* ═════ SECTION 1 — JAPAN 2023 ══════════════ */}
      <section
        className={styles.heroSection}
        ref={sectionRefs[0] as React.RefObject<HTMLElement>}
      >
        <div className={styles.heroBg} />

        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Travel Diaries</p>
          <h1 className={styles.heroTitle}>Japan 2023</h1>
          <p className={styles.heroSubtitle}>Spring · Tokyo · Kyoto · Nara · Osaka · Hakone</p>
          <p className={styles.heroPreamble}>
            Follow me and my partner, where we spent three weeks across Japan — convenience-store dinners, ancient parks, deer that steal your
            snacks, and a mountain ryokan with a private hot spring under the stars.
          </p>
        </div>

        <div className={styles.scrollIndicator} aria-hidden="true">
          <span className={styles.scrollLine} />
          <span className={styles.scrollLabel}>Scroll</span>
        </div>
      </section>

      {/* ══════ STORY 1 — TOKYO ══════════════ */}
      <section
        className={styles.storySection}
        ref={sectionRefs[1] as React.RefObject<HTMLElement>}
      >
        {/* Background image */}
        <img
          src="/assets/media/Japan 2023/Vending Machine.jpeg"
          alt="A glowing vending machine on a quiet Tokyo street at night"
          className={styles.mediaBg}
          draggable={false}
        />

        {/* Directional overlay */}
        <div className={styles.mediaOverlay} aria-hidden="true" />

        {/* Text panel */}
        <div
          ref={vendingReveal.ref}
          className={`${styles.textPanel} ${styles.fromLeft} ${vendingReveal.isVisible ? styles.visible : ''}`}
        >
          <span className={styles.storyTag}>Tokyo · A Convenience Culture</span>
          <h2 className={styles.storyTitle}>Every Corner,<br />a new discovery</h2>
          <div className={styles.storySeparator} />
          <p className={styles.storyBody}>
            You can't walk more than a few blocks in Japan without passing a vending machine.
            They're tucked into side streets, squeezed between apartment buildings, illuminating
            back alleys at midnight. Hot canned coffee, ice-cold tea, bottles of water, sports
            drinks — all standing at permanent attention, waiting for you.
          </p>
          <p className={styles.storyBody}>
            They became our{' '}
            <span className={styles.storyHighlight}>lifesavers on spontaneous late-night walks</span>{' '}
            through the city. After missing the last train and wandering through a residential
            neighbourhood at 1 a.m., a glowing machine around the corner felt like the most
            reliable thing in the world. ¥130 for a cold drink and an excuse to keep walking.
          </p>
          <p className={styles.storyBody}>
            Japan treats its vending machines almost like infrastructure — maintained, stocked,
            never vandalized. They were the first thing I noticed flying in, and the last thing I
            photographed before heading to Narita.
          </p>
        </div>
      </section>

      {/* ══════ STORY 2 — TOKYO · SHIBUYA ══════════════ */}
      <section
        className={`${styles.storySection} ${styles.textRight}`}
        ref={sectionRefs[2] as React.RefObject<HTMLElement>}
      >
        {/* Background video — ambient, muted, looped */}
        <video
          className={`${styles.mediaBg} ${styles.blurredVideo}`}
          src="/assets/media/Japan 2023/Tokyo - Shibuya.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />

        {/* Directional overlay */}
        <div className={styles.mediaOverlay} aria-hidden="true" />

        {/* Text panel */}
        <div
          ref={shibuyaReveal.ref}
          className={`${styles.textPanel} ${styles.fromRight} ${shibuyaReveal.isVisible ? styles.visible : ''}`}
        >
          <span className={styles.storyTag}>Tokyo · Shibuya</span>
          <h2 className={styles.storyTitle}>The Beat That<br />Never Stops</h2>
          <div className={styles.storySeparator} />
          <p className={styles.storyBody}>
            Shibuya is the visual heart of Tokyo — the crossing, the neon, the density of it all
            moving at once. Standing at the scramble, watching hundreds of people crisscross in
            every direction without a single collision, feels almost choreographed.
          </p>
          <p className={styles.storyBody}>
            Donki — Don Quijote — became our late-night anchor.{' '}
            <span className={styles.storyHighlight}>Multi-floor stores crammed floor to ceiling with everything imaginable</span>,
            a jingle that plays on loop and somehow becomes the background music of your whole
            trip. Every time we heard it drifting out of a doorway onto the street, it meant we
            were exactly where we wanted to be.
          </p>
          <p className={styles.storyBody}>
            Everything moves in Shibuya. The crowds, the trains, the screens. And yet it never
            feels chaotic — it has a rhythm to it, a frequency you eventually start to tune into.
          </p>
        </div>
      </section>

      {/* ════ STORY 3 — TOKYO · KOKYO GAIEN ══════════════ */}
      <section
        className={styles.storySection}
        ref={sectionRefs[3] as React.RefObject<HTMLElement>}
      >
        {/* Background video — ambient, muted, looped */}
        <video
          className={styles.mediaBg}
          src="/assets/media/Japan 2023/Kokyo Gaien National Garden.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />

        {/* Directional overlay */}
        <div className={styles.mediaOverlay} aria-hidden="true" />

        {/* Text panel */}
        <div
          ref={kokyoReveal.ref}
          className={`${styles.textPanel} ${styles.fromLeft} ${kokyoReveal.isVisible ? styles.visible : ''}`}
        >
          <span className={styles.storyTag}>Tokyo · Imperial District</span>
          <h2 className={styles.storyTitle}>A Quiet Garden<br />We Almost Missed</h2>
          <div className={styles.storySeparator} />
          <p className={styles.storyBody}>
            We'd spent the morning at the Imperial Palace — or rather, at its outer gardens, since
            the palace itself is off-limits. Steeped in history, surrounded by ancient moats and
            stone walls, it carries a quiet dignity right in the heart of Tokyo.
          </p>
          <p className={styles.storyBody}>
            On the walk back, looking for a place to rest, we drifted into the{' '}
            <span className={styles.storyHighlight}>Kokyo Gaien National Garden</span> — the vast
            gravel esplanade stretching in front of the palace. Wide open space, centuries-old pine
            trees, and almost no one around.
          </p>
          <p className={styles.storyBody}>
            We sat down on a bench and just stayed there for a while. No agenda. The bustle of
            Marunouchi a few minutes away felt like another world. One of those unplanned
            moments that ends up being the memory you carry home.
          </p>
        </div>
      </section>

      {/* ════ STORY 4 — TOKYO · ANIMAL CAFES ══════════════ */}
      <section
        className={`${styles.storySection} ${styles.textRight}`}
        ref={sectionRefs[4] as React.RefObject<HTMLElement>}
      >
        {/* Background video — ambient, muted, looped */}
        <video
          className={styles.mediaBg}
          src="/assets/media/Japan 2023/Shiba Cafe.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />

        {/* Directional overlay */}
        <div className={styles.mediaOverlay} aria-hidden="true" />

        {/* Text panel */}
        <div
          ref={cafeReveal.ref}
          className={`${styles.textPanel} ${styles.fromRight} ${cafeReveal.isVisible ? styles.visible : ''}`}
        >
          <span className={styles.storyTag}>Tokyo · Animal Cafes</span>
          <h2 className={styles.storyTitle}>Controversial,<br />but Complicated</h2>
          <div className={styles.storySeparator} />
          <p className={styles.storyBody}>
            Animal cafes are one of those things Japan is known for that carry a real debate
            behind them. Shiba Inus, hedgehogs, owls, capybaras — you can find a cafe for almost
            any animal in Tokyo. We visited a few, and the experience was genuinely lovely.
          </p>
          <p className={styles.storyBody}>
            The staff at each place clearly{' '}
            <span className={styles.storyHighlight}>prioritised the animals' wellbeing above everything else</span>.
            Animals had the option to retreat to off-limits areas. Visit times were capped.
            What surprised us most was how many of the animals were rescues — given a safe,
            enriched environment they wouldn't otherwise have had.
          </p>
          <p className={styles.storyBody}>
            It's a nuanced topic, and I understand both sides of it. But the care we witnessed
            firsthand left a strong impression. The My Pig Cafe was a particular highlight —
            a pen of genuinely relaxed, inquisitive little pigs who had clearly never known
            a bad day in their lives.
          </p>
        </div>

        {/* Polaroid inset — text is right, so polaroid goes left */}
        <div
          ref={cafePolaroidReveal.ref}
          className={`${styles.polaroidReveal} ${styles.polaroidRevealLeft} ${styles.polaroidWrapLeft} ${cafePolaroidReveal.isVisible ? styles.visible : ''}`}
        >
          <div className={styles.polaroid}>
            <img
              src="/assets/media/Japan 2023/Tokyo - MyPig Cafe.jpeg"
              alt="Eepy piggy"
              className={styles.polaroidImg}
              draggable={false}
            />
            <p className={styles.polaroidCaption}>Eepy piggy</p>
          </div>
        </div>
      </section>

      {/* ════ STORY 5 — NARA PARK ══════════════ */}
      <section
        className={styles.storySection}
        ref={sectionRefs[5] as React.RefObject<HTMLElement>}
      >
        {/* Background video — ambient, muted, looped */}
        <video
          className={styles.mediaBg}
          src="/assets/media/Japan 2023/Nara Deer Feeding.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />

        {/* Directional overlay */}
        <div className={styles.mediaOverlay} aria-hidden="true" />

        {/* Text panel */}
        <div
          ref={naraReveal.ref}
          className={`${styles.textPanel} ${styles.fromLeft} ${naraReveal.isVisible ? styles.visible : ''}`}
        >
          <span className={styles.storyTag}>Nara · Nara Park</span>
          <h2 className={styles.storyTitle}>The Deer<br />Who Bit Me</h2>
          <div className={styles.storySeparator} />
          <p className={styles.storyBody}>
            Nara Park is home to over a thousand sika deer that roam completely freely. You can
            buy little crackers — shika senbei — and the deer will swarm you the moment they
            catch wind of it. They've perfected the art of the polite headbutt.
          </p>
          <p className={styles.storyBody}>
            I ran out of crackers mid-transaction, and a particularly bold deer decided this was
            an unacceptable situation.{' '}
            <span className={styles.storyHighlight}>It sneaked up behind me and started nibbling on the kimono.</span>{' '}
            Not hard enough to hurt, but enough to make the point crystal clear. Peace was never an option if you run out of Crackers that is.
          </p>
          <p className={styles.storyBody}>
            The deer are weirdly tame and weirdly assertive at the same time. Ancient, semi-sacred
            animals wandering past thousand-year-old temples, completely unbothered by tourists,
            opportunistically extorting snacks out of anyone who makes eye contact.
          </p>
        </div>

        {/* Polaroid inset — text is left, so polaroid goes right */}
        <div
          ref={polaroidReveal.ref}
          className={`${styles.polaroidReveal} ${styles.polaroidWrapRight} ${polaroidReveal.isVisible ? styles.visible : ''}`}
        >
          <div className={styles.polaroid}>
            <img
              src="/assets/media/Japan 2023/Nara Deer.jpeg"
              alt="A sika deer in Nara Park"
              className={styles.polaroidImg}
              draggable={false}
            />
            <p className={styles.polaroidCaption}>The mischevious cracker goblin</p>
          </div>
        </div>
      </section>

      {/* ════ STORY 6 — OSAKA ══════════════ */}
      <section
        className={`${styles.storySection} ${styles.textRight}`}
        ref={sectionRefs[6] as React.RefObject<HTMLElement>}
      >
        {/* Background video — ambient, muted, looped */}
        <video
          className={styles.mediaBg}
          src="/assets/media/Japan 2023/Osaka - Train.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />

        {/* Directional overlay */}
        <div className={styles.mediaOverlay} aria-hidden="true" />

        {/* Text panel */}
        <div
          ref={osakaReveal.ref}
          className={`${styles.textPanel} ${styles.fromRight} ${osakaReveal.isVisible ? styles.visible : ''}`}
        >
          <span className={styles.storyTag}>Osaka · Japan's Kitchen</span>
          <h2 className={styles.storyTitle}>The City We<br />Ate Our Way Through</h2>
          <div className={styles.storySeparator} />
          <p className={styles.storyBody}>
            If there's one city in Japan that takes its food personally, it's Osaka. The locals
            have a phrase for it —{' '}
            <span className={styles.storyHighlight}>kuidaore, "eat until you drop"</span> — and they
            take it completely seriously. Street food, standing ramen bars, izakayas that don't
            open until midnight.
          </p>
          <p className={styles.storyBody}>
            We spent most of our time in Osaka with no real plan other than finding the next
            thing to eat. Takoyaki from a stall, then a bowl of okonomiyaki at a low counter,
            then just walking, digesting, ready to go again.
          </p>
          <p className={styles.storyBody}>
            The city has a different energy to Tokyo. Louder, more direct, unapologetically
            itself. The train system moves you through it efficiently, but the real experience
            happens the moment you step off and wander.
          </p>
        </div>
      </section>

      {/* ════ STORY 7 — KYOTO · HIGASHIYAMA ══════════════ */}
      <section
        className={styles.storySection}
        ref={sectionRefs[7] as React.RefObject<HTMLElement>}
      >
        {/* Background video — ambient, muted, looped */}
        <video
          className={styles.mediaBg}
          src="/assets/media/Japan 2023/Kyoto.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />

        {/* Directional overlay */}
        <div className={styles.mediaOverlay} aria-hidden="true" />

        {/* Text panel */}
        <div
          ref={kyotoReveal.ref}
          className={`${styles.textPanel} ${styles.fromLeft} ${kyotoReveal.isVisible ? styles.visible : ''}`}
        >
          <span className={styles.storyTag}>Kyoto · Cultural Heart</span>
          <h2 className={styles.storyTitle}>Where Japan<br />Remembers Itself</h2>
          <div className={styles.storySeparator} />
          <p className={styles.storyBody}>
            If Tokyo is Japan facing forward, Kyoto is Japan looking inward. The former imperial
            capital holds over a thousand temples and shrines, and an architectural language that
            has barely changed in centuries — narrow machiya townhouses, moss-covered stone paths,
            wooden gates weathered to a perfect amber.
          </p>
          <p className={styles.storyBody}>
            Walking through the Higashiyama district felt like a slow scroll through living
            history.{' '}
            <span className={styles.storyHighlight}>Every alley had a story embedded in its stonework.</span>{' '}
            Lanterns hung from eaves, incense drifted from shrines tucked between shops, and the
            sound of a shamisen floated somewhere above the rooftops.
          </p>
          <p className={styles.storyBody}>
            Kyoto doesn't just preserve its past — it inhabits it. You don't visit it so much as
            you step into it, briefly, before it lets you go.
          </p>
        </div>

        {/* Polaroid inset — text is left, so polaroid goes right */}
        <div
          ref={kyotoPolaroidReveal.ref}
          className={`${styles.polaroidReveal} ${styles.polaroidWrapRight} ${kyotoPolaroidReveal.isVisible ? styles.visible : ''}`}
        >
          <div className={styles.polaroid}>
            <img
              src="/assets/media/Japan 2023/Kyoto - Walk.jpeg"
              alt="Walking through a traditional Kyoto street"
              className={styles.polaroidImg}
              draggable={false}
            />
            <p className={styles.polaroidCaption}>Secluded Streets of Higashiyama</p>
          </div>
        </div>
      </section>

      {/* ════ STORY 8 — KYOTO · FUSHIMI INARI ══════════════ */}
      <section
        className={`${styles.storySection} ${styles.textRight}`}
        ref={sectionRefs[8] as React.RefObject<HTMLElement>}
      >
        {/* Background video — ambient, muted, looped */}
        <video
          className={styles.mediaBg}
          src="/assets/media/Japan 2023/Kyoto - Fushimi Inari Taisha Shrine.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />

        {/* Directional overlay */}
        <div className={styles.mediaOverlay} aria-hidden="true" />

        {/* Text panel */}
        <div
          ref={fushimiReveal.ref}
          className={`${styles.textPanel} ${styles.fromRight} ${fushimiReveal.isVisible ? styles.visible : ''}`}
        >
          <span className={styles.storyTag}>Kyoto · Fushimi Inari-taisha</span>
          <h2 className={styles.storyTitle}>Through Ten<br />Thousand Gates</h2>
          <div className={styles.storySeparator} />
          <p className={styles.storyBody}>
            Fushimi Inari-taisha is famous for its seemingly endless tunnel of vermillion torii
            gates climbing the forested mountainside behind the shrine. During the day the path
            is busy. At night, it transforms into something else entirely.
          </p>
          <p className={styles.storyBody}>
            We arrived after dark, when most tourists had left. The gates lit from below cast
            long orange shadows across each other, the trail disappearing up into the trees.{' '}
            <span className={styles.storyHighlight}>Lanterns marked the path toward the summit, cedar scent overwhelming everything.</span>
          </p>
          <p className={styles.storyBody}>
            Walking deeper into the mountain, the city sounds fell away entirely. Just the crunch
            of gravel, the distant flicker of votive candles, and thousands of gates standing
            sentinel in every direction. One of those places that stays with you.
          </p>
        </div>
      </section>

      {/* ═════ STORY 9 — HAKONE · RYOKAN ══════════════ */}
      <section
        className={`${styles.storySection}`}
        style={{ justifyContent: 'center', alignItems: 'flex-end' }}
        ref={sectionRefs[9] as React.RefObject<HTMLElement>}
      >
        {/* Background video */}
        <video
          className={styles.mediaBg}
          src="/assets/media/Japan 2023/Private Onsen.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />

        {/* Multi-directional cinematic overlay */}
        <div className={styles.onsenOverlay} aria-hidden="true" />

        {/* Text panel — centered, bottom of screen */}
        <div
          ref={onsenReveal.ref}
          className={`${styles.onsenTextPanel} ${styles.revealUp} ${onsenReveal.isVisible ? styles.visible : ''}`}
        >
          <span className={styles.storyTag}>Hakone · Mizunoto Onsen</span>
          <h2 className={styles.storyTitle}>The Highlight<br />of the Trip</h2>
          <div className={styles.onsenDivider} />
          <p className={styles.storyBody}>
            We spent two nights at a traditional ryokan tucked into the mountains of Hakone in the south of Japan.
            Sliding paper doors, tatami floors, a multi-course kaiseki dinner served in
            our room. It felt like stepping outside of time entirely.
          </p>
          <p className={styles.storyBody}>
            But the real moment was stepping into the{' '}
            <span className={styles.onsenHighlight}>private open-air onsen on our balcony</span>{' '}
            — a wooden tub fed by a natural hot spring, looking out over the densely forested mountain valley.
            Complete silence. The kind of stillness you don't find anywhere else.
          </p>
          <p className={styles.storyBody}>
            Everything about Japan feels intentional — but this especially. A reminder that slowing
            down isn't laziness; it's the whole point.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Travel;
