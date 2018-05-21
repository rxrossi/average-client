import React from 'react'
import styled from 'styled-components'
import LabeledInput from '../../../StyledComponents/LabeledInput'
import Wrapper from '../../../StyledComponents/FormWrapperCenter'
import Button from '../../../StyledComponents/Button'

const ErrorFeedBack = styled.p``

export default ({ handleChange, handleSubmit, fields, errors }) => (
  <Wrapper onSubmit={handleSubmit}>
    <LabeledInput
      label="Email"
      name="email"
      type="email"
      defaultValue={fields.email || ''}
      error={errors.fields && errors.fields.email}
      onChange={handleChange}
    />
    <LabeledInput
      label="Password"
      name="password"
      type="password"
      defaultValue={fields.password || ''}
      error={errors.fields && errors.fields.password}
      onChange={handleChange}
    />
    {errors.message && <ErrorFeedBack message={errors.message} />}
    <Button type="submit">Sign In</Button>
  </Wrapper>
)
