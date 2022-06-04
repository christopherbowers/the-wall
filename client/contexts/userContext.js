import React from 'react'

const GlobalContext = React.createContext({
  token: null,
  update: (data) => {}
})

export default GlobalContext
