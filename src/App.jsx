import React from 'react'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import FeedLayout from './layouts/FeedLayout';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import SignIn from './pages/SignIn';
import GuestMode from './pages/GuestMode';


const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>

        <Route element={<FeedLayout />}>
          <Route path="/guest" element={<GuestMode />} />
          <Route path="/feed" element={<GuestMode />} />
          <Route path="/digest" element={<GuestMode />} />
          <Route path="/discover" element={<GuestMode />} />
          <Route path="/home" element={<HomePage />} />
        </Route>
      </>
    )
  );


  return (
    <RouterProvider router={router} />
  )
}

export default App
