import React from 'react'
import { Outlet } from "react-router-dom";
import {useState} from "react"
import NavBar from "../components/NavBar";

const MainLayout = () => {
  const [searchQuery, setSearchQuery] = useState('')
  return (
    <div>
      <NavBar  searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <main>
        <Outlet  context={{ searchQuery, setSearchQuery }}/>
      </main>
    </div>
  )
}

export default MainLayout
