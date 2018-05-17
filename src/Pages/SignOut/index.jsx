import React from 'react'
import NavBar from '../../NavBar'
import { AuthContext } from '../../AuthComponent'

const SignOut = ({ handleSignOut }) => (
  <div>
    <NavBar />
    <button onClick={handleSignOut}>Sign out</button>
  </div>
)

export default () => (
  <AuthContext.Consumer>
    {({ signOut }) => <SignOut handleSignOut={signOut} />}
  </AuthContext.Consumer>
)
