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
import MyArticles from '../Pages/MyArticles'
import { AuthContext } from '../AuthComponent'

// TODO: add flow
const Router = props => (
  <div>
    <Route exact path="/" component={Home} />
    <Route path="/article/:link?" component={Article} />
    <RequiredSignOutRoute
      authenticated={props.authenticated}
      path="/signin"
      component={SignIn}
    />
    <RequiredSignOutRoute
      authenticated={props.authenticated}
      path="/signup"
      component={SignUp}
    />
    <RequiredSignInRoute
      authenticated={props.authenticated}
      path="/profile"
      component={UserProfile}
    />
    <RequiredSignInRoute
      authenticated={props.authenticated}
      path="/myarticles"
      component={MyArticles}
    />
    <RequiredSignInRoute
      authenticated={props.authenticated}
      path="/signout"
      component={SignOut}
    />
  </div>
)

// export default Router

export default props => (
  <AuthContext.Consumer>
    {({ authenticated }) => <Router authenticated={authenticated} />}
  </AuthContext.Consumer>
)
