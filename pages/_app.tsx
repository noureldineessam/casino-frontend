import { AppProps } from 'next/app';
import '../styles/styles.css';

// Custom App component
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
