import AppSerializer from 'serializers/app-serializer';

class BookSerializer extends AppSerializer {
	static relationships = {
		authors: { serialize: true }
	}
}

export default BookSerializer;
