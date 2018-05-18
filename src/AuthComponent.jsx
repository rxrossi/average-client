import React from 'react'

export const AuthContext = React.createContext()

export default class Auth extends React.Component {
  state = {
    authenticated: false
  }

  componentDidMount() {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      const token = JSON.parse(localStorage.getItem('token'))
      if (user && token) {
        this.setState({ authenticated: true, user, token })
      }
    } catch (e) {}
  }

  storeUserAndToken = ({ user, token }) => {
    this.setState({ authenticated: true, user, token }, () =>
      console.log(this.state)
    )
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', JSON.stringify(token))
  }

  removeUserAndToken = () => {
    this.setState(
      { authenticated: false, user: undefined, token: undefined },
      () => console.log(this.state)
    )
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
          storeUserAndToken: this.storeUserAndToken,
          removeUserAndToken: this.removeUserAndToken
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}
