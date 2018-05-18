import React from 'react'
import NavBar from '../../NavBar'
import { AuthContext } from '../../AuthComponent'

const SignOut = ({ removeUserIDAndToken }) => (
  <div>
    <NavBar />
    <button onClick={removeUserIDAndToken}>Sign out</button>
  </div>
)

export default () => (
  <AuthContext.Consumer>
    {({ removeUserIDAndToken }) => (
      <SignOut removeUserIDAndToken={removeUserIDAndToken} />
    )}
  </AuthContext.Consumer>
)
