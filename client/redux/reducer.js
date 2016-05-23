/*function getId(state) {
  return state.todos.reduce((maxId, todo) => {
    return Math.max(todo.id, maxId)
  }, -1) + 1
}

let reducer = function(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return Object.assign({}, state, {
        todos: [{
          text: action.text,
          completed: false,
          id: getId(state)
        }, ...state.todos]
      })
    case 'COMPLETE_TODO':
      return Object.assign({}, state, {
        todos: state.todos.map((todo) => {
          return todo.id === action.id ? 
            Object.assign({}, todo, {completed: !todo.completed}) : todo
        })
      })
    case 'DELETE_TODO':
      return Object.assign({}, state, {
        todos: state.todos.filter((todo) => {
          return todo.id !== action.id
        })
      })
    case 'INCREMENT_COUNT':
      return Object.assign({}, state, {
        count: state.count + 1
      })  
    default: 
      return state;
  }
}

export default reducer*/

'use strict';

const mainReducer = (previousState, action) => {
  switch(action.type){
    case 'STORE_TOKEN': 
      return Object.assign({}, previousState, 
          { token: action.token })

    case 'SET_LOGGED_IN': 
      return Object.assign({}, previousState, 
          { token: action.token })  

    case 'REMOVE_TOKEN': 
      return Object.assign({}, previousState, 
          { loggedIn: action.loggedIn })

    default:
      return previousState  
  }
}

export default mainReducer
