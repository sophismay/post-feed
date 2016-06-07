'use strict';

import { combineReducers } from 'redux'
import { REQUEST_POSTS, RECEIVE_POSTS, LOGIN_REQUEST, 
  LOGIN_SUCCESS, LOGIN_FAILURE, POST_REQUEST, POST_SUCCESS, POST_FAILURE, 
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from './actions'

const mainReducer = (previousState = {
  token: null,
  loggedIn: false
}, action) => {
  switch(action.type){
    case 'STORE_TOKEN': 
      return Object.assign({}, previousState, 
          { token: action.token })

    case 'SET_LOGGED_IN': 
      return Object.assign({}, previousState, 
          { loggedIn: action.loggedIn })  

    case 'REMOVE_TOKEN': 
      return Object.assign({}, previousState, 
          { token: null })

    default:
      return previousState  
  }
}

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
const auth = (state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
  }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.credentials
      })
    case LOGIN_SUCCESS:
      // also setting the logged in status in localStorage
      localStorage.setItem('loggenIn', true)
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    /*case LOGOUT_SUCCESS:
      localStorage.setItem('loggedIn', false)
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })*/
    case REGISTER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.credentials
      })
    case REGISTER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      })  
    case REGISTER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })  
    // user should be stored in localStorage  
    default:
      return state
  }
}

const posts = (state = {
    isFetching: false,
    posts: [],
    authenticated: false}, action) => {

  switch (action.type) {
    case POST_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case POST_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        posts: action.response,
        authenticated: action.authenticated || false
      })
    case POST_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    default:
      return state
  }
}

const fbApp = combineReducers({
  mainReducer,
  auth,
  posts
})

export default fbApp
