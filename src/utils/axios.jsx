import axios from 'axios';
import { isEmpty } from 'utils/helpers';

class Axios {
  constructor(props) {}


  // Methods
  instance() {
    let instance = axios.create({ baseURL: typeof window === 'undefined' ? '' : process.env.REACT_APP_SERVER_DOMAIN });
    return instance;
  }

  static async authorize(instance) {
  	let token= '';
  	if (token) {
  		instance.defaults.headers.common['Authorization'] = `JWT ${token}`;
  	}
  }

}

export default Axios;
