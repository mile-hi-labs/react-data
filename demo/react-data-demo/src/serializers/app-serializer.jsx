import { BaseSerializer } from '@mile-hi-labs/react-data';
import { maskToString } from 'utils/transforms';

class AppSerializer extends BaseSerializer {
	constructor(store, props) {
		super(store, props);
	}

	get attrs() {
		return {
			...super.attrs,
			createdAt: { serialize: false },
			updatedAt: { serialize: false },
		}
	}

	// Methods
	serializeAttr(data, key) {
		let formattedKey = super.serializeAttr(data, key);

		if (key.includes('phone') || key.includes('Phone')) {
			return maskToString(data[key]);
		}
		return formattedKey;
	}


}

export default AppSerializer;
