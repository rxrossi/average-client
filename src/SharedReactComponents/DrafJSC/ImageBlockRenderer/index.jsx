import React from 'react'
import {
  Editor,
  EditorState,
  RichUtils,
  DefaultDraftBlockRenderMap,
  convertToRaw,
  convertFromRaw,
} from 'draft-js'
import Immutable from 'immutable'

class Image extends React.Component {
  constructor(props) {
    super(props)
    const parsedState = props.description && JSON.parse(props.description)
    this.state = {
      editorState: parsedState
        ? EditorState.createWithContent(convertFromRaw(parsedState))
        : EditorState.createEmpty(),
    }
    this.onChange = this.onChange.bind(this)
    this.save = this.save.bind(this)
    this.handleKeyCommand = this._handleKeyCommand.bind(this)
    this.focus = this.focus.bind(this)
  }

  onChange(editorState) {
    this.setState({ editorState }, this.save)
  }

  save() {
    const { editorState } = this.state

    const rawState = convertToRaw(editorState.getCurrentContent())
    const stringfiedContent = JSON.stringify(rawState)

    const data = {
      description: stringfiedContent,
      src: this.props.src,
    }

    this.props.onChange({ entityPos: this.props.entityPos, data })
  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      this.onChange(newState)
      return true
    }
    return false
  }

  focus() {
    this.refs.imgDescEditor.focus()
  }

  render() {
    const {
      src, handleReturn, setImageAsCover, coverUrl,
    } = this.props
    const { editorState } = this.state
    const isThisImageTheCover = src === coverUrl

    return (
      <div style={{ textAlign: 'center', fontSize: '0.9em' }}>
        {/*eslint-disable*/}
        <img src={src} style={{
          height: "auto",
          ...this.props.imageSizes.regular
        }}/>
        {/* eslint-enable */}
        <div>
          <Editor
            editorState={editorState}
            onChange={this.onChange}
            handleReturn={handleReturn}
            blockRenderMap={extendedBlockRenderMap}
            handleKeyCommand={this.handleKeyCommand}
            onClick={this.focus}
            ref="imgDescEditor"
            readOnly={this.props.readOnly}
          />
        </div>
        {!this.props.readOnly &&
          !isThisImageTheCover && (
            <button onClick={() => setImageAsCover(src)}>
              Set this image as cover
            </button>
          )}
      </div>
    )
  }
}

export default Image

const CustomItem = ({ children }) => <div style={{ position: 'relative' }}>{children}</div>

const CustomSection = ({ children }) => (
  <section>
    {children.map(x => <CustomItem key={x.key}>{x}</CustomItem>)}
  </section>
)

const blockRenderMap = Immutable.Map({
  unstyled: {
    element: 'section',
    wrapper: <CustomSection />,
  },
})

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap)
