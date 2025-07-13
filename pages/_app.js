// pages/_app.js

import '@/styles/globals.css';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
    </>
  );
}
