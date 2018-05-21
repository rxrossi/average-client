// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import BaseLink from './BaseLink'
import DropdownOfMenu from './DropDownOfMenu'
import LabeledInput from './LabeledInput'

const Router = storyFn => (
  <BrowserRouter>
    <div style={{ textAlign: 'center' }}>{storyFn()}</div>
  </BrowserRouter>
)

storiesOf('StyledComponents', module)
  .addDecorator(Router)
  .add('default', () => <BaseLink to="/">BaseLink</BaseLink>)
  .add('DropdownOfMenu', () => (
    <DropdownOfMenu>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </DropdownOfMenu>
  ))
  .add('LabeledInput', () => (
    <div>
      <p>Empty:</p>
      <LabeledInput label="Name" name="name" type="text" onChange={() => {}} />
      <p>With value</p>
      <LabeledInput
        onChange={() => {}}
        label="Name"
        name="name"
        type="text"
        defaultValue="Carlos D"
      />

      <p>With error:</p>
      <LabeledInput
        onChange={() => {}}
        label="Name"
        name="name"
        type="text"
        defaultValue="Carlos D"
        error="Too cool"
      />

      <p>With error that is displayed even after changing the value:</p>
      <LabeledInput
        onChange={() => {}}
        label="Name"
        name="name"
        type="text"
        defaultValue="Carlos D"
        error="Too cool"
        keepErrorOnChange
      />

      <p>checkbox</p>
      <LabeledInput
        label="Publish"
        name="publish"
        type="checkbox"
        onChange={() => {}}
      />

      <p>checkbox checked</p>
      <LabeledInput
        onChange={() => {}}
        label="Publish"
        name="publish"
        type="checkbox"
        defaultChecked={true}
      />
    </div>
  ))
