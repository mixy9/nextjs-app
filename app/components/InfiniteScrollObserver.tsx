import { useEffect, useRef } from 'react';

const BOTTOM_FETCH_OFFSET_PERCENTAGE = 0.4; // 40%

const InfiniteScrollObserver = ({ onIntersect }) => {
  const observerRef = useRef(null);
  const observerElementRef = useRef(null);

  useEffect(() => {
    const options = {
      rootMargin: `${window.innerHeight * BOTTOM_FETCH_OFFSET_PERCENTAGE}px`,
    };

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onIntersect();
      }
    }, options);

    if (observerElementRef.current) {
      observerRef.current.observe(observerElementRef.current);
    }

    return () => {
      if (observerRef.current && observerElementRef.current) {
        observerRef.current.unobserve(observerElementRef.current);
      }
      observerRef.current?.disconnect();
    };
  }, [onIntersect]);

  return (
    <div ref={observerElementRef} className="infinite-scroll-observer"></div>
  );
};

export default InfiniteScrollObserver;
