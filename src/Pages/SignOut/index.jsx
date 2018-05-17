import React from 'react'
import NavBar from '../../NavBar'
import { AuthContext } from '../../AuthComponent'

const SignOut = ({ removeUserAndToken }) => (
  <div>
    <NavBar />
    <button onClick={removeUserAndToken}>Sign out</button>
  </div>
)

export default () => (
  <AuthContext.Consumer>
    {({ removeUserAndToken }) => (
      <SignOut removeUserAndToken={removeUserAndToken} />
    )}
  </AuthContext.Consumer>
)
