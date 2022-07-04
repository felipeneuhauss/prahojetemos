import '../styles/globals.css';
import type { AppProps } from 'next/app';
import MainLayout from 'layouts/MainLayout';
import Seo from 'components/Seo';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Seo title="últimos termos pesquisado" />
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default MyApp;
