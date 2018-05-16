/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const root = document.getElementById('root')

if (!root) {
  throw new Error('no root element')
}

ReactDOM.render(<App />, root)
registerServiceWorker()
