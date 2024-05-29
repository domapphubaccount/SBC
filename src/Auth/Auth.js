import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem('data');

    if (!data) {
      router.push('/logIn');
    }
  }, [router]);
};

export default useAuth;