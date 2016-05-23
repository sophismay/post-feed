import React, { Component } from 'react'
import { Navbar, NavItem, NavDropdown, MenuItem, Nav} from 'react-bootstrap'
import Auth from '../../auth/auth'

let NavBar = new React.createClass({

	logoutUser(e){
		alert('clicked')
		/*Auth.logout( (res) => {

		});*/
	},
	
	render(){
		let relevantNavItem = Auth.loggedIn() ? <NavDropdown eventKey={2} title="Account" id="basic-nav-dropdown">
							<MenuItem eventKey={2.1}>Settings</MenuItem>
							<MenuItem divider />
							<MenuItem eventKey={2.3} onClick={this.logoutUser}>Logout</MenuItem>
						</NavDropdown> : <NavItem eventKey={3} href="/login">Login</NavItem>;
		return(
			<Navbar>
				<Navbar.Header>
					<Navbar.Brand>
						<a href="#">Facebook Basic</a>
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