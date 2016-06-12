import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import fbApp from './reducer'
import logger from 'redux-logger'

const loggerMiddleware = logger()

function configureStore(initialState = {token: null}){
	// create store including middleware. include redux dev tools extension also
	return createStore(fbApp, 
		compose(applyMiddleware(thunkMiddleware, loggerMiddleware),
			 window.devToolsExtension ? window.devToolsExtension() : f => f));
}

let initialState = {
  token: null,
  loggedIn: false
}

const store = configureStore(initialState)

export default store
