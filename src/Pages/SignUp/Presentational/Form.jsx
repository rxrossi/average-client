import React from 'react'
import LabeledInput from '../../../StyledComponents/LabeledInput'
import Wrapper from '../../../StyledComponents/FormWrapperCenter'
import Button from '../../../StyledComponents/Button'
import ErrorFeedBack from '../../../StyledComponents/FormErrorFeedBack'

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
    <LabeledInput
      label="Confirm Password"
      name="confirmPassword"
      type="password"
      defaultValue={fields.confirmPassword || ''}
      error={errors.fields && errors.fields.confirmPassword}
      onChange={handleChange}
    />
    {errors.message && <ErrorFeedBack>{errors.message}</ErrorFeedBack>}
    <Button type="submit">Sign Up</Button>
  </Wrapper>
)
