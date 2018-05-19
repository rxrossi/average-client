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

export async function saveArticle(article) {
  if (!article) {
    return
  }
  const body = JSON.stringify({
    ...article,
    mainImg:
      article.mainImg ||
      'https://images.pexels.com/photos/36764/marguerite-daisy-beautiful-beauty.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  })

  let response

  if (article.content) {
    response = await fetch(API_ADDRESS + `/articles/${article.link}`, {
      method: 'PUT',
      body,
      headers: {
        ...headers,
        authorization: getToken()
      }
    })
      .then(res => res.json())
      .catch(catcher)
  } else {
    response = await fetch(API_ADDRESS + '/articles', {
      method: 'POST',
      body,
      headers: {
        ...headers,
        authorization: getToken()
      }
    })
      .then(res => res.json())
      .catch(catcher)
  }

  return response
}
