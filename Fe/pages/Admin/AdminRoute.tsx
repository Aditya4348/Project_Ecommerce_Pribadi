import { useAuth } from '@/context/AuthContext';
import {  useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { Navigate } from 'react-router-dom';




const AdminRoute = ({children}: {children: React.ReactNode}) => {
    const { user, loading} = useAuth();
    
     if (loading) return null;
     if(!user) return <Navigate to={'/login'}/>;
     if(user.role !== 'admin') return <Navigate to={'/'}/>;


    return children
}

export default AdminRoute;