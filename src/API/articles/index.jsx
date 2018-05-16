import fetch from 'isomorphic-fetch'
import { getJson } from '../utilityFunctions'

const { API_ADDRESS } = require('../../config')

export async function getAll() {
  return fetch(API_ADDRESS + '/articles').then(getJson)
}
