import React from 'react'
const eventContext = React.createContext({
  user: {},
  error: null,
  loading: false,
  redirect: null,
  updateUser: () => {},
  updateError: () => {},
  updateLoading: () => {},
  updateRedirect: () => {}
})
export default eventContext
