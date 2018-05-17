import fetch from 'isomorphic-fetch'
import { getJson, catcher, getToken } from '../utilityFunctions'

const { API_ADDRESS } = require('../../config')

const headers = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json'
}

export async function getAll() {
  return fetch(API_ADDRESS + '/articles').then(getJson)
}

export async function getByLink(link) {
  return fetch(API_ADDRESS + `/articles/${link}`)
    .then(getJson)
    .catch(catcher)
}

export async function getUserArticles() {
  return fetch(API_ADDRESS + '/articles/my-articles', {
    headers: {
      ...headers,
      authorization: getToken()
    }
  })
    .then(getJson)
    .catch(catcher)
}
