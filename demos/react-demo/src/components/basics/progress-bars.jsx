import React from 'react';
import RbProgressBar from 'react-bootstrap/ProgressBar';

const ProgressBar = (props) => {
  const { animated, min, max, now, striped, variant, className = '', children } = props;

  return (
    <RbProgressBar animated={animated} min={0} max={100} now={now} className={className} />
  )
}

ProgressBar.defaultProps = { animated: true, now: 50, variant: 'success' }

export { 
  ProgressBar,
}

// Docs
// https://react-bootstrap.github.io/components/progress/