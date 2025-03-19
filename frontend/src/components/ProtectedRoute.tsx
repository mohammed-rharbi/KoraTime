"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '../../store/authStore';
import { FootballSpinner } from './ui/spinner';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { token, isLoading } = useAuthStore();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {

    const localStorageToken = localStorage.getItem('AdminToken');

    if (!token && !localStorageToken) {
      router.push('/auth/login');
    } else {
      setIsCheckingAuth(false);
    }
  }, [token, router]);

  if (isCheckingAuth || isLoading) {
    return <FootballSpinner/>;
  }

  return <>{children}</>;
}