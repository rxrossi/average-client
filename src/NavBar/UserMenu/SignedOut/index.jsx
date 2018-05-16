import React from 'react'
import styled from 'styled-components'
import BaseLink from '../../../StyledComponents/BaseLink'
import { grey, blue, softBlue } from '../../../colors'

const Wrapper = styled.div`
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
`

const Link = styled(BaseLink)`
  display: 'inline-block';
  color: ${blue};
  width: 70px;
  font-size: 1rem;
  padding: 0.5rem;
  text-align: center;

  &:hover {
    color: ${grey}
    background-color: ${softBlue};
    box-shadow: 1px 1px 1px #999;
    border-radius: 2px;
  }
`

export default () => (
  <Wrapper>
    <Link to="/signin">Sign in</Link>
    <Link to="/signup">Sign up</Link>
  </Wrapper>
)
