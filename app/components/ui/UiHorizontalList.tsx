'use client'

import { FC, memo, ReactNode, useRef, useState } from 'react'
import styles from '../../styles/ui-scroller.module.css'

interface UiHorizontalListProps {
  children: ReactNode
}

const UiHorizontalList: FC<UiHorizontalListProps> = memo(
  ({ children }: UiHorizontalListProps) => {
    const [scrollPosition, setScrollPosition] = useState<number>(0)
    const [isHovered, setIsHovered] = useState(false)

    const containerRef = useRef<HTMLDivElement | null>(null)

    const handleScroll = (scrollAmount: number) => {
      const newScrollPosition = scrollPosition + scrollAmount

      setScrollPosition(newScrollPosition)

      if (containerRef.current && 'scrollLeft' in containerRef.current) {
        containerRef.current.scrollLeft = newScrollPosition
      }
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
    }

    return (
      <div
        className={`flex relative justify-center lg:${styles.horizontalScroll}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isHovered && (
          <button
            className={`absolute ${styles.actionButton} left-0 z-10`}
            onClick={() => handleScroll(-200)}
          >
            <div
              className={`${styles.chevronCircle} ${styles.chevronCircleLeft}`}
            ></div>
          </button>
        )}

        <div
          ref={containerRef}
          style={{
            overflowX: 'scroll',
            scrollBehavior: 'smooth',
          }}
        >
          <div className="flex w-full gap-5">{children}</div>
        </div>

        {isHovered && (
          <button
            className={`absolute ${styles.actionButton} right-0 z-10`}
            onClick={() => handleScroll(200)}
          >
            <div
              className={`${styles.chevronCircle} ${styles.chevronCircleRight}`}
            ></div>
          </button>
        )}
      </div>
    )
  }
)

UiHorizontalList.displayName = 'UiHorizontalList'

export default UiHorizontalList
