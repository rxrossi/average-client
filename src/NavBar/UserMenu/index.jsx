// @flow
import React from 'react'
import SignedIn from './SignedIn'
import SignedOut from './SignedOut'

type Props = {
  authenticated: ?boolean
}

export default (props: Props) => {
  if (props.authenticated) {
    return <SignedIn />
  }
  return <SignedOut />
}
