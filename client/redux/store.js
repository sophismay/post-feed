import { applyMiddleware, compose, createStore } from 'redux'
import mainReducer from './reducer'
import logger from 'redux-logger'

/*let finalCreateStore = compose(
  applyMiddleware(logger())
)(createStore)


export default function configureStore(initialState = { todos: [] }) {
  return finalCreateStore(reducer, initialState)
}
*/
//console.log('reducer: ' + mainReducer)

function configureStore(initialState = {token: null}){
	return createStore(mainReducer, initialState);
}

let initialState = {
  token: null,
  loggedIn: false
}

const store = configureStore(initialState)

console.log('getting init state: ' + JSON.stringify(store.getState()));

export default store
