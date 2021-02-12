## Overview
React Data is a state management library for React and React Native applications. The library is lightweight and configurable so you can quickly connect React Data to your API and then grow with it over time.


-------


## How it Works
React Data uses the [Context Hooks](https://reactjs.org/docs/context.html) to construct a global data store that connects the Adapters, Serializers, and Models in your project to communicate with your API and store local data. This way, you can access data fetched via previous network calls and manage that data via the local store. As an alternative, you can also bypass the local store and simply use React Data to fetch data from your API and make it available in your component. The choice is yours. React Data is designed to work with a [JSON-API](https://jsonapi.org/) and REST patterns though you're welcome to override / configure the BaseAdapter and BaseSerializer to match your needs. To learn more about React Data, please visit the [API Documentation](https://app.gitbook.com/@mile-hi-labs/s/react-data/).


-------


## Quick Start


### Install
`npm install @mile-hi-labs/react-data`


### Store Provider
Add the following to your `app.jsx` file or near the top of your application.

```
# app.jsx

import React from 'react';
import { Store, StoreProvider } from '@mile-hi-labs/react-data';
import * as Adapters from 'adapters';
import * as Models from 'models';
import * as Serializers from 'serializers';
import Router from 'router';

const apiDomain = 'https://library-api.milehilabs.dev';
const store = new Store({ apiDomain: apiDomain, adapters: Adapters, serializers: Serializers, models: Models });

const App = (props) => {

  return (
    <StoreProvider context={store}>
    	<Router />
  	</StoreContext>
	)
}

export default App;
```


### Store Consumer
Then, you can access the store from any route or component like so:

```
# routes/mkt/index.jsx

import React, { useEffect } from 'react';
import { withStore } from '@mile-hi-labs/react-data';
import UserList from 'components/user/user-list';

const MktIndex = (props) => {
	const { store } = props;
	const [ users, setUsers ] = useState([]);
	const [ loading, setLoading ] = useState([]);

	// Hooks
	useEffect(() => {
		fetchData()
	}, []);


	// Methods
	const fetchData = async () => {
		try {
			setLoading(true);
			let storeRecords = store.findAll('user', {} );
			setUsers(storeRecords);
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


-------


## Core Components
While React Data is designed to work with minimal configuration, you'll likely end up writing your own Adapters, Serializers, and Models to construct your local data store and customize network calls. As such, it's important to understand the core components of this library, how they interconnect, and how to configure them.


### The Store
The Store acts as the central hub connecting your adapters, serializers, and models together to communiciate with your API, retrieve and store data locally. So, while you'll need to author those components elsewhere (hopefully in their respective directories) you'll access them from any component through the `store` prop as shown in the Quickstart guide.


### Adapters
Adapters handle URL configuration when communicating with your API. This way, we're able to construct the base URL, endpoint, and any parameters you're looking to
pass into the server seamlessly. When authoring an Adapter, you should inherit from the `BaseAdapter` provided by React Data to ensure access to the core APIs. Then, you can override any method

```
# adapters/blog.jsx

import { BaseAdapter } from '@mile-hi-labs/react-data';


class BlogAdapter extends BaseAdapter {
	static blogApi: 'https://blog-api.yourdomain.com';

	static urlForQueryRecord(modelName, id) {
		let url = super.urlForQueryRecord(modelName, id);

		if (this.blogApi) {
			return `${this.apiDomain}/posts/{id}`;
		}

		return url;
	}
}

export default BlogAdapter;
```


### Models
Models declare the data you expect to send to / receive from the server and then how it should populate your local data store. We recommend keeping your models lightweight and then remove them when they're done being used. This way, you maintain a performant store and application. When authoring a model, you should inherit from the `BaseModel` provided by React Data like so:

```
# models/user.jsx

import { BaseModel } from '@mile-hi-labs/react-data';


class UserModel extends BaseModel {
	constructor(type, props = {}) {
		super(type, props);

		this.firstName = props.firstName;
		this.lasttName = props.lastName;
	}


	// Computed
	get fullName() {
		return this.firstName + ' ' + this.lastName;
	}
}

export default UserModel;
```


### Serializers
Serializers handle data serialization and normalization when passing data to and from your server. This way, we're able to format your requests appropriately while giving you the opportunity to customize your data as it comes in (or goes out) as you see fit. When authoring a serializer, you should inherit from the `JsonApiSerializer` provided by React Data like so:

```
# serializers/user.jsx
import { JsonApiSerializer } from '@mile-hi-labs/react-data';

class UserSerializer extends JsonApiSerializer {
	// Overrides
	static attrs = {
		fullName: { serialize: false }
	}


	static serializeAttr(data, key) {
		let formattedAttr = super.serializeAttr(data, key);
		if (key == 'age') {
			return parseInt(data[key])
		}
		return formattedAttr;
	}
}

export default UserSerializer;
```

-------


## Demo
This project comes with a built-in React and React Native demo.


## Development
This projects uses Webpack to build the project. Please see `package.json` for available scripts.


### Web
- Clone this repository
- Run `npm link` from this library
- Open up the consuming project / demo project and run `npm link @mile-hi-labs/react-data`
- Run `npm run build` to push code from the library to your project


### Native
React Native's metro bundler doesn't accept the steps below. Please contact the project author for an alternative path.
- Clone this repository
- Run `npm install` from this library
- Run `npm run build` from this library
- Open up the consuming project / demo project and run `npm install path/to/this/project`
- Repeat the steps above to consume the latest code


-------


## Publish
- Run `npm version patch` to build, deploy, commit, and tag the changes.
https://docs.npmjs.com/cli/v6/commands/npm-version


## Links
- [Github](https://github.com/mile-hi-labs/react-data)
- [API Documentation](https://app.gitbook.com/@mile-hi-labs/s/react-data/)
- [Mile Hi Labs](https://milehilabs.io)


