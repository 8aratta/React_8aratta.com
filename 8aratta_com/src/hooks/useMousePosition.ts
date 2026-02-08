import { useState, useCallback } from 'react';
import { MousePosition } from '../types';

/**
 * Hook to track normalized mouse position within an element
 * Returns values between 0 and 1 for both x and y
 */
export function useMousePosition() {
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Reset to center when mouse leaves
    setMousePos({ x: 0.5, y: 0.5 });
  }, []);

  return {
    mousePos,
    handleMouseMove,
    handleMouseLeave,
  };
}
