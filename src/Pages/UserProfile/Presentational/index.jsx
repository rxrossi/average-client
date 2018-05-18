import React from 'react'
import styled from 'styled-components'

// TODO: replace the components bellow
const Wrapper = styled.form``
const CInput = styled.input``
const ErrorFeedBack = styled.p``
const Button = styled.button``

export default ({ handleChange, handleSubmit, fields, errors }) => {
  return (
    <Wrapper onSubmit={handleSubmit}>
      <Img value={fields.photo} />
      <input name="photo" type="file" onChange={handleChange} />
      <CInput
        label="Name"
        name="name"
        type="text"
        value={fields.name || ''}
        error={errors.fields && errors.fields.name}
        onChange={handleChange}
      />
      {errors.message && <ErrorFeedBack message={errors.message} />}
      <Button type="submit">Save</Button>
    </Wrapper>
  )
}

const defaultPhoto = 'https://www.w3schools.com/howto/img_avatar.png'

const Img = ({ value }) => {
  return (
    <img
      style={style.photo}
      src={(value && value.forPreview) || defaultPhoto}
      alt=""
    />
  )
}

const style = {
  photo: {
    display: 'block',
    maxWidth: '90%',
    height: 'auto',
    maxHeight: '300px',
    margin: '15px auto'
  }
}
