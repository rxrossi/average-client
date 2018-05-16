import styled from 'styled-components'
import { grey, white } from '../colors'

const DropDown = styled.div`
  text-align: left;
  background: ${grey};
  color: ${white};
  position: absolute;
  box-shadow: 0 2px 2px #ddd;
  right: 5px;
  width: 100px;
  padding: 15px;

  & > ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  & > ul > li {
    margin: 10px 0;
  }
`

export default DropDown
