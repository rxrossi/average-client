import React from 'react'
import NavBar from '../../../NavBar'
import DraftJSC from '../../../SharedReactComponents/DrafJSC'

// TODO: take care of handleSave
// TODO: take care of reader prop

const NavComplement = ({ toggleReading, reading }) => (
  <button onClick={toggleReading}>
    {reading ? 'Edit' : 'Switch to preview'}
  </button>
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
