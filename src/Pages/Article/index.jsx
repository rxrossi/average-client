import React from 'react'
import Presentational from './Presentational'
import Loading from './Presentational/loading'
import { getByLink, saveArticle } from '../../API/articles'
import { AuthContext } from '../../AuthComponent'

// TODO: Add flow
// TODO: make sure if is possible to get the article from the react-router-dom Link

class Article extends React.Component {
  state = {
    article: undefined,
    loading: true,
    canEdit: false,
    reading: true
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const canEdit = checkIfCanEdit(prevState.article, nextProps.userID)
    return { canEdit }
  }

  async componentDidMount() {
    const link = this.props.location.pathname.split('/').reverse()[0]
    const { response } = await getByLink(link)
    const canEdit = checkIfCanEdit(response.article, this.props.userID)
    this.setState({
      article: response && response.article,
      loading: false,
      canEdit,
      reading:
        response && response.article && !response.article.content ? false : true
    })
  }

  componentWillUnmount() {
    clearTimeout(inDebounce)
    saveArticle(this.state.article)
  }

  handleSave = async () => {
    const { response } = await saveArticle(this.state.article)
    if (response) {
      this.setState({ article: response.article })
    }
  }

  toggleReading = () => {
    const { reading } = this.state
    this.setState({ reading: !reading })
  }

  handleChange = (key, value) => {
    this.setState(
      state => ({
        article: {
          ...state.article,
          [key]: value
        }
      }),
      debounce(this.handleSave)
    )
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
        handleChange={this.handleChange}
        reading={reading}
        toggleReading={this.toggleReading}
      />
    )
  }
}

// export default Article
export default props => (
  <AuthContext.Consumer>
    {({ userID }) => <Article userID={userID} {...props} />}
  </AuthContext.Consumer>
)

function checkIfCanEdit(article, userID) {
  if (!article || !userID) {
    return false
  }
  return article.author.id === userID
}

let inDebounce
const debounce = (func, delay = 500) =>
  function() {
    const context = this
    const args = arguments
    clearTimeout(inDebounce)
    inDebounce = setTimeout(() => func.apply(context, args), delay)
  }
