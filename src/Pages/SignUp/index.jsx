import React from 'react'
import Presentational from './Presentational'
import { AuthContext } from '../../AuthComponent'

const SignUp = ({ handleSubmit }) => (
  <Presentational handleSubmit={handleSubmit} />
)

export default () => (
  <AuthContext.Consumer>
    {({ signUp }) => <SignUp handleSubmit={signUp} />}
  </AuthContext.Consumer>
)
