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
// import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import SignIn from './pages/SignIn';
import GuestMode from './pages/GuestMode';
import DashBoard from './pages/DashBoard';
import ProtectedRoute from './components/ProtectedRoute';
import VerifyEmailPage from './pages/VerifyEmailPage';
import PublicOnlyRoute from './components/PublicOnlyRoute';
import ForgotPassword from './pages/ForgotPassword'
import ResetPasswordPage from './pages/ResetPasswordPage'
import DigestPage from './pages/DigestPage'
import DiscoverPage from './pages/DiscoverPage'


const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          
          <Route element={<PublicOnlyRoute />}>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<FeedLayout />}>
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/digest" element={<DigestPage />} />
              <Route path="/discover" element={<DiscoverPage />} />
            </Route>
          </Route>


          <Route element={<PublicOnlyRoute />}>
              <Route element={<FeedLayout />}>
                <Route path="/guest" element={<GuestMode />} />
              </Route>
            </Route>
        </Route>

        
      </>
    )
  );


  return (
    <RouterProvider router={router} />
  )
}

export default App
