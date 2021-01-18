import { BaseSerializer } from '@mile-hi-labs/react-data';

class AppSerializer extends BaseSerializer {
  static attrs = {
    ...super.attrs,
    icon: { serialize: false },
    createdAt: { serialize: false },
    updatedAt: { serialize: false },
  };

  // Methods
  static serializeAttr(data, key) {
    let formattedKey = super.serializeAttr(data, key);
    return formattedKey;
  }
}

export default AppSerializer;
