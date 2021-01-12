import { isEmpty } from 'utils/helpers';
import { logger } from 'utils/helpers';

class JsonApiError {
  static format(e) {
    try {
      if (e.response) {
        logger('Server error: ', e.response.data.errors);
        return this.formatErrors(e.response.data.errors);
      }
      if (e.request) {
        logger('Request error: ', e.request);
        return [this.formatError(500, 'Request Error', e)];
      }
      logger('App error: ', e);
      return [this.formatError(500, 'App Error', e.message)];
    } catch (e) {
      return [this.formatError(500, 'Error', 'Please format your error(s) correctly.')];
    }
  }

  static formatErrors(errors) {
    return errors.map(e => this.formatError(e.code, e.title, e.detail));
  }

  static formatError(code, title, detail) {
    return { status: code, title: title, detail: detail };
  }
}

export default JsonApiError;
