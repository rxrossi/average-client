// @flow
import React from 'react'
import styled from 'styled-components'
import { blue, softBlue, red } from '../colors'

type Props = {
  label: string,
  name: string,
  type: string,
  defaultValue?: string,
  error?: string,
  keepErrorOnChange?: boolean
}

type State = {
  value: ?string,
  error: ?string
}

class LabeledInput extends React.Component<Props, State> {
  state = {
    value: this.props.defaultValue,
    error: this.props.error
  }

  handleChange = (e: SyntheticInputEvent<>) => {
    const { target: { value } } = e
    this.setState({
      value,
      error: this.props.keepErrorOnChange ? this.props.error : ''
    })
  }

  // TODO: use a different label for inputs that are not text
  render() {
    const { label, name, type } = this.props
    const { error } = this.state
    return (
      <Wrapper>
        <Label error={error} value={this.state.value} htmlFor={name}>
          {label}
        </Label>
        <Input
          error={error}
          name={name}
          id={name}
          type={type}
          value={this.state.value}
          placeholder={label}
          onChange={this.handleChange}
        />
        {error && <Error>{error}</Error>}
      </Wrapper>
    )
  }
}

export default LabeledInput

const Error = styled.p`
  display: block;
  color: ${red};
  font-size: 0.7rem;
  position: absolute;
  top: 1.4rem;
`

const Wrapper = styled.div`
  display: inline-block;
  align-items: center;
  width: 250px;
  max-width: 100%;
  margin: 15px 0;
  position: relative;
`

const Label = styled.label`
  display: block;
  color: ${props => (props.error ? red : blue)};
  font-weight: bold;
  padding: 0 5px;
  font-size: 0.7rem;
  position: absolute;
  top: -10px;
  /*if props.value is defined makes the label hidden but still readable for screen readers */
  ${props =>
    !props.value &&
    `
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    height: 1px; width: 1px;
    margin: -1px; padding: 0; border: 0;
    `};
`

const Input = styled.input`
  border: 0;
  display: block;
  width: 200px;
  padding: 8px 2px;
  border-bottom: 1px solid ${props => (props.error ? red : softBlue)};
  &:focus {
    outline: none;
    border-bottom: 1px solid ${blue};
  }
`
