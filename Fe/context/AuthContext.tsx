import React, { createContext, useContext, ReactNode, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User, LoginCredentials, RegisterCredetials, VerifyRegistrationCredentials } from '../types';
import  * as apiClient  from '../services/api/authApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import api from '@/services/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (details: RegisterCredetials) => Promise<void>;
  verifyRegistration: (credentials: VerifyRegistrationCredentials) => Promise<void>;
  logout: () => void;
  updateUser: (newUser: User) => void;
  setUserAndToken: (user: User, token: string) => void;
  isLoggingIn: boolean;
  isRegistering: boolean;
  isVerifying: boolean;
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
    onSuccess: ({ user: loggedInUser, auth_token }) => {
      localStorage.setItem('auth_token', auth_token);
      // Simpan data user utama ke cache
      queryClient.setQueryData(['user'], loggedInUser);
      
      if(loggedInUser.role === 'admin'){
        navigate('/admin/dashboard');
        toast.success('Login Berhasil, Selamat Datang Admin')
      }else{
        navigate('/');
        toast.success('Login Berhasil, Nikmati berbagai Kemudahan Sebagai User')
      }

      
    },
    onError: (error) => {
      // @ts-ignore
      if (error.response && error.response.status === 403) {
        toast.error('Email belum terverifikasi. Silakan periksa email Anda.');
      // @ts-ignore
      } else if (error.response && error.response.status === 401) {
        toast.error('Email atau password salah.');
      } else {
        toast.error('Login gagal. Silakan coba lagi.');
      }
    }
  });

  const { mutateAsync: register, isPending: isRegistering } = useMutation({
    mutationFn: apiClient.getAuthRegister,
    onSuccess: (data) => {  
      // Pesan umum untuk registrasi yang berhasil.
      // Navigasi ke halaman verifikasi OTP ditangani di dalam komponen RegisterPage.
      toast.success('Registrasi berhasil. Silakan periksa email Anda untuk verifikasi.');
    },
    onError: (error) => {
      toast.error('Registrasi gagal. Silakan coba lagi.');
    }
  });

  // Mutasi baru untuk verifikasi OTP setelah registrasi
  const { mutateAsync: verifyRegistration, isPending: isVerifying } = useMutation({
    mutationFn: apiClient.verifyRegistration, // Anda perlu membuat fungsi ini di apiClient
    onSuccess: ({ user: verifiedUser, access_token }) => {
      localStorage.setItem('auth_token', access_token);
      queryClient.setQueryData(['user'], verifiedUser);
      
      if (verifiedUser.role === 'admin') {
        navigate('/admin/dashboard');
        toast.success('Verifikasi Berhasil, Selamat Datang Admin');
      } else {
        navigate('/');
        toast.success('Verifikasi Berhasil, Selamat Datang!');
      }
    },
    onError: (error) => {
      toast.error('Verifikasi gagal. OTP tidak valid atau sudah kedaluwarsa.');
    }
  });

  const logout = async () => {
    try {
      await apiClient.getAuthLogout();
      queryClient.setQueryData(['user'], null)
    } catch (error) {
      console.error("Logout failed on server, but logging out client-side.", error);
    } finally {
      localStorage.removeItem('auth_token');
      delete api.defaults.headers.common['Authorization']; // Sembunyikan modal saat logout
      queryClient.clear(); // Membersihkan semua cache saat logout
      toast.success('Logout Berhasil');
      window.location.href = '/'; // Paksa refresh halaman penuh saat logout
    }
  };

  const updateUser = (newUser: User) => {    
    queryClient.setQueryData(['user'], newUser);
  };

  const setUserAndToken = (user: User, token: string) => {
    localStorage.setItem('auth_token', token);
    queryClient.setQueryData(['user'], user);
  };

  return (
    <AuthContext.Provider value={{ 
      user: user || null,
      loading,
      login,
      register,
      verifyRegistration,
      logout,
      updateUser,
      setUserAndToken,
      isLoggingIn,
      isRegistering,
      isVerifying,
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