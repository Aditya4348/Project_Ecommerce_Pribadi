import React, { createContext, useContext, ReactNode, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User, LoginCredentials, RegisterCredetials } from '../types';
import  * as apiClient  from '../services/api/authApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import api from '@/services/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (details: RegisterCredetials) => Promise<void>;
  logout: () => void;
  updateUser: (newUser: User) => void;
  setUserAndToken: (user: User, token: string) => void;
  isLoggingIn: boolean;
  isRegistering: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Gunakan React Query sebagai satu-satunya sumber data pengguna.
  const { data: user, isLoading: loading } = useQuery<User | null>({
    queryKey: ['user'],
    queryFn: async () => {
      const token = localStorage.getItem('auth_token');
      if (!token) return null;
      try {
        const fetchedUser = await apiClient.getAuthUser();
        if (!fetchedUser.roles || fetchedUser.roles.length === 0) {
          fetchedUser.roles = [fetchedUser.current_role];
        }
        console.error('fetching user:', fetchedUser);
        return fetchedUser;
      } catch (error) {
        // Tangani error di sini, misalnya token tidak valid
        localStorage.removeItem('auth_token');
        queryClient.setQueryData(['user'], null);
        console.error('Error fetching user:', error);
        return null; // Kembalikan null jika fetch gagal
      }
    },
    staleTime: 1000 * 60 * 15, // Data dianggap fresh selama 15 menit
    retry: 1,
  });

  const { mutateAsync: login, isPending: isLoggingIn } = useMutation({
    mutationFn: apiClient.getAuthLogin,
    onSuccess: ({ user: loggedInUser, token }) => {
      localStorage.setItem('token', token);
      // Simpan data user utama ke cache
      queryClient.setQueryData(['user'], loggedInUser);

      console.log("loggedInUser",loggedInUser);
      
      if(loggedInUser.role === 'admin'){
        navigate('/admin/dashboard');
        toast.success('Login Berhasil, Selamat Datang Admin')
      }else{
        navigate('/');
        toast.success('Login Berhasil, Nikmati berbagai Kemudahan Sebagai User')
      }

      
    },
    onError: (error) => {
      toast.error('Login gagal. Silakan coba lagi.');
    }
  });

  const { mutateAsync: register, isPending: isRegistering } = useMutation({
    mutationFn: apiClient.getAuthRegister,
    onSuccess: (data) => {  
      // Pesan umum untuk registrasi yang berhasil.
      // Navigasi ditangani di dalam komponen (RegisterPage).
      toast.success('Registrasi berhasil. Silakan periksa email Anda untuk verifikasi.');
    },
    onError: (error) => {
      toast.error('Registrasi gagal. Silakan coba lagi.');
    }
  });

  const logout = async () => {
    try {
      await apiClient.getAuthLogout();
      queryClient.setQueryData(['user'], null)
    } catch (error) {
      console.error("Logout failed on server, but logging out client-side.", error);
    } finally {
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization']; // Sembunyikan modal saat logout
      queryClient.clear(); // Membersihkan semua cache saat logout
      toast.success('Logout Berhasil');
      window.location.href = '/'; // Paksa refresh halaman penuh saat logout
    }
  };

  const updateUser = (newUser: User) => {    
    queryClient.setQueryData(['user'], newUser);
  };


  return (
    <AuthContext.Provider value={{ 
      user: user || null,
      current_role: user || null,
      loading,
      login,
      register,
      logout,
      updateUser,
      isLoggingIn,
      isRegistering,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};