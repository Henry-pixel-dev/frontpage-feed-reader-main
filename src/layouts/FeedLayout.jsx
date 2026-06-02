import React from 'react'
import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"
import Sidebar from "../components/Sidebar"
import FeedToolbar from "../components/FeedToolbar"

const FeedLayout = () => {
  return (
    <div className="flex h-screen flex-col font-sans">
      <NavBar />

      <div className="flex flex-1 overflow-hidden">
        <div className="w-sidebar shrink-0 overflow-y-auto border-r border-light-border-subtle bg-light-bg-primary dark:border-dark-border dark:bg-dark-bg-primary">
          <Sidebar />
        </div>

        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="shrink-0">
            <FeedToolbar />
          </div>

          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-container-feed px-6 py-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default FeedLayout
