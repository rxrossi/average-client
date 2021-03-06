import React from 'react'
import { Redirect } from 'react-router-dom'
import Form from './Presentational/Form'
import NavBar from '../../NavBar'
import { AuthContext } from '../../AuthComponent'
import fieldControllerHoc from '../../UtilityComponents/fieldsControllerHOC'
import { signUp } from '../../API/auth'

// TODO: add flow
const ControlledForm = fieldControllerHoc(Form)

class SignUp extends React.Component {
  state = {
    errors: {}
  }

  handleSubmit = async fields => {
    const { error, response } = await signUp(fields)
    this.setState(
      {
        errors: error || {},
        fields,
        redirectToReferrer: response && response.token
      },
      () => {
        if (response && response.token) {
          this.props.storeUserIDAndToken({
            userID: response.user.id,
            token: response.token
          })
        }
      }
    )
  }

  render() {
    const { from } = (this.props.location && this.props.location.state) || {
      from: { pathname: '/' }
    }
    const { redirectToReferrer, errors, fields } = this.state

    if (redirectToReferrer) {
      return <Redirect to={from} />
    }

    return (
      <div>
        <NavBar />
        <ControlledForm
          fields={fields}
          onSubmit={this.handleSubmit}
          errors={errors}
        />
      </div>
    )
  }
}

export default () => (
  <AuthContext.Consumer>
    {({ storeUserIDAndToken }) => (
      <SignUp storeUserIDAndToken={storeUserIDAndToken} />
    )}
  </AuthContext.Consumer>
)
