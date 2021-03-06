// @flow
import React from 'react'
import NavBar from '../../../NavBar'
import List from '../../../SharedReactComponents/ListOfArticleCard'
import * as types from '../../../flowTypes'

type Props = {
  articles: Array<types.article>
}

const Home = (props: Props) => (
  <div>
    <NavBar />
    <List articles={props.articles} />
  </div>
)

export default Home
