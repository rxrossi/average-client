import React from 'react'
import Presentational from './Presentational'
import { AuthContext } from '../../AuthComponent'

const SignIn = ({ handleSubmit }) => (
  <Presentational handleSubmit={handleSubmit} />
)

export default () => (
  <AuthContext.Consumer>
    {({ signIn }) => <SignIn handleSubmit={signIn} />}
  </AuthContext.Consumer>
)
