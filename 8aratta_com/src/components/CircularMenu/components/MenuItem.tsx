import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { NavLink } from '../types';
import styles from '../styles/menuItem.module.css';
import animStyles from '../styles/animations.module.css';

interface MenuItemProps {
    link: NavLink;
    x: number;
    y: number;
    scale: number;
    isOpen: boolean;
    isInteracting: boolean;
    isSnapping: boolean;
    /** True when this item sits closest to the emphasis angle */
    isEmphasized: boolean;
    /** True when the menu has been idle long enough to show the drag hint */
    showIdleHint: boolean;
    openDelay: number;
    closeDelay: number;
    onClick: (e: React.MouseEvent) => void;
    onPointerDown?: (e: React.PointerEvent<HTMLElement>) => void;
    onPointerMove?: (e: React.PointerEvent<HTMLElement>) => void;
    onPointerUp?: (e: React.PointerEvent<HTMLElement>) => void;
}

/**
 * A single radial navigation pill rendered as a `<Link>`.
 * Accepts pre-computed position, scale, and timing from the parent orchestrator
 * and exposes CSS custom properties for the animation system.
 * When `showIdleHint` is true, the item that is closest to the emphasis angle
 * plays a subtle jiggle animation to invite the user to spin the carousel.
 */
function MenuItem({
    link,
    x,
    y,
    scale,
    isOpen,
    isInteracting,
    isSnapping,
    showIdleHint,
    openDelay,
    closeDelay,
    onClick,
    onPointerDown,
    onPointerMove,
    onPointerUp,
}: MenuItemProps) {
    const className = [
        styles.menuItem,
        isOpen ? styles.open : '',
        isInteracting ? styles.interacting : '',
        isSnapping ? styles.snapping : '',
        showIdleHint ? animStyles.idleTwitch : '',
    ]
        .filter(Boolean)
        .join(' ');

    const linkRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const el = linkRef.current;
        if (!el) return;
        const prevent = (e: Event) => e.preventDefault();
        el.addEventListener('selectstart', prevent);
        return () => el.removeEventListener('selectstart', prevent);
    }, []);

    return (
        <Link
            ref={linkRef}
            to={link.to}
            draggable={false}
            className={className}
            style={
                {
                    '--tx': `${x}px`,
                    '--ty': `${y}px`,
                    '--scale-factor': scale,
                    '--open-delay': `${openDelay}ms`,
                    '--close-delay': `${closeDelay}ms`,
                } as React.CSSProperties
            }
            onClick={onClick}
            onDragStart={e => e.preventDefault()}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
        >
            {link.label}
        </Link>
    );
}

export default MenuItem;
