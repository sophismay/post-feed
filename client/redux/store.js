import { applyMiddleware, compose, createStore } from 'redux'
import reducer from './reducer'
import logger from 'redux-logger'

/*let finalCreateStore = compose(
  applyMiddleware(logger())
)(createStore)


export default function configureStore(initialState = { todos: [] }) {
  return finalCreateStore(reducer, initialState)
}
*/
console.log('reducer: ' + reducer)

function configureStore(initialState = {token: null}){
	return createStore(reducer, initialState);
}

let initialState = {
  token: null
}

let store = configureStore(initialState)

console.log('getting state: ' + JSON.stringify(store.getState()));

export default store
