import React from 'react';
import { Link } from 'react-router-dom';
import type { NavLink } from '../types';
import styles from '../styles/menuItem.module.css';

interface MenuItemProps {
    link: NavLink;
    x: number;
    y: number;
    scale: number;
    isOpen: boolean;
    isInteracting: boolean;
    isSnapping: boolean;
    openDelay: number;
    closeDelay: number;
    onClick: (e: React.MouseEvent) => void;
}

/**
 * A single radial navigation pill rendered as a `<Link>`.
 * Accepts pre-computed position, scale, and timing from the parent orchestrator
 * and exposes CSS custom properties for the animation system.
 */
function MenuItem({
    link,
    x,
    y,
    scale,
    isOpen,
    isInteracting,
    isSnapping,
    openDelay,
    closeDelay,
    onClick,
}: MenuItemProps) {
    const className = [
        styles.menuItem,
        isOpen ? styles.open : '',
        isInteracting ? styles.interacting : '',
        isSnapping ? styles.snapping : '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <Link
            to={link.to}
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
        >
            {link.label}
        </Link>
    );
}

export default MenuItem;
