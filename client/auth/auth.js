import $ from 'jquery'
import request from 'superagent'
import store from '../redux/store'

class Auth {
  constructor(){

  }

  static loggedIn() {
    return localStorage.getItem('token') ? true : false
  }

  static requireNotLoggedIn(nextState, replace){
    if(!Auth.loggedIn){
      let nextPathname = nextState ? nextState.location.pathname : ''
      alert('you have to log out first')
      // TODO: make a log out request
    }
  }

  static requireLogin(nextState, replace){

    console.log('consoling imported store state: ' + JSON.stringify(store.getState()))
    console.log('logged state without this: ' + Auth.loggedIn())
    console.log('localStorage before requiring login: ' + JSON.stringify(localStorage))

    if (!Auth.loggedIn()) { 
      console.log('not logged in, replacing')
      let nextPathname = nextState ? nextState.location.pathname : ''
      console.log('nextPathname: ' + nextPathname)
      replace({
        pathname: '/login',
        state: { nextPathname: nextPathname }
      })
    }
    //TODO: else get the current user
  }

  static login(formData, callback){
    request.post('/auth/local', formData)
      .end( (err, res) => {
        if(err || !res){
          // TODO: handle failure appropriately
          console.log('error logging in')
          return callback(err, null);
        }else {
          console.log('success logging in : ' + JSON.stringify(res))
          return callback(null, res)
        }
      })
  }

  static register(formData, callback) {
    // Send the form data.

    $.ajax("/api/users", {
      url: "/api/users",
      dataType: "json",
      type: "POST",
      data: formData
    }).done(function(data, status, xhr){

      if(callback) return callback(null, data);
      
    }).fail(function(xhr, status, err){
      console.log('there was an error');
      console.log('error :' + err.toString());
      
      if(callback) return callback(err, null);
    });
  }

  static getUser(){
    request.get('/auth')
  }

  static getToken() {
    return localStorage.token
  }

  static logout(cb) {
    delete localStorage.token
    if (cb) cb()
    this.onChange(false)
  }

  static onChange() {}

}

export default Auth

   /*request.post('/api/users', 
      formData).end(function(err, res){
        if(err) console.log('error posting: ' + err.toString());
        else console.log('response data : ' + JSON.stringify(res));
      })*/
