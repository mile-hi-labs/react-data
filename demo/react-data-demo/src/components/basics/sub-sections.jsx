import React, { Fragment } from 'react';
import { capitalize } from 'utils/transforms';

const SubSectionBlock = (props) => {
  const { title, className = '', children } = props;

  return (
    <div className={'subsection-block ' + className}>
      {title && <SubSectionHeader title={title}/>}
      {children && children}
    </div>
  )
}

const SubSectionHeader = (props) => {
  const { title, className = '', children } = props;

  return (
    <div className={'subsection-header ' + className}>
      {title && <h6 className='subtitle'>{title}</h6>}
      {children && children}
    </div>
  )
}

const SubSectionBody = (props) => {
  const { title, className = '', children } = props;

  return (
    <div className={'subsection-body ' + className}>
      {children && children}
    </div>
  )
}

export { SubSectionBlock, SubSectionHeader, SubSectionBody }