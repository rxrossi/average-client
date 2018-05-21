// @flow
import React from 'react'
import styled from 'styled-components'
import { white, softBlue } from '../../../colors'
import Wrapper from '../../../UtilityComponents/HandleClickOutside'
import DropDownBase from '../../../StyledComponents/DropDownOfMenu'
import BaseLink from '../../../StyledComponents/BaseLink'
import { AuthContext } from '../../../AuthComponent'
import { getMyProfile } from '../../../API/user'

type Props = {
  removeUserIDAndToken: Function,
  userImage: ?string
}

type State = {
  open: boolean
}

export class UserMenu extends React.Component<Props, State> {
  state = {
    open: false
  }

  close = () => {
    this.setState({ open: false })
  }

  toggleOpen = () => {
    const { open } = this.state
    this.setState({ open: !open })
  }

  render() {
    return (
      <Wrapper handleClickOutside={this.close} handleClickInside={() => {}}>
        <MainBtn onClick={this.toggleOpen}>
          {this.props.userImage && (
            <Img src={this.props.userImage} alt="current user" />
          )}
        </MainBtn>
        {this.state.open && (
          <DropDown>
            <ul>
              <li>
                <Link to="/profile">Edit Profile</Link>
              </li>
              <li>
                <Link to="/myarticles">My articles</Link>
              </li>
              <li>
                <button onClick={this.props.removeUserIDAndToken}>
                  Sign out
                </button>
              </li>
            </ul>
          </DropDown>
        )}
      </Wrapper>
    )
  }
}

// make this fetch the image

class UserMenuContainer extends React.Component<
  { removeUserIDAndToken: Function },
  { img?: string }
> {
  state = {
    img: undefined
  }
  async componentDidMount() {
    const { response } = await getMyProfile()
    if (response && response.user && response.user.photo) {
      this.setState({ img: response.user.photo })
    }
  }
  render() {
    return (
      <UserMenu
        userImage={this.state.img}
        removeUserIDAndToken={this.props.removeUserIDAndToken}
      />
    )
  }
}

export default () => (
  <AuthContext.Consumer>
    {({ removeUserIDAndToken }) => (
      <UserMenuContainer removeUserIDAndToken={removeUserIDAndToken} />
    )}
  </AuthContext.Consumer>
)

const Img = styled.img`
  height: 32px;
  width: 32px;
  margin: 0;
  padding: 0;
  display: inline-block;
`
const DropDown = styled(DropDownBase)`
  width: 120px;
  & > ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  & > ul > li {
    margin: 10px 0;
  }
`

const MainBtn = styled.button`
  text-align: center;
  border-radius: 50%;
  border: 0;
  margin: 0 15px;
  width: 32px;
  height: 32px;
  overflow: hidden;
  padding: 0;
  box-shadow: 1px 1px 1px #999;
  &:focus {
    outline: 0;
    box-shadow: 1px 1px 4px #333;
  }
`

const Link = styled(BaseLink)`
  color: ${white};
  &:hover {
    color: ${softBlue};
  }
`
