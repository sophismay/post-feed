require('es6-promise').polyfill() // for promise support for unsupported browsers. used by fetch
import React from 'react'
import { render } from 'react-dom'
import App from './components/app/App'
import Register from './components/register/Register'
import Login from './components/login/Login'
import Posts from './components/posts/Posts'
import PostApp from './components/postapp/PostApp'
import PostForm from './components/postform/PostForm'
import NoMatch from './components/nomatch/NoMatch'
import store from './redux/store'
import { Provider } from 'react-redux'
import { browserHistory, Router, Route, Link, withRouter } from 'react-router'
import Auth from './auth/auth'


render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App} store={store}>
        <Route path='register' component={Register} onEnter={Auth.requireNotLoggedIn} />
        <Route path='login' component={Login}  onEnter={Auth.requireNotLoggedIn} />
        <Route path='home' component={Posts} onEnter={Auth.requireLogin} />
        <Route path='new' component={PostForm} onEnter={Auth.requireLogin} />
        <Route path='*' component={NoMatch} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)