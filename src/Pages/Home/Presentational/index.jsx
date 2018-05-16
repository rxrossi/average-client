// @flow
import React from 'react'
import NavBar from '../../../NavBar'
import List from '../../../SharedReactComponents/ListOfArticleCard'

type Props = {
  articles: Array<{}>
}

const Home = (props: Props) => (
  <div>
    <NavBar />
    <List articles={props.articles} />
  </div>
)

export default Home
