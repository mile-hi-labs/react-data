import { JsonApiSerializer } from '@mile-hi-labs/react-data';

class AppSerializer extends JsonApiSerializer {
  static attrs = {
    ...super.attrs,
    icon: { serialize: false },
    createdAt: { serialize: false },
    updatedAt: { serialize: false },
  };
}

export default AppSerializer;
