import React from 'react'
import NavBar from '../../../NavBar'
import Form from './Form'

export default ({ handleSubmit }) => (
  <div>
    <NavBar />
    <Form fields={{}} errors={{}} handleSubmit={handleSubmit} />
  </div>
)
