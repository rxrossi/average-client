export const signIn = {
  success: {
    response: {
      token: 'aToken'
    }
  },
  error: {
    error: {
      message: 'Invalid credentials'
    }
  }
}

export const signUp = {
  success: {
    response: {
      token: 'aToken'
    }
  },
  errorAllFieldsEmpty: {
    error: {
      fields: {
        email: '"Email" is required',
        password: '"Password" is required',
        confirmPassword: '"Confirm password" is required'
      }
    }
  }
}
