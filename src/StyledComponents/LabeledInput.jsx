import React from 'react'

export default ({ label, name, ...rest }) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <input name={name} id={name} {...rest} />
  </div>
)
