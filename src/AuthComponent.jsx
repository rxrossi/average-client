import React from 'react'

export const AuthContext = React.createContext()

export default class Auth extends React.Component {
  constructor(props) {
    super(props)

    try {
      var userID = JSON.parse(localStorage.getItem('userID'))
      var token = JSON.parse(localStorage.getItem('token'))
    } catch (e) {}

    this.state = {
      authenticated: token ? true : false,
      userID,
      token
    }
  }

  storeUserIDAndToken = ({ userID, token }) => {
    this.setState({ authenticated: true, userID, token })
    localStorage.setItem('userID', JSON.stringify(userID))
    localStorage.setItem('token', JSON.stringify(token))
  }

  removeUserIDAndToken = () => {
    this.setState({ authenticated: false, userID: undefined, token: undefined })
    localStorage.removeItem('userID')
    localStorage.removeItem('token')
  }

  render() {
    const { authenticated, userID, token } = this.state
    return (
      <AuthContext.Provider
        value={{
          authenticated,
          userID,
          token,
          storeUser: this.storeUser,
          storeUserIDAndToken: this.storeUserIDAndToken,
          removeUserIDAndToken: this.removeUserIDAndToken
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}
