import React, { useState } from 'react';
import RbTab from 'react-bootstrap/Tabs';
import { logger } from 'utils/helpers';

const TabContainer = (props) => {
  const { key, className = '', children } = props;

  return (
    <RbTab.Container defaultActiveKey={key} className={className}>
      {children}
    </RbTab.Container>
  )
}

const TabContent = (props) => {
  const { className = '', children } = props;

  return (
    <RbTab.Content className={className}>
      {children}
    </RbTab.Content>
  )
}

const TabPane = (props) => {
  const { key, className = '', children } = props;

  return (
    <RbTab.Pane 
      eventKey={key} 
      onEnter={() => logger('tab enter')}
      onExit={() => logger('tab exit')}
      className={className}>
      {children}
    </RbTab.Pane>
  )
}

export { TabContainer, TabContent, TabPane }

// Docs:
// https://react-bootstrap.github.io/components/tabs/
