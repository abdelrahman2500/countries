import { useState } from 'react'
import { Provider} from 'react-redux'
import Header from '../components/Header'
import { store } from '../redux/store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const[theme, setTheme] = useState("dark")

  return(
    <Provider store={store}>
      <div className={`${theme} min-h-screen capitalize`}>
          <Header setTheme={setTheme} />
          <Component {...pageProps} />
      </div>
    </Provider>
  ) 
}

export default MyApp
