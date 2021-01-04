import { App as AppSerializer } from 'serializers';

class BookSerializer extends AppSerializer {
	constructor(store) {
		super(store);
	}
}

export default BookSerializer;
