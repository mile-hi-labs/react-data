# Overview
React data is a statement management (otherwise known as a "data store") solution for React applications. The library is easy to learn, lightweight, scalable, and performant so you can focus on building your application rather than configuring your data layer.


# Why
Universal state management solutions are complex and require quite a bit of configuration. React Data aims to be simple, effective, and efficient offering a conventional (and somewhat opinionated) approach to a complex problem. 
React Data is heavily inspired by the concepts of Ember-Data and packages them into a lightweight React library.


# How it Works
React data uses React's Context API to offer a global data store for your application. The data store then relies on `adapters`, `serializers`, and `models` to organize your data and handle communication with your API. 
The library assumes you use a (JSON API)[https://jsonapi.org/] and follow REST.


# Quick Start
`npm install react-data`

Add the following to your `app.jsx` file:

```
# app.jsx

import React from 'react';
import Routes from 'router';
import { storeContext } from 'react-data';


const App = (props) => {
  
  return (
    <div id='application' className='application'>
      <StoreContext>
      	<Routes />
    	</StoreContext>
  	</div>
	)
}

export default App;
```

And then, use it like so from any component:

```
# routes/homepage.jsx

import React, { Component } from 'react';
import { withStore } from 'React-Data';
import UserList from 'components/user/user-list';

class Homepage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			isLoading: false,
		}
	}

	// Hooks
	componentDidMount() {
		!this.state.users ? this.fetchData() : null;
	}


	// Async
	async fetchData() {
		try {
			this.setState({ isLoading: true });
			let users = this.props.store.query('user', {});
			this.setState({ users: users });
		} catch(e) {
			console.log(e);
		} finally {
			this.setState({ isLoading: false });
		}
	}

	// Render
	render() {
		const { store } = this.props;
		const { users, isLoading } = this.state;
		
		return (
			<div className='container'>
				{isLoading ? (
					<h6>...loading...</h6>
				) : (
					<UserList users={users}/>
				)}
			</div>
		)
	}
}

export default withStore(Homepage);

```

# Options


# Demo
This package comes with a built-in demo that uses a generic back-end that resembles a library to demonstrate the various methods of data fetching, storage, and manipulation.
- `cd demos/react-data-demo`
- `npm run start`


# Development
- Clone this repository
- Run `npm link` from this directory
- Open up another project where you'd like to use this library
- Run `npm link react-data` from that project
- You can now develop both projects simultaneously