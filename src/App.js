/* @flow*/
import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from './Router'
import AuthComponent from './AuthComponent'

class App extends Component<{}> {
  render() {
    return (
      <BrowserRouter>
        <AuthComponent>
          <Router />
        </AuthComponent>
      </BrowserRouter>
    )
  }
}

export default App
