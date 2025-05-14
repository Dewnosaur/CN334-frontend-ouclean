import "@/styles/globals.css";
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const publicPages = ['/login', '/register'];

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && !publicPages.includes(router.pathname)) {
      router.replace('/login');
    }
  }, [router.pathname]);

  return <Component {...pageProps} />;
}

export default MyApp;
