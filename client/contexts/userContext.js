import React from 'react'

const GlobalContext = React.createContext({
  authenticated: false,
  update: (data) => {}
})

export default GlobalContext
