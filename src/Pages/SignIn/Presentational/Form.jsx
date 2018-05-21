import React from 'react'
import LabeledInput from '../../../StyledComponents/LabeledInput'
import Wrapper from '../../../StyledComponents/FormWrapperCenter'
import Button from '../../../StyledComponents/Button'
import ErrorFeedBack from '../../../StyledComponents/FormErrorFeedBack'

export default ({ handleChange, handleSubmit, fields, errors }) => {
  return (
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
      {errors.message && <ErrorFeedBack>{errors.message}</ErrorFeedBack>}
      <Button type="submit">Sign In</Button>
    </Wrapper>
  )
}
