import { useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthWrapper = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const loginToken = localStorage.getItem("bih");
    if (!loginToken) {
      router.push("/login");
    }
  }, []);

  return children;
};

export default AuthWrapper;
