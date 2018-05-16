import React from 'react'
import { Container, Row, Col, Button } from 'react-materialize'
import CInput from '../../../../SharedStyled/Forms/Input'

export default ({
  article: {
    tags, published, mainImg, description, title, link,
  },
  handleChange,
  toggleDetailsEditor,
}) => (
  <Container>
    <Row>
      <Col s={12}>
        <CInput
          label="Title"
          name="title"
          type="text"
          value={title || ''}
          handleChange={handleChange}
        />
        <CInput
          label="Description"
          name="description"
          type="textarea"
          value={description || ''}
          handleChange={handleChange}
        />
        <CInput
          label="Link"
          name="link"
          type="text"
          value={link || ''}
          handleChange={handleChange}
        />
        <CInput
          label="Tags"
          name="tags"
          type="text"
          value={tags || ''}
          handleChange={handleChange}
        />
        <CInput
          label="Publish?"
          name="published"
          type="checkbox"
          checked={published}
          handleChange={handleChange}
        />
        <p>TODO: Main img selector</p>
      </Col>
    </Row>
  </Container>
)
