import React from 'react'
import { Route } from 'react-router-dom'
import Home from '../Pages/Home'
import Test from '../Pages/Test'
import RequiredSignInRoute from './RequireSignInRoute'
import RequiredSignOutRoute from './RequireSignOutRoute'

/*
  move the NavBar outside, inject in each route
  replace with the client2 navbar
*/

const SignIn = () => <div>SignIn</div>
const SignOut = () => <div>SignOut</div>
const UserProfile = () => <div>UserProfile</div>

const Router = props => (
  <div>
    <Route exact path="/" component={Home} />
    <Route exact path="/test" component={Test} />
    <RequiredSignOutRoute
      authenticated={props.authToken}
      path="/signin"
      component={SignIn}
    />
    <RequiredSignInRoute
      authenticated={props.authToken}
      path="/profile"
      component={UserProfile}
    />
    <RequiredSignInRoute
      authenticated={props.authToken}
      path="/signout"
      component={SignOut}
    />
  </div>
)

export default Router
