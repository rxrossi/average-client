// @flow
import React from 'react'
import NavBar from '../../../NavBar'
import List from '../../../SharedReactComponents/ListOfArticleCard'
import * as types from '../../../flowTypes'
import { saveArticle } from '../../../API/articles'
const uuid4 = require('uuid/v4')

type Props = {
  articles: Array<types.article>
}

const Home = (props: Props) => (
  <div>
    <NavBar />
    <h1>My articles</h1>
    <button onClick={newArticle}>New article</button>
    <List articles={props.articles} />
  </div>
)

export default Home

async function newArticle() {
  const baseUrl = window.location.origin
  const newArticleLink = uuid4()

  const article = {
    link: newArticleLink
  }
  await saveArticle(article)

  const newUrl = `${baseUrl}/article/${newArticleLink}`

  // TODO: use react-router-dom redirect
  window.location = newUrl
}
