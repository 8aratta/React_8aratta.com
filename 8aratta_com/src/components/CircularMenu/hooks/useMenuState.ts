import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export interface UseMenuStateResult {
    isOpen: boolean;
    toggleMenu: () => void;
    closeMenu: (e?: React.MouseEvent | React.FocusEvent) => void;
    hasDraggedRef: React.MutableRefObject<boolean>;
}

/**
 * Manages the open/closed state of the circular menu,
 * the hamburger ↔ X toggle, and route-change resets.
 */
export function useMenuState(
    onClose?: () => void
): UseMenuStateResult {
    const [isOpen, setIsOpen] = useState(false);
    const hasDraggedRef = useRef(false);
    const location = useLocation();

    // Close and reset rotation when the route changes
    useEffect(() => {
        setIsOpen(false);
        hasDraggedRef.current = false;
        onClose?.();
    }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

    const toggleMenu = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    const closeMenu = useCallback((_e?: React.MouseEvent | React.FocusEvent) => {
        if (hasDraggedRef.current) {
            // Swallow the click that ends a drag — reset the flag async so the
            // pointer-up handler fires first.
            setTimeout(() => { hasDraggedRef.current = false; }, 0);
            return;
        }
        setIsOpen(false);
    }, []);

    return { isOpen, toggleMenu, closeMenu, hasDraggedRef };
}
