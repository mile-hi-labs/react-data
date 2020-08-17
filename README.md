# Overview
React Data is a state management solution for React applications. The library is lightweight, performant, configurable, and scalable so you can get right into building your application rather than configuring your data layer.


# How it Works
React Data uses React's Context API to construct a global data store for your application that's configurable by you. The data store consists of 4 main components:

- The Store
- Adapters
- Models
- Serializers

As you might expect, the store acts as the central data hub for your application that interconnects your adapters, serializers, and models to communicate with your API and make that data available to your application. 
To learn more about how all these pieces work, please read through the *Advanced Usage* section or visit our online documentation for further information. The library currently assumes you're using 
a (JSON API)[https://jsonapi.org/] and follow REST patterns though we'd like to offer more options down the road. Collectively, we think this approach offers an intuitive and efficient way to get up and running.


# Quick Start
`npm install react-data`

Add the following to your `app.jsx` file or near the top of your application:

```
# app.jsx

import React from 'react';
import Routes from 'router';
import { storeContext } from 'react-data';


const App = (props) => {
  
  return (
    <div id='application' className='application'>
      <StoreContext apiDomain='http://api.yourdomain.com'>
      	<Routes />
    	</StoreContext>
  	</div>
	)
}

export default App;
```

And then, use it like so from any route or component:

```
# routes/mkt/index.jsx

import React, { useEffect } from 'react';
import { withStore } from 'react-data';
import UserList from 'components/user/user-list';

const MktIndex = (props) => {
	const { store } = props;
	const [ users, setUsers ] = useState([]);
	const [ loading, setLoading ] = useState([]);

	// Hooks
	useEffect(() => {
		fetchData()
	}, []);


	// Async
	async fetchData = () => {
		try {
			setLoading(true);
			let users = this.props.store.query('user', {});
			this.setState({ users: users });
		} catch(e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	}

	// Render
	render() {
		const { store } = this.props;
		const { users, isLoading } = this.state;
		
		return (
			<div className='container'>
				{loading ? (
					<h6>...loading...</h6>
				) : (
					<UserList users={users}/>
				)}
			</div>
		)
	}
}

export default withStore(MktIndex);

```


# Advanced Usage
This section highlights the core components behind React Data. If you'd like more information, checkout the API Documentation.


### Store
In React Data, the store acts as the central hub connecting your adapters, serializers, and models together to communciate with your API and store that data locally. 
The store uses the React Context API to make itself available from any component using the `withStore` wrapper. Then, you can access the store via the props on the component. 


### Adapters
In React Data, adapters handle URL configuration when communicating with your API. This way, we're able to construct the base URL, endpoint, and any parameters you're looking to 
pass into the server seamlessly. To delcare an adapter, simply do the following:

```
// adapters/user.jsx

import { AppAdapter } from 'react-data';


class BlogAdapter extends AppAdapter {
	
	// Overrides
	static apiDomain = 'https://api.blogdomain.com';


	static urlForFindRecord(modelName, id) {
		return `${this.apiDomain}/posts/{id}`
	}
}

export default BlogAdapter;
```


### Models
In React Data, models declare the data going to and from the server and then interconnect that data in your application for seamless computations and handling.
To declare a model, simply do the following:

```
// models/user.jsx

import { AppModel } from 'react-data';


class UserModel extends AppModel {
	constructor(type, store, props = {}) {
		super(type, store, props);
	}

	// Declare your properties here
	this.firstName = props.firstName;
	this.lasttName = props.lastName;


	// Computed
	get fullName() {
		return this.firstName + ' ' + this.lastName;
	}
}

export default UserModel;
```


### Serializers
In React Data, serializers handle data serialization and normalization when passing data to and from your server. This way, we're able to parse certain information and format. To declare a serializer, simply do the following:

```
// serializers/user.jsx

import { AppSerializer } from 'react-data';


class UserSerializer extends AppSerializer {
	constructor(type, store, props = {}) {
		super(type, store, props);
	}


	// Overrides
	get serializeAttrs() {
		fullName: false
	}

	
	get serializeRelationships() {
		location: { id: true },
		cards: true,
	}

}

export default UserSerializer;
```


# FAQ

### Why React Data?
State management libraries are often complex, opinionated, and require quite a bit of configuration. We love React for it's simplicity and configuration so we wanted 
to build a state management library to match. 


### What inspired React Data? 
React Data is heavily inspired by (Ember-Data)[https://emberjs.com] packaged into a lightweight React library.


### Tell me more about React Data's size?
At 84KB, React Data is tiny compared to it's utility as the data layer is often the most importart and challenging aspect of any application -- especially as you scale.


### Tell me more about performance?
React Data uses dynamic imports to lazy load and cache any Adapters, Serializers, or Models that you've added to your project. This way, If those files are present, 


### Tell me more about configuration?
React Data uses on a base adapter, serializer, and model to provide the foundation for those  functionality that'll become second-nature as you get going.


### Why should I use React Data
React Data takes a conventional approach to app development while still allowing plenty of configuration for advanced developers.


### Are there any best-practices I should be aware of?
You shouldn't overload the store with data that isn't being used or is no longer needed. We suggest keeping an eye on the data being loaded into the store and clearing any unused data
regularly to keep performance at it's best.


### Development vs Production Mode
React Data comes pre-bundled for production however it does read your `NODE_ENV` variable to provide some logging and time stamps for performance.


### Who's using React Data?
React Data is currently being being used by (Beauty Broker)[https://beautybroker.io], (Blush)[https://blushednow.com], (Chartz)[https://chartz.io], and (Kart)[https://kart.io]. If you're using 
React Data in your application, we'd love to hear from you!


# Development
- Clone this repository
- Run `npm link` from this library
- Open up a project where you'd like to use this library
- Run `npm link react-data` from your project
- You can now develop both projects simultaneously
- Run `npm run build` to push code from the library to your project


# Links
- Github
- NPM
- API Documentation

# About the Author
Mile Hi Labs is a software consultancy based in Denver, Colorado. You can find us online (here)[https://milehilabs.io] if you'd like to connect.

