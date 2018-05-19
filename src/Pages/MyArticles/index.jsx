// @flow
import React from 'react'
import Presentational from './Presentational'
import { Redirect } from 'react-router-dom'
import { saveArticle } from '../../API/articles'
import { getUserArticles, deleteArticleByLink } from '../../API/articles'
import * as types from '../../flowTypes'
const uuid4 = require('uuid/v4')

type Props = {}

type State = {
  articles: Array<types.article>,
  redirectTo: ?string
}

class Home extends React.Component<Props, State> {
  state = {
    articles: [],
    redirectTo: undefined
  }

  async componentDidMount() {
    const { response } = await getUserArticles()
    if (response) {
      this.setState({
        articles: response.articles
      })
    }
  }

  handleDelete = async (link: string) => {
    await deleteArticleByLink(link)
    const { response } = await getUserArticles()
    if (response) {
      this.setState({
        articles: response.articles
      })
    }
  }

  handleCreate = async () => {
    const newArticleLink = uuid4()

    const article = {
      link: newArticleLink
    }

    await saveArticle(article)

    const newUrl = `/article/${newArticleLink}`

    this.setState({ redirectTo: newUrl })
  }

  render() {
    const { redirectTo } = this.state

    if (redirectTo) {
      return <Redirect to={redirectTo} />
    }

    return (
      <Presentational
        articles={this.state.articles}
        handleDelete={this.handleDelete}
        handleCreate={this.handleCreate}
      />
    )
  }
}

export default Home
