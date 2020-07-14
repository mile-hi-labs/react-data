import React from 'react';
import { isEmpty, logger } from 'utils/helpers';

class JsonApiErrors {

  static formatErrors(e) {
    let formattedError;
    if (e.response) {
      logger('Server error: ', e.response.data.errors);
      formattedError = e.response.data.errors ? this.serverErrors(e.response.data.errors) : this.miscError(e.response.status, e.response.statusText, 'Sorry, there was a server error.');

    } else if (e.request) {
      logger('Request error: ', e.request);
      formattedError = this.miscError(500, 'Request Error', e);

    } else {
      logger('App error: ', e);
      formattedError = this.miscError(500, 'Misc Error', e.message);

    }
    return formattedError;
  }

  static miscError(status, title, detail) {
    return [{ status: status, title: title, detail: detail }];
  }

  static serverErrors(errors) {
    let formattedErrors = [];

    errors.forEach(error => {
      error.detail = error.detail.replace(/:/g, '');
      formattedErrors.push(error);
    });
    return formattedErrors;
  }

}

export default JsonApiErrors;
