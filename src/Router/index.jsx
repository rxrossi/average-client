import React from 'react'
import { Route, Link } from 'react-router-dom'
// import RequiredSignInRoute from './RequireSignInRoute'
// import RequiredSignOutRoute from './RequireSignOutRoute'

const Home = () => <p>Home</p>

const Test = () => <p>Test</p>

const Router = () => (
  <div>
    <Link to="/">Home</Link>
    <Link to="/test">Test</Link>
    <Route exact path="/" component={Home} />
    <Route exact path="/test" component={Test} />
  </div>
)

export default Router
