import { useRef, useEffect, useState } from 'react';

export function useScroll() {
  const containerRef = useRef(null);
  const [showScrollLeft, setShowScrollLeft] = useState(false);
  const [showScrollRight, setShowScrollRight] = useState(false);

  const handleScroll = () => {
    const container = containerRef.current;

    if (container) {
      setShowScrollLeft(container.scrollLeft > 0);
      setShowScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  const handleScrollLeft = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollLeft -= 100; // Ajustez la valeur selon vos besoins
    }
  };

  const handleScrollRight = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollLeft += 100; // Ajustez la valeur selon vos besoins
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return { containerRef, showScrollLeft, showScrollRight, handleScrollLeft, handleScrollRight };
}