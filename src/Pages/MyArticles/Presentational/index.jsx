// @flow
import React from 'react'
import NavBar from '../../../NavBar'
import List from '../../../SharedReactComponents/ListOfArticleCard'
import * as types from '../../../flowTypes'

type Props = {
  articles: Array<types.article>,
  handleDelete: ?Function,
  handleCreate: ?Function
}

const MyArticlesPresentational = (props: Props) => (
  <div>
    <NavBar />
    <h1>My articles</h1>
    <button onClick={props.handleCreate}>Create a new article</button>
    <List articles={props.articles} handleDelete={props.handleDelete} />
  </div>
)

export default MyArticlesPresentational
