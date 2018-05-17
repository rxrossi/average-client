import React from 'react'

export const AuthContext = React.createContext()

export default class Auth extends React.Component {
  state = {
    authenticated: false
  }

  handleAuthSignIn = values => {
    console.log('signIn')
    console.log(values)
    this.setState({ authenticated: true })
  }

  handleAuthSignUp = values => {
    console.log('signUp')
    console.log(values)
    this.setState({ authenticated: true })
  }

  handleAuthSignOut = () => {
    console.log('signOut')
    this.setState({ authenticated: false })
  }

  render() {
    const { authenticated } = this.state
    return (
      <AuthContext.Provider
        value={{
          authenticated,
          signIn: this.handleAuthSignIn,
          signUp: this.handleAuthSignUp,
          signOut: this.handleAuthSignOut
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}
