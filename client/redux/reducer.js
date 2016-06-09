'use strict';

import { combineReducers } from 'redux'
import { REQUEST_POSTS, RECEIVE_POSTS, LOGIN_REQUEST, 
  LOGIN_SUCCESS, LOGIN_FAILURE, POST_REQUEST, POST_SUCCESS, POST_FAILURE, 
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE, COMMENT_POST_REQUEST, 
  COMMENT_POST_FAILURE, COMMENT_POST_SUCCESS } from './actions'

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
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        credentials: action.credentials
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
        token: action.token,
        errorMessage: ''
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
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
        credentials: action.credentials
      })
    case REGISTER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
        errorMessage: ''
      })  
    case REGISTER_FAILURE:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        errorMessage: action.message
      })    
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
    case FETCH_POSTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      })   
    case FETCH_POSTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        posts: action.posts
      })  
    case FETCH_POSTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        message: action.message
      })  
    case COMMENT_POST_REQUEST:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        comment: action.comment
      }) 
    case COMMENT_POST_SUCCESS:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        comment: action.comment
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
