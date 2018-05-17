import React from 'react'

export const AuthContext = React.createContext()

export default class Auth extends React.Component {
  state = {
    authenticated: false
  }
  render() {
    const { authenticated } = this.state
    return (
      <AuthContext.Provider
        value={{
          authenticated
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}
