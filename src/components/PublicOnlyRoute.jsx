import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Outlet, Navigate } from 'react-router-dom';


const PublicOnlyRoute = () => {
  const { user, loading } = useAuth();


  return (
    loading ? null : user ? <Navigate to="/dashboard" /> : <Outlet />
  )
}

export default PublicOnlyRoute