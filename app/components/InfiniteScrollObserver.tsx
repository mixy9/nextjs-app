'use client'

import { useEffect, useRef } from 'react'

const BOTTOM_FETCH_OFFSET_PERCENTAGE = 0.4 // 40%

interface InfiniteScrollObserverProps {
  onIntersect: () => void
}

export default function InfiniteScrollObserver({
  onIntersect,
}: InfiniteScrollObserverProps) {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const observerElementRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const currentObserverElement = observerElementRef.current

    const options = {
      rootMargin: `${window.innerHeight * BOTTOM_FETCH_OFFSET_PERCENTAGE}px`,
    }

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onIntersect()
      }
    }, options)

    if (currentObserverElement && observerRef.current) {
      observerRef.current.observe(currentObserverElement)
    }

    return () => {
      if (currentObserverElement && observerRef.current) {
        observerRef.current.unobserve(currentObserverElement)
      }
      observerRef.current?.disconnect()
    }
  }, [onIntersect])

  return (
    <div ref={observerElementRef} className="infinite-scroll-observer"></div>
  )
}
