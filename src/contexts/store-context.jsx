import React, { Component } from 'react';
import { loadContext } from 'store/load-context';
import JsonApiError from 'utils/json-api-error';
import { addObject, removeObject, timeElapsed, logger, isEmpty } from 'utils/helpers';

const StoreContext = React.createContext();

class StoreProvider extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.context;
    if(!isEmpty(this.props.data)) loadContext(this.state, this.props.data);
  }


  // Hooks
  componentDidMount() {
    logger('React Data: ', this.state);
  }


  // Render
  render() {
    const { children } = this.props;
    return <StoreContext.Provider value={this.state}>{children}</StoreContext.Provider>;
  }
}

const withStore = function (WrappedFunction) {
  return class extends Component {
    render() {
      return <StoreContext.Consumer>{context => <WrappedFunction store={context} {...this.props} />}</StoreContext.Consumer>;
    }
  };
};

export { StoreContext, StoreProvider, withStore };
