import { useCallback, useRef, useState } from 'react';
import { toRad } from '../utils/mathUtils';

export interface UseCarouselInteractionResult {
    rotationOffset: number;
    isInteracting: boolean;
    isSnapping: boolean;
    handlePointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
    handlePointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
    handlePointerUp: (e: React.PointerEvent<HTMLDivElement>) => void;
    handleWheel: (e: React.WheelEvent<HTMLDivElement>) => void;
    resetRotation: () => void;
}

interface Options {
    carousel: boolean;
    isOpen: boolean;
    snap: boolean;
    /**
     * When true, releasing the drag applies angular momentum — the carousel
     * continues spinning and decelerates naturally like a fortune wheel.
     * Slow drags snap quickly; fast drags spin and coast to a stop.
     */
    carryMomentum: boolean;
    emphasisTargetAngle: number | null;
    /** Ref to the raw (pre-rotation) base angles — updated by the parent each render */
    rawPositionsRef: React.MutableRefObject<number[]>;
    /** Ref to the menu container DOM element for hit-testing the center point */
    menuRef: React.RefObject<HTMLDivElement | null>;
    /** Ref to the hasDragged flag owned by useMenuState */
    hasDraggedRef: React.MutableRefObject<boolean>;
}

/** Friction coefficient per millisecond — tuned so a fast flick coasts ~1-2 s */
const FRICTION_PER_MS = 0.003;
/** Stop the inertia loop when velocity drops below this threshold (deg/ms) */
const MIN_VELOCITY = 0.01;
/** Velocity sample window in milliseconds */
const VELOCITY_WINDOW_MS = 80;
/** Cap max velocity to prevent unrealistic flicks (deg/ms) */
const MAX_VELOCITY = 3.0;

interface VelocitySample {
    t: number;   // timestamp (ms)
    dAngle: number; // angular delta (degrees) at this sample
}

/**
 * Manages all pointer and wheel events for the carousel rotation,
 * plus snap-to-emphasis logic and optional drag momentum/inertia.
 */
export function useCarouselInteraction({
    carousel,
    isOpen,
    snap,
    carryMomentum,
    emphasisTargetAngle,
    rawPositionsRef,
    menuRef,
    hasDraggedRef,
}: Options): UseCarouselInteractionResult {
    const [rotationOffset, setRotationOffset] = useState(0);
    const [isInteracting, setIsInteracting] = useState(false);
    const [isSnapping, setIsSnapping] = useState(false);

    const draggingRef = useRef(false);
    const dragStartAngleRef = useRef(0);
    const previousRotationRef = useRef(0);
    const startPointRef = useRef({ x: 0, y: 0 });
    const interactingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const snapTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const scrollDirectionIntentRef = useRef(0);

    // Momentum / inertia tracking
    const velocitySamplesRef = useRef<VelocitySample[]>([]);
    const rafIdRef = useRef<number | null>(null);
    const prevAngleRef = useRef(0); // last pointer angle during move

    // ── Snap logic ──────────────────────────────────────────────────────────

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

                // Penalise snapping against the recent scroll direction intent
                let biasPenalty = 0;
                if (momentumBias > 0 && diff > 1) biasPenalty = 1000;
                else if (momentumBias < 0 && diff < -1) biasPenalty = 1000;

                if (Math.abs(diff) + biasPenalty < bestDiff) {
                    bestDiff = Math.abs(diff) + biasPenalty;
                    diffToApply = diff;
                }
            });

            if (bestDiff > 0.1) {
                setIsInteracting(false);
                if (interactingTimeoutRef.current) clearTimeout(interactingTimeoutRef.current);
                setIsSnapping(true);
                if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
                snapTimeoutRef.current = setTimeout(() => setIsSnapping(false), 400);
                return prevOffset + diffToApply;
            }
            return prevOffset;
        });
    }, [snap, emphasisTargetAngle]);

    // ── Interaction heartbeat (used by scroll wheel) ─────────────────────────

    const markInteracting = useCallback((baseAngles?: number[]) => {
        setIsInteracting(true);
        setIsSnapping(false);
        if (interactingTimeoutRef.current) clearTimeout(interactingTimeoutRef.current);
        interactingTimeoutRef.current = setTimeout(() => {
            setIsInteracting(false);
            if (baseAngles) executeSnap(baseAngles);
        }, 150);
    }, [executeSnap]);

    // ── Momentum / inertia RAF loop ──────────────────────────────────────────

    /**
     * Kick off the deceleration loop with an initial velocity (deg/ms).
     * Uses exponential friction: v *= exp(-FRICTION_PER_MS * dt) each frame.
     */
    const startMomentumLoop = useCallback((initialVelocity: number) => {
        if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);

        let velocity = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, initialVelocity));
        let lastTime: number | null = null;

        // Let CSS transitions stay off during coasting
        setIsInteracting(true);
        setIsSnapping(false);

        function tick(now: number) {
            if (lastTime === null) { lastTime = now; }
            const dt = now - lastTime;
            lastTime = now;

            // Exponential decay
            const friction = Math.exp(-FRICTION_PER_MS * dt);
            velocity *= friction;

            setRotationOffset(prev => prev - velocity * dt);

            if (Math.abs(velocity) > MIN_VELOCITY) {
                rafIdRef.current = requestAnimationFrame(tick);
            } else {
                // Settled — clean up and attempt snap
                rafIdRef.current = null;
                setIsInteracting(false);
                executeSnap(rawPositionsRef.current);
            }
        }

        rafIdRef.current = requestAnimationFrame(tick);
    }, [executeSnap, rawPositionsRef]);

    /** Cancel any running momentum loop (called on new pointer-down) */
    const cancelMomentum = useCallback(() => {
        if (rafIdRef.current !== null) {
            cancelAnimationFrame(rafIdRef.current);
            rafIdRef.current = null;
        }
        velocitySamplesRef.current = [];
    }, []);

    // ── Pointer handlers ─────────────────────────────────────────────────────

    const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        if (!carousel || !isOpen) return;
        cancelMomentum();
        setIsInteracting(true);
        setIsSnapping(false);
        scrollDirectionIntentRef.current = 0;
        draggingRef.current = true;
        hasDraggedRef.current = false;
        startPointRef.current = { x: e.clientX, y: e.clientY };
        velocitySamplesRef.current = [];

        const rect = menuRef.current?.getBoundingClientRect();
        if (!rect) return;
        const angle = Math.atan2(e.clientY - rect.top, e.clientX - rect.left);
        dragStartAngleRef.current = angle;
        prevAngleRef.current = angle;
        previousRotationRef.current = rotationOffset;

        (e.target as HTMLElement).setPointerCapture(e.pointerId);
    }, [carousel, isOpen, rotationOffset, cancelMomentum, menuRef, hasDraggedRef]);

    const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        if (!draggingRef.current) return;

        if (
            Math.abs(e.clientX - startPointRef.current.x) > 5 ||
            Math.abs(e.clientY - startPointRef.current.y) > 5
        ) {
            hasDraggedRef.current = true;
        }

        const rect = menuRef.current?.getBoundingClientRect();
        if (!rect) return;
        const angle = Math.atan2(e.clientY - rect.top, e.clientX - rect.left);

        // Delta from drag origin for absolute position
        let delta = angle - dragStartAngleRef.current;
        if (delta > Math.PI) delta -= Math.PI * 2;
        if (delta < -Math.PI) delta += Math.PI * 2;
        const deltaDeg = (delta * 180) / Math.PI;
        setRotationOffset(previousRotationRef.current - deltaDeg);

        // Velocity sample: angular delta from the PREVIOUS pointer position
        if (carryMomentum) {
            let frameAngle = angle - prevAngleRef.current;
            if (frameAngle > Math.PI) frameAngle -= Math.PI * 2;
            if (frameAngle < -Math.PI) frameAngle += Math.PI * 2;
            const frameAngleDeg = (frameAngle * 180) / Math.PI;
            const now = performance.now();

            velocitySamplesRef.current.push({ t: now, dAngle: frameAngleDeg });

            // Trim samples older than the velocity window
            const cutoff = now - VELOCITY_WINDOW_MS;
            velocitySamplesRef.current = velocitySamplesRef.current.filter(s => s.t >= cutoff);
        }
        prevAngleRef.current = angle;
    }, [carryMomentum, menuRef, hasDraggedRef]);

    const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        if (!draggingRef.current) return;
        draggingRef.current = false;
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);

        if (carryMomentum && velocitySamplesRef.current.length >= 2) {
            // Compute average velocity over the sample window (deg / ms)
            const samples = velocitySamplesRef.current;
            const totalDuration = samples[samples.length - 1].t - samples[0].t;
            const totalAngle = samples.reduce((sum, s) => sum + s.dAngle, 0);
            const velocityDegPerMs = totalDuration > 0 ? totalAngle / totalDuration : 0;

            if (Math.abs(velocityDegPerMs) > MIN_VELOCITY) {
                // Same sign: drag right (positive angle) → offset decreases → prev - v*dt
                startMomentumLoop(velocityDegPerMs);
            } else {
                setIsInteracting(false);
                executeSnap(rawPositionsRef.current);
            }
        } else {
            setIsInteracting(false);
            executeSnap(rawPositionsRef.current);
        }

        velocitySamplesRef.current = [];
    }, [carryMomentum, startMomentumLoop, executeSnap, rawPositionsRef]);

    // ── Wheel handler ────────────────────────────────────────────────────────

    const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
        if (!carousel || !isOpen) return;
        cancelMomentum();
        scrollDirectionIntentRef.current += e.deltaY;
        markInteracting(rawPositionsRef.current);
        const deltaDeg = e.deltaY * 0.2;
        setRotationOffset(prev => prev - deltaDeg);
    }, [carousel, isOpen, cancelMomentum, markInteracting, rawPositionsRef]);

    // ── External reset (called on route change) ───────────────────────────────

    const resetRotation = useCallback(() => {
        cancelMomentum();
        setRotationOffset(0);
        setIsInteracting(false);
        setIsSnapping(false);
        hasDraggedRef.current = false;
    }, [cancelMomentum, hasDraggedRef]);

    return {
        rotationOffset,
        isInteracting,
        isSnapping,
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
        handleWheel,
        resetRotation,
    };
}
