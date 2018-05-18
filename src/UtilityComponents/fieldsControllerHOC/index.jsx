import React from 'react'
// TODO: add flow
// TODO: write tests and refactor

// receives a presentational and intject the props:
// fields, handleChange, handleSubmit

// expect each input to have:
// - onChange={handleChange}
// - name
// - value={fields[name]}
// - errors={
//     fields: {}
// }

// expect a submit button with onClick={handleSubmit}

// returns a Component that requires onSubmit function and can accept erros object
// ex: <result onSubmit={} errors={} fields={fields}/>

export default function FieldsControllerHOC(Component) {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)

      this.state = {
        fields: this.props.fields || {},
        errors: this.props.errors || { fields: {} }
      }
    }

    static getDerivedStateFromProps(nextProps, state) {
      return {
        fields: nextProps.fields || {},
        errors: nextProps.errors || { fields: {} }
      }
    }

    async handleChange(e) {
      const { name, value, files } = e.target
      let imgUrl

      if (files) {
        const file = files[0]
        imgUrl = await new Promise((res, rej) => {
          const reader = new FileReader()
          reader.onloadend = () => {
            res(reader.result)
          }
          reader.readAsDataURL(file)
        })
      }

      this.setState(prevState => {
        return {
          ...prevState,
          fields: {
            ...prevState.fields,
            [name]: imgUrl
              ? {
                  forPreview: imgUrl,
                  file: files[0]
                }
              : value
          },
          errors: {
            ...prevState.errors,
            fields: {
              ...prevState.errors.fields,
              [name]: ''
            }
          }
        }
      })
    }

    handleSubmit(e) {
      e.preventDefault()
      const { onSubmit } = this.props
      onSubmit(this.state.fields)
    }

    render() {
      const { fields, errors } = this.state
      return (
        <Component
          errors={errors}
          fields={fields}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      )
    }
  }
}
