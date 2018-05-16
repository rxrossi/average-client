import React from 'react'
import './css.css'
import * as Immutable from 'immutable'
import {
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  convertToRaw,
  convertFromRaw,
  DefaultDraftBlockRenderMap,
  AtomicBlockUtils,
  Editor
} from 'draft-js'
import BlockStyleControls from './BlockStyleControls'
import InlineStyleControls from './InlineStyleControls'
import InsertMedia from './InsertMedia'
import ImageBlockRenderer from './ImageBlockRenderer'
import HandleClickOutside from '../../UtilityComponents/HandleClickOutside'
import styled from 'styled-components'

const Button = styled.button``

const CTX1 = React.createContext()
const UpdateMediaCTX = React.createContext()

const maxWidthOfText = '600px'

const possibleImgSizes = {
  regular: {
    maxWidth: maxWidthOfText,
    width: '100%'
  },
  bigger: {
    maxWidth: '100%',
    width: '700px'
  },
  fullSize: {
    width: '100%'
  }
}

export default class RichEditorExample extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showDetailseditor: false,
      readOnly: false
    }

    this.focus = this.focus.bind(this)
    this.onChange = editorState =>
      this.setState({ editorState }, debounce(this.save))
    this.handleKeyCommand = this._handleKeyCommand.bind(this)
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this)
    this.toggleBlockType = this._toggleBlockType.bind(this)
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this)
    this.handleDetailsChange = this.handleDetailsChange.bind(this)
    this.save = this.save.bind(this)
    this.toggleDetailsEditor = this.toggleDetailsEditor.bind(this)
    this.toggleReadOnlyState = this.toggleReadOnlyState.bind(this)
    this.addMedia = this.addMedia.bind(this)
    this.updateMedia = this.updateMedia.bind(this)
  }

  componentWillUnmount() {
    this.save()
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.reader && prevState.editorState) {
      // passing new editorState while editing was causing 'selection' errors
      return null
    }
    const parsedState = nextProps.article && JSON.parse(nextProps.article)

    const state = {
      editorState: parsedState
        ? EditorState.createWithContent(convertFromRaw(parsedState))
        : EditorState.createEmpty()
    }

    return state
  }

  addMedia({ type, uploading, url, description }) {
    const { editorState } = this.state
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      type,
      'IMMUTABLE',
      { src: url, uploading }
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    })

    this.setState(
      {
        readOnly: false,
        editorState: AtomicBlockUtils.insertAtomicBlock(
          newEditorState,
          entityKey,
          ' '
        ),
        showURLInput: false,
        urlValue: ''
      },
      () => {
        this.setState({ readOnly: true })
      }
    )
  }

  async updateMedia({ data, entityPos }) {
    const { editorState } = this.state
    const contentState = editorState.getCurrentContent()

    contentState.mergeEntityData(entityPos, data)

    debounce(this.save)()
  }

  toggleReadOnlyState(bool, e) {
    if (!bool) {
      this.focus()
    }
    const nextState = typeof bool === 'undefined' ? !this.state.readOnly : bool
    return this.setState({ readOnly: nextState })
  }

  focus() {
    this.refs.editor.focus()
  }

  toggleDetailsEditor(e) {
    e.preventDefault()
    const { showDetailseditor } = this.state
    this.setState({ showDetailseditor: !showDetailseditor })
  }

  handleDetailsChange(event) {
    const target = event.target

    const name = target.name

    let value = target.type === 'checkbox' ? target.checked : target.value
    value = name === 'tags' ? new Array(...target.value.split(',')) : value

    this.setState(
      {
        [name]: value
      },
      debounce(this.save)
    )
  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      this.onChange(newState)
      return true
    }
    return false
  }

  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4 /* maxDepth */
      )
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState)
      }
      return
    }
    return getDefaultKeyBinding(e)
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType))
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    )
  }

  save() {
    const { editorState } = this.state

    const rawState = convertToRaw(editorState.getCurrentContent())
    const stringfiedContent = JSON.stringify(rawState)

    this.props.handleSave(stringfiedContent)
  }

  renderEditor(editorState, currentFocusKey, coverUrl) {
    return (
      <CTX1.Provider
        value={{
          currentFocusKey,
          readOnlyState: this.state.readOnly,
          toggleReadOnlyState: this.toggleReadOnlyState,
          addMedia: this.addMedia
        }}
      >
        <UpdateMediaCTX.Provider
          value={{
            readOnly: this.props.reader,
            updateMedia: this.updateMedia,
            coverUrl
          }}
        >
          <div
            style={{
              overflow: 'hidden',
              maxWidth: maxWidthOfText,
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
          >
            <Editor
              blockRendererFn={mediaBlockRenderer}
              readOnly={this.props.reader || this.state.readOnly}
              blockStyleFn={getBlockStyle}
              blockRenderMap={extendedBlockRenderMap}
              customStyleMap={styleMap}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              keyBindingFn={this.mapKeyToEditorCommand}
              onChange={this.onChange}
              ref="editor"
              spellCheck
            />
          </div>
        </UpdateMediaCTX.Provider>
      </CTX1.Provider>
    )
  }

  render() {
    const { editorState, mainImg } = this.state
    const selection = editorState.getSelection()
    const currentSelectedChildren = selection.focusKey

    if (this.props.reader) {
      return <div>{this.renderEditor(editorState)}</div>
    }

    return (
      <div>
        <div className="">
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          <div onClick={this.focus}>
            {this.renderEditor(editorState, currentSelectedChildren, mainImg)}
          </div>
        </div>
        <Button style={{ marginTop: '2em' }} onClick={this.save.bind(this)}>
          Save
        </Button>
      </div>
    )
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
}

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote'
    default:
      return null
  }
}

let inDebounce
const debounce = (func, delay = 500) =>
  function() {
    const context = this
    const args = arguments
    clearTimeout(inDebounce)
    inDebounce = setTimeout(() => func.apply(context, args), delay)
  }

const CustomItem = ({
  children,
  currentFocusKey,
  toggleReadOnly,
  addMedia
}) => {
  const propsThatMatter = children.props.children.props
  const amIselected = currentFocusKey === propsThatMatter.block.key
  const shouldIShowInsertBtn = amIselected && propsThatMatter.block.text === ''

  return (
    <div style={{ position: 'relative' }}>
      {children}
      {shouldIShowInsertBtn && (
        <InsertMedia toggleReadOnly={toggleReadOnly} addMedia={addMedia} />
      )}
    </div>
  )
}

const CustomSection = ({ children }) => (
  <CTX1.Consumer>
    {ctx => (
      <section>
        {children.map(x => (
          <CustomItem
            key={x.key}
            currentFocusKey={ctx.currentFocusKey}
            toggleReadOnly={ctx.toggleReadOnlyState}
            addMedia={ctx.addMedia}
          >
            {x}
          </CustomItem>
        ))}
      </section>
    )}
  </CTX1.Consumer>
)

const blockRenderMap = Immutable.Map({
  unstyled: {
    element: 'section',
    wrapper: <CustomSection />
  }
})

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap)

function mediaBlockRenderer(block) {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false
    }
  }
  return null
}

const Audio = props => <audio controls src={props.src} style={styles.media} />

const Video = props => <video controls src={props.src} style={styles.media} />

const Wrapper = props => <div>{props.children}</div>

const WrapperWithHandleOutsideClick = ({ children, ...rest }) => (
  <HandleClickOutside {...rest}>
    <Wrapper>{children}</Wrapper>
  </HandleClickOutside>
)

const Image = props => (
  <WrapperWithHandleOutsideClick
    handleClickOutside={() => props.ctx.toggleReadOnlyState(false)}
    handleClickInside={() => props.ctx.toggleReadOnlyState(true)}
  >
    <ImageBlockRenderer
      coverUrl={props.coverUrl}
      handleReturn={() => 'handled'}
      src={props.src}
      readOnly={props.ctx2.readOnly}
      description={props.description}
      onChange={props.ctx2.updateMedia}
      entity={props.entity}
      rprops={props.rprops}
      entityPos={props.entityPos}
      imageSizes={possibleImgSizes}
    />
  </WrapperWithHandleOutsideClick>
)

const Media = props => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0))
  const { src, description } = entity.getData()

  const type = entity.getType()
  let media
  if (type === 'audio') {
    media = <Audio src={src} />
  } else if (type === 'image') {
    media = (
      <CTX1.Consumer>
        {ctx => (
          <UpdateMediaCTX.Consumer>
            {ctx2 => (
              <Image
                src={src}
                description={description}
                entityPos={props.block.getEntityAt(0)}
                entity={entity}
                ctx={ctx}
                ctx2={ctx2}
              />
            )}
          </UpdateMediaCTX.Consumer>
        )}
      </CTX1.Consumer>
    )
  } else if (type === 'video') {
    media = <Video src={src} />
  }
  return media
}

const styles = {
  root: {
    fontFamily: "'Georgia', serif",
    padding: 20,
    width: 600
  },
  buttons: {
    marginBottom: 10
  },
  urlInputContainer: {
    marginBottom: 10
  },
  urlInput: {
    fontFamily: "'Georgia', serif",
    marginRight: 10,
    padding: 3
  },
  editor: {
    border: '1px solid #ccc',
    cursor: 'text',
    minHeight: 80,
    padding: 10
  },
  button: {
    marginTop: 10,
    textAlign: 'center'
  },
  media: {
    width: '100%',
    // Fix an issue with Firefox rendering video controls
    // with 'pre-wrap' white-space
    whiteSpace: 'initial'
  }
}
