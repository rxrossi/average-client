import React from 'react'
import styled from 'styled-components'
import Wrapper from '../../../UtilityComponents/HandleClickOutside'
import { white } from '../../../colors'
import DropDownBase from '../../../StyledComponents/DropDownOfMenu'
import Input from '../../../StyledComponents/LabeledInput'

// TODO: add flow
class PublishMenu extends React.Component<Props, State> {
  state = {
    open: false
  }

  close = () => {
    this.setState({ open: false })
  }

  toggleOpen = () => {
    const { open } = this.state
    this.setState({ open: !open })
  }

  render() {
    return (
      <Wrapper handleClickOutside={this.close} handleClickInside={() => {}}>
        <MainBtn onClick={this.toggleOpen}>Publish \/</MainBtn>
        {this.state.open && (
          <DropDown>
            <Form
              article={this.props.article}
              handleChange={this.props.handleChange}
            />
          </DropDown>
        )}
      </Wrapper>
    )
  }
}

export default PublishMenu

const DropDown = styled(DropDownBase)`
  width: 280px;
  right: +120px;
  left: auto;
  & > ul {80px 150px;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  & > ul > li {
    margin: 10px 0;
  }
`

const MainBtn = styled.button`
  border: 0;
  width: 100px;
  background-color: ${white};
  padding: 2px 10px;
  box-shadow: 0 0 2px #999;
  &:focus {
    outline: 0;
    box-shadow: 0 0 4px #777;
  }
`

const Form = ({
  article: { tags, published, mainImg, description, title, link },
  handleChange,
  toggleDetailsEditor
}) => {
  // TODO: add image selector
  return (
    <div>
      <Input
        label="Title"
        name="title"
        type="text"
        defaultValue={title || ''}
        onChange={onChange(handleChange)}
      />
      <Input
        label="Description"
        name="description"
        type="textarea"
        defaultValue={description || ''}
        onChange={onChange(handleChange)}
      />
      <Input
        label="Link"
        name="link"
        type="text"
        defaultValue={link || ''}
        onChange={onChange(handleChange)}
      />
      <Input
        label="Tags"
        name="tags"
        type="text"
        defaultValue={tags || ''}
        onChange={onChange(handleChange)}
      />
      <Input
        label="Publish?"
        name="published"
        type="checkbox"
        defaultChecked={published}
        onChange={onChange(handleChange)}
      />
    </div>
  )
}

const onChange = fn => e => {
  const { target: { value, name } } = e
  fn(name, value)
}
