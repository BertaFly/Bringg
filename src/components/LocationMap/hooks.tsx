import React, { useState, useEffect, useCallback } from 'react';

export function useWidth(elementRef: React.RefObject<HTMLElement>) {
  const [width, setWidth] = useState<number | null>(null);

  const updateWidth = useCallback(() => {
    if (elementRef && elementRef.current) {
      const { width } = elementRef.current.getBoundingClientRect();
      setWidth(width);
    }
  }, [elementRef]);

  useEffect(() => {
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, [updateWidth]);

  return [width];
}
