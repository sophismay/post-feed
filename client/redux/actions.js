import store from './store'
import fetch from 'isomorphic-fetch'
import { CALL_API } from '../middleware/post'
import { browserHistory } from 'react-router'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

export const POST_REQUEST = 'POST_REQUEST'
export const POST_SUCCESS = 'POST_SUCCESS'
export const POST_FAILURE = 'POST_FAILURE'

export const POST_FORM_REQUEST = 'POST_FORM_REQUEST'
export const POST_FORM_SUCCESS = 'POST_FORM_SUCCESS'
export const POST_FORM_FAILURE = 'POST_FORM_FAILURE'

export const requestRegister = (credentials) => {
  return {
    type: REGISTER_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    credentials
  }
}

export const receiveRegister = (user) => {
  return {
    type: REGISTER_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    token: user.token
  }
}

export const registerError = (message) => {
  return {
    type: REGISTER_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export const requestLogin = (credentials) => {
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
    token: user.token
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

export const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

export const postRequest = (data) => {
  return {
    type: POST_REQUEST,
    isSending: true,
    data
  }
}

export const postSuccess = (post) => {
  return {
    type: POST_SUCCESS,
    isSending: false,
    post
  }
}

export const postFailure = (message) => {
  return {
    type: POST_FAILURE,
    isSending: false,
    message
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

/*export const fetchPosts = () => {
  
  return dispatch => {
    store.dispatch(requestPosts())
    return fetch('http://localhost:3001/api/posts')
      .then(response => response.json())
      .then(json => store.dispatch(receivePosts(json)))
  }
}*/


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
          localStorage.setItem('token', user.token)
          // Dispatch the success action
          dispatch(receiveLogin(user))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export const registerUser = (creds) => {
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `email=${creds.email}&password=${creds.password}&name=${creds.name}`
  }
  return dispatch => {
    console.log('in curried call')
    dispatch(requestRegister(creds))

    return fetch('http://localhost:3001/api/users', config)
      .then(response =>
        response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(registerError(user.message))
          return Promise.reject(user)
        } else {
          // If register was successful, set the token in local storage

          localStorage.setItem('token', user.token)
          localStorage.setItem('user', user)
          console.log('local storage: ' + JSON.stringify(localStorage))
          // Dispatch the success action
          dispatch(receiveRegister(user))
          console.log('store state after receiveRegister dispatch: ' + JSON.stringify(store.getState()))
          console.log('user after receiveRegister dispatch: ' + JSON.stringify(user))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

// Logs the user out
export const logoutUser = () => {
  return dispatch => {
    
    dispatch(requestLogout())
    localStorage.removeItem('token')
    dispatch(receiveLogout())
    //console.log('after removing token from localStorage: ' + JSON.stringify(localStorage))
    browserHistory.push('/login')
  } 
}

/*export const createPost = () => {
  return {
    [CALL_API]: {
      endpoint: '/posts',
      authenticated: true,
      types: [POST_REQUEST, POST_SUCCESS, POST_FAILURE]
    }
  }
}*/

export const createPost = (data) => {
  return dispatch => {
    console.log('inside creatPost curry')
    dispatch(postRequest())
    console.log('dispatched post form request')
    data.userId = localStorage.getItem('user')._id
    let config = {
      method: 'POST',
      body: data
    }
    return fetch('http://localhost:3001/api/posts', config)
      .then(response => response.json().then(post => ({ post, response }))
        ).then(({ post, response }) => {
          if(!response.ok){
            dispatch(postFailure(post.message))
            return Promise.reject(post)
          } else {

          console.log('post successful: ' + JSON.stringify(post))
          // Dispatch the success action
          dispatch(postSuccess(post))
        }
      }).catch(err => console.log("Error: ", err))
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