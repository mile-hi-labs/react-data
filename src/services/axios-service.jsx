import Axios from 'axios';
import { isEmpty } from 'utils/helpers';

class AxiosService {
  constructor(props = {}) {
    this.baseURL = props.baseURL;
    this.token = props.token;
  }

  // Methods
  get instance() {
    let instance = Axios.create({ baseURL: this.baseURL });
    if (this.token) {
      instance.defaults.headers.common['Authorization'] = `JWT ${this.token}`;
    }
    return instance;
  }
}

export default AxiosService;
