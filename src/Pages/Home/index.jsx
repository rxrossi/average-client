// @flow
import React from 'react'
import Presentational from './Presentational'
import { getAll } from '../../API/articles'

type Props = {}

type State = {
  articles: Array<{}>
}

class Home extends React.Component<Props, State> {
  state = {
    articles: []
  }

  async componentDidMount() {
    const { response } = await getAll()
    if (response) {
      this.setState(
        {
          articles: response.articles
        },
        () => console.log(this.state.articles)
      )
    }
  }

  render() {
    return <Presentational articles={this.state.articles} />
  }
}

export default Home
