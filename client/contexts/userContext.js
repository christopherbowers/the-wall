import React from 'react'

const GlobalContext = React.createContext({
  authenticated: false,
  id: undefined,
  update: (data) => {}
})

export default GlobalContext
