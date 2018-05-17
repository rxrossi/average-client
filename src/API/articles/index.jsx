import fetch from 'isomorphic-fetch'
import { getJson, catcher } from '../utilityFunctions'

const { API_ADDRESS } = require('../../config')

export async function getAll() {
  return fetch(API_ADDRESS + '/articles').then(getJson)
}

export async function getByLink(link) {
  return fetch(API_ADDRESS + `/articles/${link}`)
    .then(getJson)
    .catch(catcher)
}
