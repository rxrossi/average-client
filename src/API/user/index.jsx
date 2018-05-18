import fetch from 'isomorphic-fetch'
import { getJson, getToken, catcher } from '../utilityFunctions'

const { API_ADDRESS } = require('../../config')

const headers = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json'
}

export async function savePhoto(file) {
  const body = new FormData()
  body.append('file', file)

  const response = await fetch(API_ADDRESS + '/files', {
    method: 'POST',
    body
  })
    .then(res => res.json())
    .catch(catcher)

  return response
}

export async function getMyProfile() {
  return fetch(API_ADDRESS + '/users/myprofile', {
    headers: {
      ...headers,
      authorization: getToken()
    }
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
