const BASE_URL = 'http://localhost:3001/api/'
import Auth from '../auth/auth'

function callApi(endpoint, authenticated) {
  console.log('in callApi')
  let token = localStorage.getItem('id_token') || null
  let config = {}

  if(authenticated) {
    if(token) {
      config = {
        headers: { 'Authorization': `Bearer ${token}` }
      }
      console.log('contains token setting hearders')
    }
    else {
      throw "No token saved!"
    }
  }

  return fetch(BASE_URL + endpoint, config)
    .then(response => 
      response.text().then(text => ({ text, response }))
    ).then(({ text, response }) => {
      if (!response.ok) {
        return Promise.reject(text)
      }
      console.log('in fetch 2nd then')
      return text
    }).catch(err => console.log(err))
}

export const CALL_API = Symbol('Call API')

export default store => next => action => {
  console.log('in store - next- action curry')
  const callAPI = action[CALL_API]

  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint, types, authenticated } = callAPI

  const [ requestType, successType, errorType ] = types

  // Passing the authenticated boolean back in our data will let us distinguish between normal and secret quotes
  return callApi(endpoint, authenticated).then(
    response =>
      next({
        response,
        authenticated,
        type: successType
      }),
    error => next({
      error: error.message || 'There was an error.',
      type: errorType
    })
  )
}