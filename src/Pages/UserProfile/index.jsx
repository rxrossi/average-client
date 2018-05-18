import React from 'react'
import NavBar from '../../NavBar'
import Presentational from './Presentational'
import fieldsControllerHOC from '../../UtilityComponents/fieldsControllerHOC'
import { savePhoto, getMyProfile, patchUser } from '../../API/user'

const ControlledPresentational = fieldsControllerHOC(Presentational)

// TODO: add flow
class Edit extends React.Component {
  constructor(props) {
    super(props)
    // TODO: convert binding
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      errors: {},
      fields: {
        name: props.user && props.user.name,
        photo: {
          forPreview: props.user && props.user.photo
        }
      }
    }
  }

  async componentDidMount() {
    const { response: { user } } = await getMyProfile()
    if (user) {
      fillFieldsWithUser.call(this, user)
    }
  }

  async onSubmit(fields) {
    let photoPathOnServer
    if (fields.photo.file) {
      // if only files.photo.forPreview exists, means that there is no need to upload
      const photoSaveRes = await savePhoto(fields.photo.file)
      photoPathOnServer = photoSaveRes.response.storedAt
      console.log('fields photo file')
    }

    const { response: { user } } = await patchUser({
      name: fields.name,
      photoPathOnServer
    })

    // console.log('response', user)
    if (user) {
      fillFieldsWithUser.call(this, user)
    }
    // TODO: pass saved user to AuthContext
  }

  render() {
    const { fields, errors } = this.state
    return (
      <ControlledPresentational
        onSubmit={this.onSubmit}
        errors={errors}
        fields={fields}
      />
    )
  }
}

function fillFieldsWithUser(user) {
  this.setState(state => ({
    ...state,
    fields: {
      ...state.fields,
      name: user.name,
      photo: {
        forPreview: user.photo
      }
    }
  }))
}

export default () => (
  <div>
    <NavBar />
    <Edit />
  </div>
)
