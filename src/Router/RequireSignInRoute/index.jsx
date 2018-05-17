import React from 'react'
import { Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

export default ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated ? (
        <Component authenticated={authenticated} {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/signin',
            state: { from: props.location }
          }}
        />
      )
    }
  />
)
