import { useEffect, useRef, useCallback, RefObject } from 'react';

/**
 * Listens for wheel events on the inner scrollable areas of each TimelineSection.
 * When the user scrolls past the end (or past the top) of the inner container,
 * the next (or previous) section is snapped into view.
 */
export function useSnapScroll(containerRef: RefObject<HTMLElement | null>) {
  const isSnapping = useRef(false);

  const snapTo = useCallback((target: HTMLElement) => {
    isSnapping.current = true;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Unlock after the smooth scroll finishes
    setTimeout(() => {
      isSnapping.current = false;
    }, 700);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getSections = () =>
      Array.from(container.querySelectorAll<HTMLElement>('[data-timeline-section]'));

    const handleWheel = (e: WheelEvent) => {
      if (isSnapping.current) {
        e.preventDefault();
        return;
      }

      // Find which scrollable area this event originated from
      const scrollEl = (e.target as HTMLElement).closest<HTMLElement>(
        '[data-timeline-scroll]'
      );
      if (!scrollEl) return;

      const sections = getSections();
      const currentSection = scrollEl.closest<HTMLElement>('[data-timeline-section]');
      if (!currentSection) return;

      const currentIndex = sections.indexOf(currentSection);
      const atBottom =
        scrollEl.scrollTop + scrollEl.clientHeight >= scrollEl.scrollHeight - 1;
      const atTop = scrollEl.scrollTop <= 0;

      // Scrolling down past the end → snap to next section
      if (e.deltaY > 0 && atBottom && currentIndex < sections.length - 1) {
        e.preventDefault();
        snapTo(sections[currentIndex + 1]);
        return;
      }

      // Scrolling up past the start → snap to previous section
      if (e.deltaY < 0 && atTop && currentIndex > 0) {
        e.preventDefault();
        snapTo(sections[currentIndex - 1]);
        return;
      }
    };

    // Must be non-passive to allow preventDefault
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [containerRef, snapTo]);
}
