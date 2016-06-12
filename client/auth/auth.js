import $ from 'jquery'
import request from 'superagent'
import store from '../redux/store'

class Auth {
  
  static loggedIn() {
    return localStorage.getItem('token') ? true : false
  }

  static requireNotLoggedIn(nextState, replace){
    if(!Auth.loggedIn){
      let nextPathname = nextState ? nextState.location.pathname : ''
      alert('you have to log out first')
    }
  }

  static requireLogin(nextState, replace){
    if (!Auth.loggedIn()) { 
      let nextPathname = nextState ? nextState.location.pathname : ''
      replace({
        pathname: '/login',
        state: { nextPathname: nextPathname }
      })
    }
  }

  static login(formData, callback){
    request.post('/auth/local', formData)
      .end( (err, res) => {
        if(err || !res){
          return callback(err, null);
        }else {
          return callback(null, res)
        }
      })
  }

  static register(formData, callback) {
    $.ajax("/api/users", {
      url: "/api/users",
      dataType: "json",
      type: "POST",
      data: formData
    }).done(function(data, status, xhr){
      if(callback) return callback(null, data);
    }).fail(function(xhr, status, err){      
      if(callback) return callback(err, null);
    });
  }

}

export default Auth
