import $ from 'jquery'
import request from 'superagent'
import { storeToken } from '../redux/actions'
import store from '../redux/store'

class Auth {
  constructor(){

  }

  static loggedIn() {
    //return !!localStorage.token
    return store.getState().token ? true : false
  }

  static requireLogin(nextState, replace){
    console.log('consoling logged state: ' + store.getState().loggedIn)
    console.log('consoling token state: ' + store.getState().loggedIn)
    if (!this.loggedIn) { 
      console.log('not logged in, replacing')
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      })
    }
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

//let Auth = {
  /*login(email, pass, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.token) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }
    pretendRequest(email, pass, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token
        if (cb) cb(true)
        this.onChange(true)
      } else {
        if (cb) cb(false)
        this.onChange(false)
      }
    })
  },*/
//}

   /*request.post('/api/users', 
      formData).end(function(err, res){
        if(err) console.log('error posting: ' + err.toString());
        else console.log('response data : ' + JSON.stringify(res));
      })*/
