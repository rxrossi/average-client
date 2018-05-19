import React from 'react'
import styled from 'styled-components'
import NavBar from '../../../NavBar'
import PublishMenu from './PublishMenu'
import { white } from '../../../colors'
import DraftJSC from '../../../SharedReactComponents/DrafJSC'

// TODO: take care of handleSave

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

const NavComplement = ({ toggleReading, reading, article, handleChange }) => (
  <Wrapper>
    <div>
      {!reading && (
        <PublishMenu article={article} handleChange={handleChange} />
      )}
    </div>
    <Button onClick={toggleReading}>
      {reading ? 'Edit' : 'Switch to preview'}
    </Button>
  </Wrapper>
)

const Presentational = props => {
  if (props.article) {
    var { content, ...rest } = props.article
    return (
      <div>
        <NavBar>
          {props.canEdit && (
            <NavComplement
              toggleReading={props.toggleReading}
              reading={content ? props.reading : false}
              article={rest}
              handleChange={props.handleChange}
            />
          )}
        </NavBar>
        <DraftJSC
          reader={content ? props.reading : false}
          article={content}
          handleSave={content => props.handleChange('content', content)}
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
export default Presentational
