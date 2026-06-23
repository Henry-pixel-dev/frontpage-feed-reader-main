import React from 'react'
import  { useAuth  } from '../context/AuthContext'
import { Navigate, Outlet, useOutletContext  } from 'react-router-dom';
import  { ClipLoader } from "react-spinners";

const ProtectedRoute = () => {
    const { user, loading } = useAuth()
    const context = useOutletContext()


  return (
    <>
    { loading ? <ClipLoader /> : user ?  <Outlet context={context} />   : <Navigate to="/signin" /> }
    </>
  )
}

export default ProtectedRoute