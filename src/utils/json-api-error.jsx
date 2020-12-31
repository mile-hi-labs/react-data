import { isEmpty } from 'utils/helpers';
import { logger } from 'utils/helpers';

class JsonApiError {

  static format(e) {
    if (e.request) {
      logger('Request error: ', e.request);
      return this.miscError(500, 'Request Error', e);
    }
    if (e.response) {
      logger('Server error: ', e.response.data.errors);
      return e.response.data.errors ? this.formatErrors(e.response.data.errors) : this.formatError(e.response.status, e.response.statusText, 'Sorry, there was a server error.');
    }
    logger('App error: ', e);
    return this.formatError(500, 'App Error', e.message);
  }

  static formatErrors(errors) {
    return errors.map(e => this.formatError(e.code, e.title, e.detail));
  }

  static formatError(code, title, detail) {
    return [{ status: code, title: title, detail: detail }];
  }
}

export default JsonApiErrors;
