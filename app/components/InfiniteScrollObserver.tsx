import { useEffect, useRef } from 'react';

const BOTTOM_FETCH_OFFSET_PERCENTAGE = 0.4; // 40%

// Define the type for the onIntersect prop
interface InfiniteScrollObserverProps {
  onIntersect: () => void;
}

const InfiniteScrollObserver = ({ onIntersect }: InfiniteScrollObserverProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const observerElementRef = useRef<HTMLDivElement | null>(null);

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
      if ('observe' in observerRef.current) {
        observerRef.current.observe(observerElementRef.current);
      }
    }

    return () => {
      if (observerRef.current && observerElementRef.current) {
        if ('unobserve' in observerRef.current) {
          observerRef.current.unobserve(observerElementRef.current);
        }
      }
      observerRef.current?.disconnect();
    };
  }, [onIntersect]);

  return (
    <div ref={observerElementRef} className="infinite-scroll-observer"></div>
  );
};

export default InfiniteScrollObserver;
