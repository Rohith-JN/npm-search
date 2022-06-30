import '../styles/globals.css'
import Layout from '../components/Layout'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import Router from "next/router";
import Loader from '../components/Loader';
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <ThemeProvider attribute="class">
      <Layout>
        {loading ? (<Loader />) : (<Component {...pageProps} />)}
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp
