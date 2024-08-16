'use client'

import { FC, ReactNode } from 'react'

type UiButtonProps = {
  children: ReactNode
  size?: string
  type?: HTMLButtonElement['type']
  clickEvent?: () => void
}

const UiButton: FC<UiButtonProps> = ({
  children,
  size = 'md',
  type = 'button',
  clickEvent,
}: UiButtonProps) => (
  <button
    onClick={clickEvent}
    type={type}
    className={`text-white flex items-center bg-cyan-700 hover:bg-cyan-800 focus:ring-4 
          focus:outline-none focus:ring-cyan-300 font-medium rounded-md text-${size} text px-4 py-2 dark:bg-cyan-600 dark:hover:bg-cyan-700 
          dark:focus:ring-cyan-800 w-auto h-auto`}
  >
    {children}
  </button>
)

export default UiButton
