import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import fbApp from './reducer'
import logger from 'redux-logger'

const loggerMiddleware = logger()

/*let finalCreateStore = compose(
  applyMiddleware(logger())
)(createStore)


export default function configureStore(initialState = { todos: [] }) {
  return finalCreateStore(reducer, initialState)
}
*/

function configureStore(initialState = {token: null}){
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
