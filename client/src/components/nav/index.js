import Logo from '../../assets/Logo.svg';
import React, { Component } from "react";

class NavBar extends Component {

	componentDidMount() {
		document.querySelectorAll("nav-item").forEach(item => {
			item.addEventListener('navItemClicked', this.handleEventListeners);
		});
	};

	componentWillUnmount() {
		document.querySelectorAll("nav-item").forEach(item => {
			item.removeEventListener('navItemClicked');
		});
	};

	handleEventListeners = (e) => {
		console.log(e.detail);
	};

	render() {
		return (
			<div>
				<nav-bar img={Logo}>
					<nav-item id='blogs'>My Blogs</nav-item>
					<nav-item id='bucket-list'>My Bucket List</nav-item>
					<nav-item id='profile'>Profile</nav-item>
					<nav-item id='signOut'>Sign Out</nav-item>
				</nav-bar>
			</div>
		);
	}
}

export default NavBar;