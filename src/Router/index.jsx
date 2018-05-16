import React from 'react'
import { Route } from 'react-router-dom'
import Home from '../Pages/Home'
import RequiredSignInRoute from './RequireSignInRoute'
import RequiredSignOutRoute from './RequireSignOutRoute'
import SignIn from '../Pages/SignIn'
import SignOut from '../Pages/SignOut'
import SignUp from '../Pages/SignUp'
import UserProfile from '../Pages/UserProfile'
import Article from '../Pages/Article'

const Router = props => (
  <div>
    <Route exact path="/" component={Home} />
    <Route path="/article/:link?" component={Article} />
    <RequiredSignOutRoute
      authenticated={props.authToken}
      path="/signin"
      component={SignIn}
    />
    <RequiredSignOutRoute
      authenticated={props.authToken}
      path="/signup"
      component={SignUp}
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
