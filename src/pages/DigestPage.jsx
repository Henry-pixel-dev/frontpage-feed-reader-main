import React from 'react'
import {Link} from "react-router-dom"

const DigestPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-light-bg-primary text-light-text-primary dark:bg-dark-bg-primary dark:text-dark-text-primary">
      <h1 className='text-2xl font-bold text-light-text-primary dark:text-dark-text-primary'>Coming up soon</h1>
      <Link to="/dashboard" className="text-light-accent hover:text-light-accent-hover dark:text-dark-accent dark:hover:text-dark-accent-hover">
        Go back to Dashboard
      </Link>
    </div>
  )
}

export default DigestPage