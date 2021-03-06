import store from './store'
import fetch from 'isomorphic-fetch'
import { browserHistory } from 'react-router'
const POST_API = 'http://localhost:3001/api/posts' 

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

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST'
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE'

export const COMMENT_POST_REQUEST = 'COMMENT_POST_REQUEST'
export const COMMENT_POST_SUCCESS = 'COMMENT_POST_SUCCESS'
export const COMMENT_POST_FAILURE = 'COMMENT_POST_FAILURE'

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
    user
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

export const receiveLogin = (res) => {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    token: res.token,
    user: res.user
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

export const fetchPostsRequest = () => {
  return {
    type: FETCH_POSTS_REQUEST,
    isFetching: true
  }
}

export const fetchPostsSuccess = (posts) => {
  return {
    type: FETCH_POSTS_SUCCESS,
    isFetching: false,
    posts
  }
}

export const fetchPostsFailure = (message) => {
  return {
    type: FETCH_POSTS_REQUEST,
    isFetching: false,
    message
  }
}

export const commentPostRequest = (comment) => {
  return {
    type: COMMENT_POST_REQUEST,
    isFetching: true,
    comment
  }
}

export const commentPostSuccess = (comment) => {
  return {
    type: COMMENT_POST_SUCCESS,
    isFetching: false,
    comment
  }
}

export const commentPostFailure = (message) => {
  return {
    type: COMMENT_POST_FAILURE,
    isFetching: false,
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


// Calls the API to get a token and
// dispatches actions along the way
// NOT USED AT THE MOMENT
export const loginUser = (creds) => {

  let config = {
    method: 'POST',
    headers: { 'Contenct-Type':'application/x-www-form-urlencoded' },
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
          localStorage.setItem('loggedIn', true)
          // Dispatch the success action
          console.log('user before dispatching receiveLogin: ' 
              + JSON.stringify(user))
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
          localStorage.setItem('userId', user.user._id)
          localStorage.setItem('userName', user.user.name)
          
          console.log('local storage: ' + JSON.stringify(localStorage))
          // Dispatch the success action
          dispatch(receiveRegister(user))
          console.log('store state after receiveRegister dispatch: ' + JSON.stringify(store.getState()))
          console.log('user after receiveRegister dispatch: ' + JSON.stringify(user))

          return Promise.resolve()
        }
      }).catch(err => console.log("Error: ", err))
  }
}

// Logs the user out
export const logoutUser = () => {
  return dispatch => {
    
    dispatch(requestLogout())
    Object.keys(localStorage).forEach( (key, index) => {
      key === 'loggedIn' ? localStorage.setItem('loggedIn', false) : 
        localStorage.removeItem(key)
      
    })
    dispatch(receiveLogout())
    browserHistory.push('/login')
  } 
}

export const createPost = (data) => {
  return dispatch => {
    console.log('inside creatPost curry')
    dispatch(postRequest())
    let token = localStorage.getItem('token') || null
    let userId = localStorage.getItem('userId') || null
    let userName = localStorage.getItem('userName') || null
    if(!localStorage.getItem('loggedIn') && !token){
      // TODO: handle error
    }

    data = Object.assign(data, data, {user: userId, author: userName})
    let config = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}` 
      }
    }
    //TODO: handle validation error from server
    return fetch(POST_API, config)
      .then(response => response.json().then(post => ({ post, response }))
        ).then(({ post, response }) => {
          console.log('response ' + JSON.stringify(response))
          console.log('post ' + JSON.stringify(response))
          if(!response.ok){
            dispatch(postFailure(post.message))
            return Promise.reject(post)
          } else {

          console.log('post successful: ' + JSON.stringify(post))
          // Dispatch the success action
          dispatch(postSuccess(post))
        }
      }).catch(err => {
        console.log("Error: " + JSON.stringify(err))
        dispatch(logoutUser())
      })
  }
}

// uses the middleware to get posts
// but we set authenticated
// to true so that the auth header is sent
export const fetchPosts = () => {
  return dispatch => {
    console.log('inside fetch posts')
    dispatch(fetchPostsRequest())

    let token = localStorage.getItem('token') || null
    let config
    if(token){
      config = {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      }
    } else {
      browserHistory.push('/login')
    }
    
    return fetch(POST_API, config)
      .then(response => 
        response.status === 401 ? 
          dispatch(logoutUser()) : 
          response.json().then(posts => ({posts, response }))
      )
      .then(({ posts, response }) => {
        if(response.status == 401){
          dispatch(fetchPostsFailure('unauthorized'))
          dispatch(logoutUser())
          return Promise.reject()
        }
        console.log('response status: ' + response.status)
        console.log('response from fetch posts : ' + JSON.stringify(posts))
        if(!response.ok){
          console.log('resonse not ok: ' + response)
          dispatch(fetchPostsFailure(posts.message))
          return Promise.reject(posts)
        } else {
          console.log('fetch successful: ' + JSON.stringify(posts))

          dispatch(fetchPostsSuccess(posts))
          // TODO: set state in caller componentDidMount
          return posts
        }
      }).catch(err => {
        console.log("Error: " + JSON.stringify(err))
      })
  }
}

export const commentPost = (data) => {
  return dispatch => {
    console.log('inside commentPost ')
    dispatch(commentPostRequest(data))

    let token = localStorage.getItem('token') || null
    let userName = localStorage.getItem('userName')
    let userId = localStorage.getItem('userId')
    data = Object.assign(data, data, {user: userId, name: userName})
    let config
    if(token){
      config = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      }
    } else {
      //TODO: handle error
      browserHistory.push('/login')
    }

    return fetch(POST_API + '/' + data.postId + '/reply', config)
      .then(response => response.json().then(post => ({post, response })))
      .then(({ post, response }) => {
        if(!response.ok){
          console.log('response was not okay?')
          dispatch(commentPostFailure(post.message))
          return Promise.reject({error: post.message})
        }else {
          console.log('comment post successful: ' + JSON.stringify(post))

          dispatch(commentPostSuccess(post))
          return Promise.resolve(post)
        }
      }).catch( (err) => {
        console.log('error caught ', err)
      })

  }
}