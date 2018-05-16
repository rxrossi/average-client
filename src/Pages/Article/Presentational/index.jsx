import React from 'react'
import NavBar from '../../../NavBar'
import DraftJSC from '../../../SharedReactComponents/DrafJSC'

// TODO: take care of handleSave
// TODO: take care of reader prop

const Home = props => {
  const articleContent = props.article && props.article.content
  if (articleContent) {
    return (
      <div>
        <NavBar />
        <DraftJSC reader article={articleContent} handleSave={() => {}} />
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
