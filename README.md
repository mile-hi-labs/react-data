## Overview
React Data is a state management library for React and React Native applications. The library is lightweight and configurable so you can quickly connect React Data to your API and then grow with it over time.


## How it Works
React Data uses the [Context Hooks](https://reactjs.org/docs/context.html) to construct a global data store that interconnects adapters, serializers, and models to communicate with your API, retrieve data, and store that data in a local store that's available in any component. React Data works best with a [JSON-API](https://jsonapi.org/) and REST patterns. To learn more about React Data or for more advanced usage, please visit the [API Documentation](https://app.gitbook.com/@mile-hi-labs/s/react-data/).


## Quick Start
`npm install react-data`

Add the following to your `app.jsx` file or near the top of your application.

```
# app.jsx

import React from 'react';
import Routes from 'router';
import { StoreProvider } from 'react-data';
ipmort * as Adapters from 'adapters';
ipmort * as Models from 'models';
ipmort * as Serializers from 'serializers';


const App = (props) => {

  return (
    <div id='application' className='application'>
      <StoreProvider apiDomain='http://api.yourdomain.com' adapters={Adapters} serialiers={Serializers} models={Models}>
      	<Routes />
    	</StoreContext>
  	</div>
	)
}

export default App;
```

Then, you can access the store from any route or component like so:

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
			let storeUsers = store.query('user', {});
			setUsers(storeUsers);
		} catch(e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	}

	// Render
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

export default withStore(MktIndex);

```


## Advanced Usaged
While React Data is designed to work with minimal configuration, you're going to end up writing your own adapters, serializers, and models to match your needs. So, it's important to understand the various parts of this library, how they interconnect, and how to configure them.


### The Store
The Store acts as the central hub connecting your adapters, serializers, and models together to communiciate with your API, retrieve and store data locally. So, while you'll need to author those components elsewhere (hopefully in their respective directories) you'll access them from any component through the `store` prop as shown in the Quickstart guide.


### Adapters
Adapters handle URL configuration when communicating with your API. This way, we're able to construct the base URL, endpoint, and any parameters you're looking to
pass into the server seamlessly. When authoring a adapter, you should inherit from the `BaseAdapter` provided by React Data like so:

```
# adapters/user.jsx

import { BaseAdapter } from '@mile-hi-labs/react-data';


class BlogAdapter extends BaseAdapter {

	// Overrides
	static apiDomain = 'https://api.blogdomain.com';

	// Overrides
	static urlForFindRecord(modelName, id) {
		return `${this.apiDomain}/posts/{id}`
	}
}

export default BlogAdapter;
```


### Models
Models declare the data you expect to send to / receive from the server and then how it should get stored and interconnected in your local data store. We recommend keping your models fairly lightweight and then remove them when they're done being used. This way, you maintain a performant store and application. When authoring a model, you should inherit from the `BaseModel` provided by React Data like so:

```
# models/user.jsx

import { BaseModel } from '@mile-hi-labs/react-data';


class UserModel extends BaseModel {
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
In React Data, serializers handle data serialization and normalization when passing data to and from your server.
This way, we're able to format your requests appropriately while giving you the opportunity to customize your data as it comes in (or goes out) as you see fit.
To declare a serializer, simply do the following:

```
# serializers/user.jsx

import { BaseSerializer } from '@mile-hi-labs/react-data';


class UserSerializer extends BaseSerializer {
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


## Best Practices
- We recomend authoring an `AppAdapter`, `AppModel`, and `AppSerializer` in your project that inherit from the base components offered by React Data. That way, you have a global app component for configuration and inheritance moving forward.



## Development
- Clone this repository
- Run `npm link` from this library
- Open up the demo proejct (or another proejcton your local machine) where you'd like to use this library
- Run `npm link @mile-hi-labs/react-data` from your project
- You can now develop both projects simultaneously
- Run `npm run build` to push code from the library to your project
- Run `npm run build:prod` push compressed code from the library to your project


## Publish
- npm publish
- npm publish --dry-run

## Links
- [Github](https://github.com/MileHiLabs/react-data)
- [API Documentation](https://app.gitbook.com/@mile-hi-labs/s/react-data/)
- [Mile Hi Labs](https://milehilabs.io)


