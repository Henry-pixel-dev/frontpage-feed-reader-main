import React from 'react'
import {
  Route,
  createBrowserRouter, 
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import SignIn from './pages/SignIn';
import GuestMode from './pages/GuestMode';


const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/guest" element={<GuestMode />} />
      </Route>
    )
  );


  return (
    <RouterProvider router={router} />
  )
}

export default App
