import '@styles/globals.scss'
import { useState } from 'react'
import GlobalContext from '@contexts/userContext'

function MyApp({ Component, pageProps }) {
  const [state, setState] = useState({
    authenticated: null,
    update
  })

  function update(data) {
    setState(Object.assign({}, state, data));
  }

  return (
    <GlobalContext.Provider value={state}>
      <Component {...pageProps} />
    </GlobalContext.Provider>
  )
}

export default MyApp
