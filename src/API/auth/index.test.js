import * as API from './index'
import * as mockResponses from './mockResponses'

describe('API tests', () => {
  test('index route response is a 200', async () => {
    const response = await API.getIndexStatusResponse()
    expect(response).toBe(200)
  })

  describe('User tests', () => {
    const user = {
      email: `user-${Date.now()}@apitest.com`,
      password: `a${Date.now()}`
    }

    describe('Sign up', () => {
      it('receives a token on user creation', async () => {
        const response = await API.signUp({
          email: user.email,
          password: user.password,
          confirmPassword: user.password
        })
        expect(response).toHaveProperty('response.token')
        expect(mockResponses.signUp.success).toHaveProperty('response.token')
      })

      it('receives error on user creation with invalid data', async () => {
        const response = await API.signUp()
        const expected = {
          error: {
            fields: {
              email: '"Email" is required',
              password: '"Password" is required',
              confirmPassword: '"Confirm password" is required'
            }
          }
        }
        expect(response).toEqual(expected)
        expect(mockResponses.signUp.errorAllFieldsEmpty).toEqual(expected)
      })
    })

    describe('Sign in', () => {
      it('can login with the credentials', async () => {
        const response = await API.signIn({
          email: user.email,
          password: user.password
        })
        expect(response).toHaveProperty('response.token')
        expect(mockResponses.signIn.success).toHaveProperty('response.token')
      })

      it('receives an error with invalid credentials on login', async () => {
        const response = await API.signIn({
          email: `user-${Date.now()}@apitest.com`,
          password: 'invalid'
        })

        const expected = {
          error: {
            message: 'Invalid credentials'
          }
        }

        expect(response).toEqual(expected)
        expect(mockResponses.signIn.error).toEqual(expected)
      })
    })
  })
})
