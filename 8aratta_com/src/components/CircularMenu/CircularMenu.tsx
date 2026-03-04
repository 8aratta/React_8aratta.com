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
    /** Defines the central focal point of the arc instead of manually placing start/end angles (e.g. 225 or 'bottom') */
    angle?: number | 'top' | 'right' | 'bottom' | 'left';
    /** Start angle in degrees (overrides `angle` if set) */
    startAngle?: number;
    /** End angle in degrees (overrides `angle` if set) */
    endAngle?: number;
    /** Stagger delay in ms between each item (default: 50) */
    staggerMs?: number;
    /** Whether to enable 360-degree draggable carousel mode (default: false) */
    carousel?: boolean;
    /** Emphasize a specific angle by scaling items up when they reach it */
    emphasize?: boolean | number | 'top' | 'right' | 'bottom' | 'left';
    /** Whether the carousel should smoothly snap items to the emphasis angle when interaction stops */
    snap?: boolean;
    /** What scale factor to apply to the emphasized item (e.g. 1.33) */
    emphasisScale?: number;
    /** If set, smoothly interpolates items on the opposite side to this scale (e.g. 0.33) */
    neutralScale?: number;
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
    angle,
    startAngle,
    endAngle,
    staggerMs = 50,
    carousel = false,
    emphasize = false,
    snap = false,
    emphasisScale,
    neutralScale,
}: CircularMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isInteracting, setIsInteracting] = useState(false);
    const [isSnapping, setIsSnapping] = useState(false);
    const interactingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const snapTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const scrollDirectionIntentRef = useRef(0);
    const { theme } = useTheme();
    const location = useLocation();
    const menuRef = useRef<HTMLDivElement>(null);
    const svgDefsRef = useRef<SVGDefsElement>(null);
    const filtersBuilt = useRef(false);
    const count = links.length;

    const [rotationOffset, setRotationOffset] = useState(0);
    const draggingRef = useRef(false);
    const dragStartAngleRef = useRef(0);
    const previousRotationRef = useRef(0);
    const hasDraggedRef = useRef(false);
    const startPointRef = useRef({ x: 0, y: 0 });

    // Derive calculated start and end angles from the `angle` or fallback parameters
    const { calcStart, calcEnd } = useMemo(() => {
        let center = 225; // default
        if (typeof angle === 'number') center = angle;
        else if (angle === 'top') center = 90;
        else if (angle === 'left') center = 180;
        else if (angle === 'bottom') center = 270;
        else if (angle === 'right') center = 0;

        return {
            calcStart: startAngle !== undefined ? startAngle : center - 45,
            calcEnd: endAngle !== undefined ? endAngle : center + 45,
        };
    }, [angle, startAngle, endAngle]);

    // Memoize the target angle for emphasis and snapping
    const emphasisTargetAngle = useMemo(() => {
        if (emphasize === false) return null;
        if (typeof emphasize === 'number') return emphasize;
        if (emphasize === 'top') return 90;
        if (emphasize === 'left') return 180;
        if (emphasize === 'bottom') return 270;
        if (emphasize === 'right') return 0;
        return (calcStart + calcEnd) / 2;
    }, [emphasize, calcStart, calcEnd]);

    const executeSnap = useCallback((baseAngles: number[]) => {
        if (!snap || emphasisTargetAngle === null || baseAngles.length === 0) return;

        let momentumBias = 0;
        if (scrollDirectionIntentRef.current > 10) momentumBias = 1;
        else if (scrollDirectionIntentRef.current < -10) momentumBias = -1;
        scrollDirectionIntentRef.current = 0;

        setRotationOffset(prevOffset => {
            let bestDiff = Infinity;
            let diffToApply = 0;
            const normTarget = ((emphasisTargetAngle % 360) + 360) % 360;

            baseAngles.forEach(angle => {
                const currentTotal = angle + prevOffset;
                const rad = toRad(currentTotal);
                const distortedRad = Math.atan2(Math.sin(rad), Math.cos(rad) * 1.35);
                const distortedDeg = (distortedRad * 180) / Math.PI;

                const normCurrent = ((distortedDeg % 360) + 360) % 360;
                let diff = normTarget - normCurrent;

                if (diff > 180) diff -= 360;
                else if (diff < -180) diff += 360;

                let biasPenalty = 0;
                if (momentumBias > 0 && diff > 1) {
                    biasPenalty = 1000;
                } else if (momentumBias < 0 && diff < -1) {
                    // penalized for going backward against upward scrolling intent
                    biasPenalty = 1000;
                }

                if (Math.abs(diff) + biasPenalty < bestDiff) {
                    bestDiff = Math.abs(diff) + biasPenalty;
                    diffToApply = diff;
                }
            });

            if (bestDiff > 0.1) {
                // Instantly clear interaction overrides so CSS transition takes over
                setIsInteracting(false);
                if (interactingTimeoutRef.current) clearTimeout(interactingTimeoutRef.current);

                // Activate CSS snapping speed
                setIsSnapping(true);
                if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
                snapTimeoutRef.current = setTimeout(() => setIsSnapping(false), 400);

                return prevOffset + diffToApply;
            }
            return prevOffset;
        });
    }, [snap, emphasisTargetAngle]);

    const markInteracting = useCallback((baseAngles?: number[]) => {
        setIsInteracting(true);
        setIsSnapping(false);
        if (interactingTimeoutRef.current) clearTimeout(interactingTimeoutRef.current);
        interactingTimeoutRef.current = setTimeout(() => {
            setIsInteracting(false);
            if (baseAngles) executeSnap(baseAngles);
        }, 150);
    }, [executeSnap]);

    const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        if (!carousel || !isOpen) return;
        markInteracting();
        scrollDirectionIntentRef.current = 0;
        draggingRef.current = true;
        hasDraggedRef.current = false;
        startPointRef.current = { x: e.clientX, y: e.clientY };

        const rect = menuRef.current?.getBoundingClientRect();
        if (!rect) return;
        const centerX = rect.left;
        const centerY = rect.top;

        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        dragStartAngleRef.current = angle;
        previousRotationRef.current = rotationOffset;

        (e.target as HTMLElement).setPointerCapture(e.pointerId);
    }, [carousel, isOpen, rotationOffset, markInteracting]);

    const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        if (!draggingRef.current) return;

        if (Math.abs(e.clientX - startPointRef.current.x) > 5 || Math.abs(e.clientY - startPointRef.current.y) > 5) {
            hasDraggedRef.current = true;
        }

        const rect = menuRef.current?.getBoundingClientRect();
        if (!rect) return;
        const centerX = rect.left;
        const centerY = rect.top;

        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        let delta = angle - dragStartAngleRef.current;

        if (delta > Math.PI) delta -= Math.PI * 2;
        if (delta < -Math.PI) delta += Math.PI * 2;

        const deltaDeg = (delta * 180) / Math.PI;
        setRotationOffset(previousRotationRef.current - deltaDeg);
        markInteracting();
    }, [markInteracting]);

    const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        if (!draggingRef.current) return;
        draggingRef.current = false;
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
        executeSnap(rawPositionsRef.current);
    }, [executeSnap]);

    const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
        if (!carousel || !isOpen) return;

        scrollDirectionIntentRef.current += e.deltaY;

        // Prevent page scroll when spinning the wheel over the menu
        markInteracting(rawPositionsRef.current);

        // Adjust the rotation multiplier as needed for scroll sensitivity
        const deltaDeg = e.deltaY * 0.2;
        setRotationOffset(prev => prev - deltaDeg);
    }, [carousel, isOpen, markInteracting]);

    // Close menu on route change
    useEffect(() => {
        setIsOpen(false);
        setRotationOffset(0);
        hasDraggedRef.current = false;
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

    const closeMenu = useCallback((e?: React.MouseEvent | React.FocusEvent) => {
        if (hasDraggedRef.current) {
            setTimeout(() => { hasDraggedRef.current = false; }, 0);
            return;
        }
        setIsOpen(false);
    }, []);

    // Pre-compute positions for each link
    const rawPositionsRef = useRef<number[]>([]);

    const positions = useMemo(() => {
        const actualEndAngle = carousel ? calcStart + 360 : calcEnd;
        const actualCount = carousel ? count : Math.max(1, count - 1);

        // Fallback or purely static layout before we measure
        let angles = links.map((_, i) =>
            count === 1
                ? (calcStart + actualEndAngle) / 2
                : calcStart + (i * (actualEndAngle - calcStart)) / actualCount
        );

        rawPositionsRef.current = angles;
        return angles;
    }, [links, calcStart, calcEnd, count, carousel]);

    // Apply rotation mathematically outside of the heavy gap-balancing loop
    // Warp the mathematical angle with an elliptical aspect ratio to space out rectangular text
    const itemAspectRatio = 1.35;

    const rotatedPositions = useMemo(() => {
        return positions.map(raw => {
            const mathematicalAngle = raw + rotationOffset;
            const rad = toRad(mathematicalAngle);

            // Phase warp to stretch gaps at the top/bottom and squish left/right
            const distortedRad = Math.atan2(Math.sin(rad), Math.cos(rad) * itemAspectRatio);
            let distortedDeg = (distortedRad * 180) / Math.PI;

            const pos = getRadialPosition(distortedDeg, radius);
            return { x: pos.x, y: pos.y, visualAngle: distortedDeg, mathAngle: mathematicalAngle };
        });
    }, [positions, rotationOffset, radius]);

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

            {/* Overlay to catch outside clicks and handle drag */}
            <div
                className={`${styles.menuOverlay} ${isOpen ? styles.visible : ''} ${carousel ? styles.carouselOverlay : ''}`}
                onClick={closeMenu}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onWheel={handleWheel}
                aria-hidden="true"
            />

            {/* Circular menu container */}
            <div className={styles.circularMenu} ref={menuRef}>
                {links.map((link, i) => {
                    const posObj = rotatedPositions[i] || { x: 0, y: 0, visualAngle: 0, mathAngle: 0 };
                    const finalAngle = posObj.visualAngle;
                    const { x, y } = posObj;

                    let itemScale = 1;
                    if (emphasisTargetAngle !== null && emphasisScale !== undefined) {
                        // Shortest angular distance between final visual item angle and target
                        const normCurrent = ((finalAngle % 360) + 360) % 360;
                        const normTarget = ((emphasisTargetAngle % 360) + 360) % 360;

                        let diff = Math.abs(normCurrent - normTarget);
                        if (diff > 180) diff = 360 - diff;

                        if (typeof neutralScale === 'number') {
                            // Continuous global proportion: [0, 180] degrees -> [emphasisScale, neutralScale] scale
                            const normalizedDist = diff / 180;
                            const smoothFactor = (Math.cos(normalizedDist * Math.PI) + 1) / 2;
                            itemScale = neutralScale + ((emphasisScale - neutralScale) * smoothFactor);
                        } else {
                            // Bump map: ±45 degrees only
                            if (diff < 45) {
                                // scale from 1 up to emphasisScale
                                const boost = Math.cos((diff / 45) * (Math.PI / 2)) * (emphasisScale - 1);
                                itemScale = 1 + boost;
                            }
                        }
                    }

                    const openDelay = i * staggerMs;
                    const closeDelay = (count - 1 - i) * (staggerMs * 0.8);

                    return (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`${styles.menuItem} ${isOpen ? styles.open : ''} ${isInteracting ? styles.interacting : ''} ${isSnapping ? styles.snapping : ''}`}
                            style={
                                {
                                    '--tx': `${x}px`,
                                    '--ty': `${y}px`,
                                    '--scale-factor': itemScale,
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
