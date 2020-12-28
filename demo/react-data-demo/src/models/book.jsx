import AppModel from 'models/app';
import { truncate } from 'utils/transforms';

class Book extends AppModel {
	constructor(type, store, props = {}) {
		super(type, store, props);

		// Attrs
		this.photo = props.photo;
		this.title = props.title;
		this.description = props.description;
		this.printType = props.printType;
		this.language = props.language;


		// Relationships
		this.authors = this.hasMany('author', props.authors);
		this.categories = this.hasMany('category', props.categories);
		this.publishers = this.hasMany('publisher', props.publishers);
	}

	get previewDescription() {
		return this.description ? truncate(this.description, 60, true) : '--'
	}
}

export default Book;
