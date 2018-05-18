import React from 'react'
import Presentational from './Presentational'
import Loading from './Presentational/loading'
import { getByLink } from '../../API/articles'

// TODO: Add flow
// TODO: make sure if is possible to get the article from the react-router-dom Link

class Article extends React.Component {
  state = {
    article: undefined,
    loading: true,
    canEdit: false,
    reading: true
  }

  async componentDidMount() {
    const link = this.props.location.pathname.split('/').reverse()[0]
    const { response } = await getByLink(link)
    this.setState({
      article: response && response.article,
      loading: false,
      canEdit: true, // article.id === this.props.user.id
      reading: false
    })
  }

  toggleReading = () => {
    const { reading } = this.state
    this.setState({ reading: !reading })
  }

  render() {
    if (this.state.loading) {
      return <Loading />
    }

    const { canEdit, reading } = this.state

    return (
      <Presentational
        article={this.state.article}
        canEdit={canEdit}
        reading={reading}
        toggleReading={this.toggleReading}
      />
    )
  }
}

export default Article
