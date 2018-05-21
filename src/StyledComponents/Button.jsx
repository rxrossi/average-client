import styled from 'styled-components'
import { softBlue, grey } from '../colors'

export default styled.button`
  color: white;
  border: 0;
  padding: 8px 24px;
  background: ${grey};
  border-radius: 2px;
  &:hover {
    color: ${grey};
    box-shadow: none;
    background: ${softBlue};
  }
  &:focuse: {
    outline: none;
  }
`
