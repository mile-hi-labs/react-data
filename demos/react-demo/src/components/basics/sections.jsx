import React, { Fragment } from 'react';
import { capitalize } from 'utils/transforms';

const SectionBlock = (props) => {
  const { title, className = '', children } = props;

  return (
    <div className={'section-block ' + className}>
      {title && <SectionHeader title={title}/>}
      {children && children}
    </div>
  )
}

const SectionHeader = (props) => {
	const { title, subtitle, className = '', children } = props;

	return (
    <div className={'section-header ' + className}>
      {title && <h4 className='title'>{title}</h4>}
      {subtitle && <h6 className='subtitle'>{subtitle}</h6>}
      {children && children}
    </div>
	)
}

const SectionBody = (props) => {
  const { title, size = 'sm', className = '', children } = props;

  return (
    <div className={
      'section-body' + 
      (size ? ` ${size}` : '') +
      (className ? ` ${className}` : '')}>
      {title && <h4 className='title'>{title}</h4>}
      {children && children}
    </div>
  )
}

const SectionDivider = (props) => {
  const { className = '' } = props;

  return <hr className={'section-divider ' + className} />
}


const SectionItem = (props) => {
  const { title, value, className = '', children } = props;

  return (
    <div className={'section-item ' + className}>
      {children ? children : (
        <div className='flex-between'>
          {title && <h6 className='subtitle'>{title}</h6>}
          {value && <h6>{typeof value == 'string' ? capitalize(value) : value}</h6>}
        </div>
      )}
    </div>
  )
}

const SectionText = (props) => {
  const { title, value, className = '', children } = props;

  return (
    <div className={'section-text ' + className}>
      {children ? children : (
        <Fragment>
          {title && <h6 className='subtitle'>{title}</h6>}
          {value && (
            <div className='mt-2'>
              <h6>{typeof value == 'string' ? capitalize(value) : value}</h6>
            </div>
          )}
        </Fragment>
      )}
    </div>
  )
}

const SectionFooter = (props) => {
  const { className = '', children } = props;

  return (
    <div className={'section-footer ' + className}>
      {children && children}
    </div>
  )
}

export { SectionBlock, SectionHeader, SectionBody, SectionDivider, SectionItem, SectionText, SectionFooter }
