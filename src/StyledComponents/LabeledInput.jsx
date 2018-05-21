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
  keepErrorOnChange?: boolean,
  defaultChecked?: boolean,
  onChange: Function
}

type State = {
  value: ?string,
  error: ?string,
  checked?: boolean
}

class LabeledInput extends React.Component<Props, State> {
  state = {
    value: this.props.defaultValue,
    error: this.props.error,
    checked: this.props.defaultChecked
  }

  handleChange = (e: SyntheticInputEvent<>) => {
    const { target: { value, type } } = e
    const { checked } = this.state

    if (type === 'checkbox') {
      this.setState({
        checked: !checked
      })
    } else {
      this.setState({
        value,
        error: this.props.keepErrorOnChange ? this.props.error : ''
      })
    }

    this.props.onChange({
      target: {
        value,
        checked: !checked,
        name: e.target.name,
        type: e.target.type
      }
    })
  }

  render() {
    const { label, name, type } = this.props
    const { error, checked } = this.state
    // checkbox
    // TODO: handleChange does not work for checkbox
    if (type === 'checkbox') {
      return (
        <Wrapper>
          <LabelCheckbox htmlFor={name}>{label}</LabelCheckbox>
          <input
            id={name}
            type={type}
            value={name}
            onChange={this.handleChange}
            checked={checked}
          />
          {error && <Error>{error}</Error>}
        </Wrapper>
      )
    }

    // default (text) input
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
  text-align: left;
  display: inline-block;
  align-items: center;
  width: 500px;
  max-width: 100%;
  margin: 15px 0;
  position: relative;
`

const Label = styled.label`
  display: block;
  color: ${props => (props.error ? red : blue)};
  font-weight: bold;
  padding: 0 1px;
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

const LabelCheckbox = styled.label`
  color: ${blue};
  display: inline-block;
  font-weight: bold;
  font-size: 1rem;
  padding: 0;
  margin-right: 5px;
  top: -0.15rem;
  position: relative;
`

const Input = styled.input`
  border: 0;
  display: inline-block;
  width: 100%;
  padding: 8px 0;
  border-bottom: 1px solid ${props => (props.error ? red : softBlue)};
  &:focus {
    outline: none;
    border-bottom: 1px solid ${blue};
  }
`
