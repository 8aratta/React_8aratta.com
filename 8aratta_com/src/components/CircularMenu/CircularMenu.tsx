import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './CircularMenu.module.css';
import { useTheme } from '../../contexts';

interface NavLink {
    to: string;
    label: string;
}

interface CircularMenuProps {
    links: NavLink[];
    /** Radius in px for the radial arc (default: 130) */
    radius?: number;
    /** Start angle in degrees — 180 = straight left (default: 180) */
    startAngle?: number;
    /** End angle in degrees — 270 = straight down (default: 270) */
    endAngle?: number;
    /** Stagger delay in ms between each item (default: 50) */
    staggerMs?: number;
}

/** Convert degrees to radians */
const toRad = (deg: number) => (deg * Math.PI) / 180;

/**
 * Compute (x, y) for a point on a circle.
 * Uses standard math angles but flips Y for CSS (positive Y = down).
 */
function getRadialPosition(angleDeg: number, radius: number) {
    const rad = toRad(angleDeg);
    return {
        x: Math.round(radius * Math.cos(rad)),
        y: Math.round(radius * -Math.sin(rad)),
    };
}

/* ── Liquid Glass: SVG displacement-map generator (simplified) ── */

const SURFACE_FN = (x: number) => Math.pow(1 - Math.pow(1 - x, 4), 0.25);

function calculateRefractionProfile(
    glassThickness: number,
    bezelWidth: number,
    ior: number,
    samples = 128
): Float64Array {
    const eta = 1 / ior;
    function refract(nx: number, ny: number): [number, number] | null {
        const dot = ny;
        const k = 1 - eta * eta * (1 - dot * dot);
        if (k < 0) return null;
        const sq = Math.sqrt(k);
        return [-(eta * dot + sq) * nx, eta - (eta * dot + sq) * ny];
    }
    const profile = new Float64Array(samples);
    for (let i = 0; i < samples; i++) {
        const x = i / samples;
        const y = SURFACE_FN(x);
        const dx = x < 1 ? 0.0001 : -0.0001;
        const y2 = SURFACE_FN(x + dx);
        const deriv = (y2 - y) / dx;
        const mag = Math.sqrt(deriv * deriv + 1);
        const ref = refract(-deriv / mag, -1 / mag);
        if (!ref) { profile[i] = 0; continue; }
        profile[i] = ref[0] * ((y * bezelWidth + glassThickness) / ref[1]);
    }
    return profile;
}

function generateDisplacementMap(
    w: number, h: number, radius: number, bezelWidth: number,
    profile: Float64Array, maxDisp: number
): string {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d')!;
    const img = ctx.createImageData(w, h);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
        d[i] = 128; d[i + 1] = 128; d[i + 2] = 0; d[i + 3] = 255;
    }

    const r = radius, rSq = r * r, r1Sq = (r + 1) ** 2;
    const rBSq = Math.max(r - bezelWidth, 0) ** 2;
    const wB = w - r * 2, hB = h - r * 2, S = profile.length;

    for (let y1 = 0; y1 < h; y1++) {
        for (let x1 = 0; x1 < w; x1++) {
            const x = x1 < r ? x1 - r : x1 >= w - r ? x1 - r - wB : 0;
            const y = y1 < r ? y1 - r : y1 >= h - r ? y1 - r - hB : 0;
            const dSq = x * x + y * y;
            if (dSq > r1Sq || dSq < rBSq) continue;
            const dist = Math.sqrt(dSq);
            const fromSide = r - dist;
            const op = dSq < rSq ? 1 : 1 - (dist - Math.sqrt(rSq)) / (Math.sqrt(r1Sq) - Math.sqrt(rSq));
            if (op <= 0 || dist === 0) continue;
            const cos = x / dist, sin = y / dist;
            const bi = Math.min(((fromSide / bezelWidth) * S) | 0, S - 1);
            const disp = profile[bi] || 0;
            const dX = (-cos * disp) / maxDisp, dY = (-sin * disp) / maxDisp;
            const idx = (y1 * w + x1) * 4;
            d[idx] = (128 + dX * 127 * op + 0.5) | 0;
            d[idx + 1] = (128 + dY * 127 * op + 0.5) | 0;
        }
    }
    ctx.putImageData(img, 0, 0);
    return c.toDataURL();
}

function buildLiquidGlassFilter(
    id: string, w: number, h: number,
    opts = { thickness: 40, bezel: 30, ior: 2.0, blur: 0.4, radius: 50 }
): string {
    const profile = calculateRefractionProfile(opts.thickness, opts.bezel, opts.ior, 128);
    const maxDisp = Math.max(...Array.from(profile).map(Math.abs)) || 1;
    const dispUrl = generateDisplacementMap(w, h, opts.radius, opts.bezel, profile, maxDisp);
    const scale = maxDisp * 1.0;

    return `
    <filter id="${id}" x="0%" y="0%" width="100%" height="100%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="${opts.blur}" result="blurred" />
      <feImage href="${dispUrl}" x="0" y="0" width="${w}" height="${h}" result="disp" />
      <feDisplacementMap in="blurred" in2="disp"
        scale="${scale}" xChannelSelector="R" yChannelSelector="G"
        result="displaced" />
      <feColorMatrix in="displaced" type="saturate" values="4" result="sat" />
      <feBlend in="sat" in2="displaced" mode="normal" />
    </filter>
  `;
}

/* ── Component ── */

function CircularMenu({
    links,
    radius = 130,
    startAngle = 180,
    endAngle = 270,
    staggerMs = 50,
}: CircularMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { theme } = useTheme();
    const location = useLocation();
    const menuRef = useRef<HTMLDivElement>(null);
    const svgDefsRef = useRef<SVGDefsElement>(null);
    const filtersBuilt = useRef(false);
    const count = links.length;

    // Close menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    // Build SVG displacement filters once the menu first opens
    useEffect(() => {
        if (!isOpen || filtersBuilt.current || !svgDefsRef.current) return;
        filtersBuilt.current = true;

        // Build one filter per approximate pill size
        // Pill dimensions are roughly w=110, h=38 with border-radius ~50
        const pillW = 120;
        const pillH = 40;
        const filterHtml = buildLiquidGlassFilter('liquid-glass-pill', pillW, pillH, {
            thickness: 40,
            bezel: 20,
            ior: 2.0,
            blur: 0.3,
            radius: 20,
        });
        svgDefsRef.current.innerHTML = filterHtml;
    }, [isOpen]);

    const toggleMenu = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const closeMenu = useCallback(() => {
        setIsOpen(false);
    }, []);

    // Pre-compute positions for each link
    const [dims, setDims] = useState<{ w: number; h: number }[]>([]);

    useEffect(() => {
        if (!isOpen) return;
        // Small delay to ensure the DOM has rendered the buttons before measuring
        const timer = setTimeout(() => {
            if (menuRef.current) {
                const elements = Array.from(menuRef.current.children) as HTMLElement[];
                const newDims = elements.map(el => ({ w: el.offsetWidth, h: el.offsetHeight }));
                setDims(newDims);
            }
        }, 10);
        return () => clearTimeout(timer);
    }, [isOpen, links]);

    const positions = useMemo(() => {
        // Fallback or purely static layout before we measure
        let angles = links.map((_, i) =>
            count === 1
                ? (startAngle + endAngle) / 2
                : startAngle + (i * (endAngle - startAngle)) / (count - 1)
        );

        if (dims.length === count && count > 1) {
            // Iteratively equalize the visual gaps along the arc
            const ARC_LENGTH = Math.abs(endAngle - startAngle);
            const ITERATIONS = 15;

            for (let iter = 0; iter < ITERATIONS; iter++) {
                // Calculate how much "angular size" each pill effectively takes up at its current angle
                // Approximated by projecting its bounding box onto the tangent line of the circle
                const extents = dims.map((dim, i) => {
                    const rad = toRad(angles[i]);
                    // Box tangent projection length approximate formula:
                    // tangent is perpendicular to radius, so its angle is rad + pi/2
                    const tangX = Math.cos(rad + Math.PI / 2);
                    // CSS Y is inverted, but for absolute length projection it doesn't matter
                    const tangY = Math.sin(rad + Math.PI / 2);

                    // Project the width and height vectors of the box onto the tangent vector
                    const projW = Math.abs(tangX * dim.w);
                    const projH = Math.abs(tangY * dim.h);

                    // Total effective linear length of the box tangent to the circle
                    const linearExtent = projW + projH;

                    // Convert linear extent to angular extent
                    return (linearExtent / (radius * Math.PI * 2)) * 360;
                });
                // Calculate total extent that lies BETWEEN the center of the first item and center of the last item
                let internalExtent = extents[0] / 2 + extents[count - 1] / 2;
                for (let i = 1; i < count - 1; i++) {
                    internalExtent += extents[i];
                }

                // Remaining angle to split as equal gaps between items (can be negative if they overlap)
                const totalGapAngle = ARC_LENGTH - internalExtent;
                // If there's only one gap or zero, avoid division by zero
                const gapSize = count > 1 ? totalGapAngle / (count - 1) : 0;

                // Build new smoothed angles, pinning strictly to startAngle and endAngle
                let currAngle = startAngle;
                const newAngles: number[] = [currAngle];

                const direction = endAngle >= startAngle ? 1 : -1;
                for (let i = 0; i < count - 1; i++) {
                    const step = (extents[i] / 2) + gapSize + (extents[i + 1] / 2);
                    currAngle += step * direction;
                    newAngles.push(currAngle);
                }

                // Enforce pinning at the exact end angle to eliminate float drift
                newAngles[count - 1] = endAngle;

                // Blend them lightly for stability
                angles = angles.map((old, i) => old * 0.4 + newAngles[i] * 0.6);
            }
        }

        return angles.map(angle => getRadialPosition(angle, radius));
    }, [links, radius, startAngle, endAngle, count, dims]);

    return (
        <div data-theme={theme}>
            {/* Hidden SVG with displacement filter */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="0"
                height="0"
                style={{ position: 'absolute', overflow: 'hidden' }}
                colorInterpolationFilters="sRGB"
            >
                <defs ref={svgDefsRef} />
            </svg>

            {/* Overlay to catch outside clicks */}
            <div
                className={`${styles.menuOverlay} ${isOpen ? styles.visible : ''}`}
                onClick={closeMenu}
                aria-hidden="true"
            />

            {/* Circular menu container */}
            <div className={styles.circularMenu} ref={menuRef}>
                {links.map((link, i) => {
                    const { x, y } = positions[i];
                    const openDelay = i * staggerMs;
                    const closeDelay = (count - 1 - i) * (staggerMs * 0.8);

                    return (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`${styles.menuItem} ${isOpen ? styles.open : ''}`}
                            style={
                                {
                                    '--tx': `${x}px`,
                                    '--ty': `${y}px`,
                                    '--open-delay': `${openDelay}ms`,
                                    '--close-delay': `${closeDelay}ms`,
                                } as React.CSSProperties
                            }
                            onClick={closeMenu}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </div>

            {/* Hamburger / X toggle button */}
            <button
                className={styles.menuButton}
                onClick={toggleMenu}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
            >
                <div className={`${styles.menuIcon} ${isOpen ? styles.open : ''}`}>
                    <span />
                    <span />
                    <span />
                </div>
            </button>
        </div>
    );
}

export default CircularMenu;
