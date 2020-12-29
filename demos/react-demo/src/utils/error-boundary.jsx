import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromError(error) {
  }

  // Hooks
  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }


  // Render
  render() {
    const { children } = this.props;
    return children;
  }
}

export default ErrorBoundary;
