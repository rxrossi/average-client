import React from 'react'
import Presentational from './Presentational'
import Loading from './Presentational/loading'
import { getByLink } from '../../API/articles'

// TODO: Add flow
// TODO: make sure if is possible to get the article from the react-router-dom Link

class Article extends React.Component {
  state = {
    article: undefined,
    loading: true
  }

  async componentDidMount() {
    const link = this.props.location.pathname.split('/').reverse()[0]
    const { response } = await getByLink(link)
    this.setState({
      article: response && response.article,
      loading: false
    })
  }

  render() {
    if (this.state.loading) {
      return <Loading />
    }
    return <Presentational article={this.state.article} />
  }
}

export default Article
