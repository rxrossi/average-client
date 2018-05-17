// @flow
import React from 'react'
import Presentational from './Presentational'
import { getUserArticles } from '../../API/articles'
import * as types from '../../flowTypes'

type Props = {}

type State = {
  articles: Array<types.article>
}

class Home extends React.Component<Props, State> {
  state = {
    articles: []
  }

  async componentDidMount() {
    const { response } = await getUserArticles()
    console.log('myarticles', response)
    if (response) {
      this.setState({
        articles: response.articles
      })
    }
  }

  render() {
    return <Presentational articles={this.state.articles} />
  }
}

export default Home
