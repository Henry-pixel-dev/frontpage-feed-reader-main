import React from 'react'
import  { useAuth  } from '../context/AuthContext'
import { Navigate, Outlet  } from 'react-router-dom';
import  { ClipLoader } from "react-spinners";

const ProtectedRoute = () => {
    const { user, loading } = useAuth()


  return (
    <>
    { loading ? <ClipLoader /> : user ?  <Outlet />   : <Navigate to="/signin" /> }
    </>
  )
}

export default ProtectedRoute