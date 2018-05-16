// @flow

import * as React from 'react'

function removeEventListeners(fn: Function) {
  window.removeEventListener('mousedown', fn)
  window.removeEventListener('touchstart', fn)
}

type Props = {
  handleClickOutside: Function,
  handleClickInside: ?Function
}

export default class HandleClickOutsideComponent extends React.Component<
  Props
> {
  focused: ?boolean
  wrapperRef: ?HTMLDivElement

  componentWillUnmount() {
    removeEventListeners(this.handleClickOut)
  }

  handleClickOut = (event: any) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.focused = false
      removeEventListeners(this.handleClickOut)
      this.props.handleClickOutside()
    }
  }

  handleClickIn = () => {
    if (!this.focused) {
      const { handleClickInside } = this.props
      this.focused = true
      window.addEventListener('mousedown', this.handleClickOut)
      window.addEventListener('touchstart', this.handleClickOut)
      if (handleClickInside) {
        handleClickInside()
      }
    }
  }

  render() {
    return (
      <div
        ref={element => (this.wrapperRef = element)}
        onMouseDown={this.handleClickIn}
        onTouchStart={this.handleClickIn}
      >
        {this.props.children}
      </div>
    )
  }
}
