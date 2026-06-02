import React from 'react'

const HamburgerButton = ({ isOpen, onClick }) => {
  return (
    <button
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      onClick={onClick}
      className="relative flex h-10 w-10 items-center justify-center rounded-md md:hidden text-light-text-primary dark:text-dark-text-primary"
    >
      <div className="relative flex h-6 w-6 items-center justify-center">
        <span
          className={`absolute block h-[2.5px] w-5 rounded-full bg-current transition-all duration-300 ease-out ${
            isOpen ? 'rotate-45' : '-translate-y-1.75'
          }`}
        />
        <span
          className={`absolute block h-[2.5px] w-5 rounded-full bg-current transition-all duration-300 ease-out ${
            isOpen ? 'scale-x-0 opacity-0' : 'opacity-100'
          }`}
        />
        <span
          className={`absolute block h-[2.5px] w-5 rounded-full bg-current transition-all duration-300 ease-out ${
            isOpen ? '-rotate-45' : 'translate-y-1.75'
          }`}
        />
      </div>
    </button>
  )
}

export default HamburgerButton
