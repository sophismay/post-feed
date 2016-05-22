import $ from 'jquery'
import request from 'superagent'
import { storeToken } from '../redux/actions'
import store from '../redux/store'

let Auth = {
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

  login(formData, callback){
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
  },

  register(formData, callback) {

    /*request.post('/api/users', 
      formData).end(function(err, res){
        if(err) console.log('error posting: ' + err.toString());
        else console.log('response data : ' + JSON.stringify(res));
      })*/

    // Send the form data.

    $.ajax("/api/users", {
      url: "/api/users",
      dataType: "json",
      type: "POST",
      data: formData
    }).done(function(data, status, xhr){
      // use redux store
      //localStorage.token = data.token;

      if(callback) return callback(null, data);
      
    }).fail(function(xhr, status, err){
      console.log('there was an error');
      console.log('error :' + err.toString());
      
      if(callback) return callback(err, null);
    });
  },

  getToken() {
    return localStorage.token
  },

  logout(cb) {
    delete localStorage.token
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn() {
    //return !!localStorage.token
    return store.getState().token ? true : false
  },

  onChange() {}
}

function pretendRequest(email, pass, cb) {
  setTimeout(() => {
    if (email === 'joe@example.com' && pass === 'password1') {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      })
    } else {
      cb({ authenticated: false })
    }
  }, 0)

};

export default Auth