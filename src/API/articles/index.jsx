import fetch from 'isomorphic-fetch'
import { getJson } from '../utilityFunctions'

const { API_ADDRESS } = require('../../config')

export async function getAll() {
  return fetch(API_ADDRESS + '/articles').then(getJson)
}

export async function getByLink(link) {
  return fetch(API_ADDRESS + `/articles/${link}`)
    .then(getJson)
    .catch(catcher)
}

function catcher(e) {
  return {
    error: {
      message: `An error ocurried (${e})`
    }
  }
}
