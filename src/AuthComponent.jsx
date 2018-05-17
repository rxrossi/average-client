import React from 'react'

export const AuthContext = React.createContext()

export default class Auth extends React.Component {
  state = {
    authenticated: false
  }

  storeUserAndToken = ({ user, token }) => {
    this.setState({ authenticated: true, user, token }, () =>
      console.log(this.state)
    )
  }

  removeUserAndToken = () => {
    this.setState(
      { authenticated: false, user: undefined, token: undefined },
      () => console.log(this.state)
    )
  }

  render() {
    const { authenticated, user, token } = this.state
    return (
      <AuthContext.Provider
        value={{
          authenticated,
          user,
          token,
          storeUserAndToken: this.storeUserAndToken,
          removeUserAndToken: this.removeUserAndToken
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}
