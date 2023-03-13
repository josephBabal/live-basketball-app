import '@/styles/globals.css'
import Navbar from '../components/Navbar'
import { Provider } from 'react-redux'
import { store } from '../redux/store'

export default function App({ Component, pageProps }) {
  return (
  <main>
    <Provider store={store} >
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  </main>
    // Component {...pageProps} />
)}
