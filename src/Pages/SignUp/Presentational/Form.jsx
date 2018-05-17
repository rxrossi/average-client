import React from 'react'
import styled from 'styled-components'

const Button = styled.button``
const Wrapper = styled.form``
const ErrorFeedBack = styled.p``
const CInput = styled.input``

export default ({ handleChange, handleSubmit, fields, errors }) => (
  <Wrapper
    onSubmit={e => {
      e.preventDefault()
      handleSubmit()
    }}
  >
    <CInput
      label="Email"
      name="email"
      type="email"
      value={fields.email || ''}
      error={errors.fields && errors.fields.email}
      handleChange={handleChange}
    />
    <CInput
      label="Password"
      name="password"
      type="password"
      value={fields.password || ''}
      error={errors.fields && errors.fields.password}
      handleChange={handleChange}
    />
    <CInput
      label="Confirm Password"
      name="confirmPassword"
      type="password"
      value={fields.confirmPassword || ''}
      error={errors.fields && errors.fields.confirmPassword}
      handleChange={handleChange}
    />

    {errors.message && <ErrorFeedBack message={errors.message} />}
    <Button type="submit">Sign Up</Button>
  </Wrapper>
)
