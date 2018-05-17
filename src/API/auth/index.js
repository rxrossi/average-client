import fetch from 'isomorphic-fetch'
import { getJson, catcher } from '../utilityFunctions'

function getToken() {
  return ' '
}

const { API_ADDRESS } = require('../../config')

const headers = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json'
}

export function signIn({ email, password }) {
  return fetch(API_ADDRESS + '/users/signin', {
    headers,
    method: 'POST',
    body: JSON.stringify({
      email,
      password
    })
  })
    .then(getJson)
    .catch(catcher)
}

export function signUp({ email, password, confirmPassword } = {}) {
  return fetch(API_ADDRESS + '/users/signup', {
    headers,
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      confirmPassword
    })
  })
    .then(getJson)
    .catch(catcher)
}

export async function patchUser({ name, photoPathOnServer }) {
  const photoLocation = {
    server: 'this',
    path: photoPathOnServer
  }

  return fetch(API_ADDRESS + '/users', {
    headers: {
      ...headers,
      authorization: getToken()
    },
    method: 'PATCH',
    body: JSON.stringify({
      name,
      photoLocation: photoPathOnServer && photoLocation
    })
  })
    .then(getJson)
    .catch(catcher)
}
