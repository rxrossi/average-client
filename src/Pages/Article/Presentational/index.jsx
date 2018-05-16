import React from 'react'
import NavBar from '../../../NavBar'
import DraftJSC from '../../../SharedReactComponents/DrafJSC'

// TODO: take care of handleSave
// TODO: take care of reader
// TODO: take care of a loading state

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

  return <div>Article was not found</div>
}
export default Home
