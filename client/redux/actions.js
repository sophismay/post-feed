/*let actions = {
  addTodo: function(text) {
    return {
      type: 'ADD_TODO',
      text: text
    }
  },

  completeTodo: function(id) {
    return {
      type: 'COMPLETE_TODO',
      id: id
    }
  },

  deleteTodo: function(id) {
    return {
      type: 'DELETE_TODO',
      id: id
    }
  },

  incrementCount: function(count){
    return {
      type: 'INCREMENT_COUNT',
      count: count
    }
  }

}

export default actions
*/

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