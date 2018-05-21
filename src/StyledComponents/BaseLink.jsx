import styled from 'styled-components'
import { Link } from 'react-router-dom'

const BaseLink = styled(Link)`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

export default BaseLink
