import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Outlet, Navigate, useOutletContext } from 'react-router-dom';


const PublicOnlyRoute = () => {
  const { user, loading } = useAuth();
  const context = useOutletContext()


  return (
    loading ? null : user ? <Navigate to="/dashboard" /> : <Outlet context={context}/>
  )
}

export default PublicOnlyRoute