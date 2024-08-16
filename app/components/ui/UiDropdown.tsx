'use client'

import { useState, FC, ReactNode } from 'react'
import UiButton from './UiButton'
import Image from 'next/image'
import ClickAwayListener from 'react-click-away-listener'

type UiDropdownProps = {
  label: string
  children: ReactNode
  position?: 'left' | 'right'
}

const UiDropdown: FC<UiDropdownProps> = ({
  label,
  children,
  position = 'right',
}: UiDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev)
  }

  const handleClickAway = () => {
    setIsOpen(false)
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="relative inline-block">
        <UiButton
          aria-expanded={isOpen}
          aria-haspopup="true"
          clickEvent={handleToggleDropdown}
        >
          {label}
          <Image
            src="/images/chevron-down.svg"
            alt="ChevronDown"
            width={12}
            height={12}
          />
        </UiButton>

        {isOpen && (
          <div
            className={`origin-top-right bg-white absolute ${position}-0 mt-2 w-56 p-2 rounded-md shadow-lg ring-1 
          bg-gray-700 z-10 ring-black ring-opacity-5 focus:outline-none`}
            role="menu"
            aria-orientation="vertical"
            tabIndex={-1}
          >
            {children}
          </div>
        )}
      </div>
    </ClickAwayListener>
  )
}

export default UiDropdown
