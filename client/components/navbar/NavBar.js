import React, { Component } from 'react'
import { Navbar, NavItem, NavDropdown, MenuItem, Nav} from 'react-bootstrap'
import Logout from '../logout/Logout'
import  { logoutUser } from '../../redux/actions'
import Auth from '../../auth/auth'
import store from '../../redux/store'
import { browserHistory } from 'react-router'

let NavBar = new React.createClass({

	logoutUser(e){
		e.preventDefault()
		store.dispatch(logoutUser())
		//logoutUser()(store.dispatch)
	},
	
	render(){
		let whenLoggedIn = <div className="relevant-nav-item">
						<NavItem className="nav-item" eventKey={2} href="/new">Post</NavItem>
						<NavDropdown className="nav-item" eventKey={3} title="Account" id="basic-nav-dropdown">
							<MenuItem eventKey={3.1}>Settings</MenuItem>
							<MenuItem divider />
							<MenuItem eventKey={3.3} onClick={this.logoutUser}>Logout</MenuItem>
						</NavDropdown>
						</div>
		let relevantNavItem = Auth.loggedIn() ? whenLoggedIn : <NavItem eventKey={3} href="/login">Login</NavItem>;
		return(
			<Navbar>
				<Navbar.Header>
					<Navbar.Brand>
						<a href="/home">Facebook Basic</a>
					</Navbar.Brand>
				</Navbar.Header>
				<Nav pullRight>
					<NavItem eventKey={1} href="/home">Home</NavItem>

					{ relevantNavItem }
									
				</Nav>
			</Navbar>
		)
	}
});

export default NavBar

/*if(Auth.isLoggedIn()){
						<NavDropdown eventKey={2} title="Account" id="basic-nav-dropdown">
							<MenuItem eventKey={2.1}>Settings</MenuItem>
							<MenuItem divider />
							<MenuItem eventKey={2.3} onClick={this.logoutUser}>Logout</MenuItem>
						</NavDropdown>
					} else {
						<NavItem eventKey={3} href="/login">Login</NavItem>
					}*/