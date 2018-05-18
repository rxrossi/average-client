import React from 'react'
import styled from 'styled-components'
import NavBar from '../../../NavBar'
import PublishMenu from './PublishMenu'
import { white } from '../../../colors'
import DraftJSC from '../../../SharedReactComponents/DrafJSC'

// TODO: take care of handleSave
// TODO: take care of reader prop

const Button = styled.button`
  border: 0;
  width: 130px;
  background-color: ${white};
  padding: 2px 10px;
  box-shadow: 0 0 2px #999;
  &:focus {
    outline: 0;
    box-shadow: 0 0 4px #777;
  }
`
const Wrapper = styled.div`
  display: inline-grid;
  text-align: right;
  grid-template-columns: min-content min-content;
`

const NavComplement = ({ toggleReading, reading }) => (
  <Wrapper>
    <div>{!reading && <PublishMenu />}</div>
    <Button onClick={toggleReading}>
      {reading ? 'Edit' : 'Switch to preview'}
    </Button>
  </Wrapper>
)

const Home = props => {
  const articleContent = props.article && props.article.content
  // console.log(props)
  if (articleContent) {
    return (
      <div>
        <NavBar>
          {props.canEdit && (
            <NavComplement
              toggleReading={props.toggleReading}
              reading={props.reading}
            />
          )}
        </NavBar>
        <DraftJSC
          reader={props.reading}
          article={articleContent}
          // TODO: remember that the handleSave bellow will receive only the content
          // does the content comes already stringified? as far as I can remember, yes
          handleSave={() => {}}
        />
      </div>
    )
  }

  // TODO: style the not found
  return (
    <div>
      <NavBar />
      <div>Article was not found</div>
    </div>
  )
}
export default Home
