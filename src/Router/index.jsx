import React from 'react'
import { Route } from 'react-router-dom'
import Home from '../Pages/Home'
import Test from '../Pages/Test'
// import RequiredSignInRoute from './RequireSignInRoute'
// import RequiredSignOutRoute from './RequireSignOutRoute'

/*
  move the NavBar outside, inject in each route
  replace with the client2 navbar
*/

const Router = () => (
  <div>
    <Route exact path="/" component={Home} />
    <Route exact path="/test" component={Test} />
  </div>
)

export default Router
