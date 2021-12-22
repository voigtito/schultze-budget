import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { PDFProvider } from '../contexts/usePDF'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PDFProvider>
      <Component {...pageProps} />
    </PDFProvider>
  )
}

export default MyApp
