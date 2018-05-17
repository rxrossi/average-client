import React from 'react'
import styled from 'styled-components'

const Button = styled.button``
const Wrapper = styled.form``
const ErrorFeedBack = styled.p``
const CInput = styled.input``

export default ({ handleChange, handleSubmit, fields, errors }) => (
  <Wrapper onSubmit={handleSubmit}>
    <CInput
      label="Email"
      name="email"
      type="email"
      defaultValue={fields.email || ''}
      error={errors.fields && errors.fields.email}
      onChange={handleChange}
    />
    <CInput
      label="Password"
      name="password"
      type="password"
      defaultValue={fields.password || ''}
      error={errors.fields && errors.fields.password}
      onChange={handleChange}
    />

    <CInput
      label="Confirm Password"
      name="confirmPassword"
      type="password"
      defaultValue={fields.confirmPassword || ''}
      error={errors.fields && errors.fields.confirmPassword}
      onChange={handleChange}
    />

    {errors.message && <ErrorFeedBack message={errors.message} />}
    <Button type="submit">Sign Up</Button>
  </Wrapper>
)
