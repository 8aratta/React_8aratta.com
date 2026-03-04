export interface NavLink {
    to: string;
    label: string;
}

export interface CircularMenuProps {
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
    /**
     * When true, releasing a drag applies angular momentum — the carousel continues
     * spinning and decelerates naturally like a fortune wheel based on drag speed.
     */
    carryMomentum?: boolean;
    /**
     * When true, the carousel does a single flourish spin when the menu first opens
     * to demonstrate the rotation interaction to the user.
     * Only meaningful when `carousel` is true.
     */
    introSpin?: boolean;
}

export interface PositionEntry {
    x: number;
    y: number;
    /** The visually warped angle (after elliptical distortion) in degrees */
    visualAngle: number;
    /** The raw mathematical angle (before warp) in degrees */
    mathAngle: number;
}
