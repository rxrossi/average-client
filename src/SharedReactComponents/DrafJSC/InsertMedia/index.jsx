import React from 'react'

class InsertMedia extends React.Component {
  constructor(props) {
    super(props)
    this.handleMainClick = this.handleMainClick.bind(this)
    this.handleImageFromWebClick = this.handleImageFromWebClick.bind(this)
    this.onImageFromWebSelect = this.onImageFromWebSelect.bind(this)
    this.releaseCMD = this.releaseCMD.bind(this)
    this.setWrapperRef = this.setWrapperRef.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
    this.handleFieldChange = this.handleFieldChange.bind(this)
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  state = {
    showOptions: false,
    showImageFromPcInput: false
  }

  style = {
    wrapper: {
      position: 'absolute',
      top: '-0.3em',
      left: '-2em'
    },
    optionsWrapper: {
      position: 'relative',
      left: '2em',
      top: '-1.85em'
    },
    formWrapper: {
      position: 'relative',
      backgroundColor: 'white',
      left: '2em',
      // border: "1px solid black",
      top: '-2.5em',
      paddingLeft: '0.5em'
    },
    button: {
      backgroundColor: 'white',
      borderRadius: '1em'
    }
  }

  setWrapperRef(node) {
    this.wrapperRef = node
  }

  handleFieldChange(e) {
    const { target: { value, name } } = e
    this.setState({ [name]: value })
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState(
        {
          showOptions: false,
          showImageFromPcInput: false
        },
        this.releaseCMD
      )
    }
  }

  releaseCMD() {
    this.props.toggleReadOnly(false)
  }

  async handleMainClick() {
    await this.props.toggleReadOnly(true)
    const { showOptions } = this.state
    this.setState({
      showOptions: !showOptions
    })
  }

  handleImageFromWebClick() {
    this.setState({
      showOptions: false,
      showImageFromPcInput: true
    })
  }

  onImageFromWebSelect(e) {
    e.preventDefault()
    this.setState(
      {
        showImageFromPcInput: false
      },
      this.releaseCMD
    )
    const { URLInput } = this.state
    this.props.addMedia({ url: URLInput, uploading: false, type: 'image' })
  }

  render() {
    const { showOptions, showImageFromPcInput } = this.state

    return (
      <div style={this.style.wrapper} ref={this.setWrapperRef}>
        <button
          style={this.style.button}
          contentEditable={false}
          onClick={this.handleMainClick}
        >
          +
        </button>
        {showOptions && (
          <div style={this.style.optionsWrapper}>
            <button
              style={this.style.button}
              onClick={this.handleImageFromWebClick}
            >
              Image from the web
            </button>
            <button style={this.style.button}>Image from the PC</button>
          </div>
        )}
        {showImageFromPcInput && (
          <form
            onSubmit={this.onImageFromWebSelect}
            style={this.style.formWrapper}
          >
            <input
              type="text"
              name="URLInput"
              onChange={this.handleFieldChange}
            />
          </form>
        )}
      </div>
    )
  }
}

export default InsertMedia
