"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);
};

export default useAuth;
