import React from 'react'
import Presentational from './Presentational'
import { getByLink } from '../../API/articles'

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

  // TODO: implement a loading!?
  render() {
    if (this.state.loading) {
      return <div>loading</div>
    }
    return <Presentational article={this.state.article} />
  }
}

export default Article
