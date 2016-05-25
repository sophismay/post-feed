import store from './store'
import fetch from 'isomorphic-fetch'
import { CALL_API } from '../middleware/post'


export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

export const POST_REQUEST = 'POST_REQUEST'
export const POST_SUCCESS = 'POST_SUCCESS'
export const POST_FAILURE = 'POST_FAILURE'

export const requestLogin = (credentials) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    credentials
  }
}

export const receiveLogin = (user) => {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  }
}

export const loginError = (message) => {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

export const receiveLogout() => {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}


export const storeToken = (token) => {
  return {
    type: 'STORE_TOKEN',
    token
  }
}

export const removeToken = () => {
  return {
    type: 'REMOVE_TOKEN',
    token: null
  }
}

export const setLoggedIn = (loggedIn) => {
  return {
    type: 'SET_LOGGED_IN',
    loggedIn
  }
}

export const requestPosts = () => {
  return {
    type: REQUEST_POSTS
  }
}

export const receivePosts = (posts) => {
  return {
    type: RECEIVE_POSTS,
    posts: posts,
    receivedAt: Date.now()
  }
}

export const fetchPosts = () => {
  
  return dispatch => {
    store.dispatch(requestPosts())
    return fetch('http://localhost:3001/api/posts')
      .then(response => response.json())
      .then(json => store.dispatch(receivePosts(json)))
  }
}


// Calls the API to get a token and
// dispatches actions along the way
export const loginUser = (creds) => {

  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `email=${creds.email}&password=${creds.password}`
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    let dispatch = store.dispatch
    dispatch(requestLogin(creds))

    return fetch('http://localhost:3001/api/auth/local', config)
      .then(response =>
        response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(user.message))
          return Promise.reject(user)
        } else {
          // If login was successful, set the token in local storage
          localStorage.setItem('id_token', user.id_token)
          // Dispatch the success action
          dispatch(receiveLogin(user))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

// Logs the user out
export const logoutUser = () => {
  return dispatch => {
    let dispatch = store.dispatch
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    dispatch(receiveLogout())
  } 
}

// uses the middleware to get posts
// but we set authenticated
// to true so that the auth header is sent
export const fetchPosts = () => {
  return {
    [CALL_API]: {
      endpoint: '',
      authenticated: true,
      types: [POST_REQUEST, POST_SUCCESS, POST_FAILURE]
    }
  }
}

/*// Uses the API middlware to get a post
export const fetchQuote = () => {
  return {
    [CALL_API]: {
      endpoint: 'random-post',
      types: [QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE]
    }
  }
}

// Same API middlware is used to get a 
// secret quote, but we set authenticated
// to true so that the auth header is sent
export const fetchSecretQuote = () => {
  return {
    [CALL_API]: {
      endpoint: 'protected/random-quote',
      authenticated: true,
      types: [QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE]
    }
  }
}*/