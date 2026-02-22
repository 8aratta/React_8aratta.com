import { useEffect, useState, useCallback, RefObject } from 'react';

/**
 * Tracks which TimelineEntry is currently visible inside
 * a scrollable container. Returns the active entry's `id` and `title`.
 */
export function useActiveEntry(scrollRef: RefObject<HTMLElement | null>) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeTitle, setActiveTitle] = useState<string | null>(null);

  const update = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const entries = Array.from(
      el.querySelectorAll<HTMLElement>('[data-timeline-entry]')
    );
    if (entries.length === 0) return;

    const scrollTop = el.scrollTop;
    let current = entries[0];

    for (const entry of entries) {
      // offsetTop is relative to the scroll container
      if (entry.offsetTop <= scrollTop + 4) {
        current = entry;
      } else {
        break;
      }
    }

    const id = current.getAttribute('data-timeline-entry');
    const title = current.getAttribute('data-timeline-entry-title');
    if (id !== activeId) setActiveId(id);
    if (title !== activeTitle) setActiveTitle(title);
  }, [scrollRef, activeId, activeTitle]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Initial detection
    update();

    el.addEventListener('scroll', update, { passive: true });
    return () => el.removeEventListener('scroll', update);
  }, [scrollRef, update]);

  return { activeId, activeTitle };
}
