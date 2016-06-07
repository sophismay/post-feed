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
		applyMiddleware(thunkMiddleware, loggerMiddleware));
}

let initialState = {
  token: null,
  loggedIn: false
}

const store = configureStore(initialState)

export default store
