import React from 'react'

export const AuthContext = React.createContext()

export default class Auth extends React.Component {
  constructor(props) {
    super(props)

    try {
      var user = JSON.parse(localStorage.getItem('user'))
      var token = JSON.parse(localStorage.getItem('token'))
    } catch (e) {}

    this.state = {
      authenticated: token ? true : false,
      user,
      token
    }
  }

  storeUserAndToken = ({ user, token }) => {
    this.setState({ authenticated: true, user, token })
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', JSON.stringify(token))
  }

  storeUser = ({ user, token }) => {
    this.setState({ user })
    localStorage.setItem('user', JSON.stringify(user))
  }

  removeUserAndToken = () => {
    this.setState({ authenticated: false, user: undefined, token: undefined })
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  render() {
    const { authenticated, user, token } = this.state
    return (
      <AuthContext.Provider
        value={{
          authenticated,
          user,
          token,
          storeUser: this.storeUser,
          storeUserAndToken: this.storeUserAndToken,
          removeUserAndToken: this.removeUserAndToken
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}
