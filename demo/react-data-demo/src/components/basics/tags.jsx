import React, { useEffect } from 'react';
import { ButtonText } from 'components/basics/buttons';
import { CircleImage } from 'components/basics/images';
import { FarIcon } from 'components/vendors/fa-wrapper';
import { capitalize } from 'utils/transforms';
import { isEmpty, logger, randomString } from 'utils/helpers';

const TagsContainer = (props) => {
  const { className = '', children } = props;

  return (
    <div className={'tags-container ' + className}>
      {children && children}
    </div>
  )
}

const Tag = (props) => {
  const { photo, title, className ='', onClick, children } = props;

  return (
    <div className={'tag ' + className}>
      {title && <TagBody photo={photo} title={title} />}
      {onClick && <TagAction onClick={onClick}/>}
      {children && children}
    </div>
  )
}

const TagBody = (props) => {
  const { photo, title, line1, className = '', onClick } = props;

  return (
    <div className={'tag-body ' + className}>
      {photo && <CircleImage src={photo} className='tag-img'/>}
      <div className='tag-details'>
        {title && <h6 className='title'>{title}</h6>}
        {line1 && <h6>{line1}</h6>}
      </div>
    </div>
  )
}


const TagAction = (props) => {
  const { onClick, className = '', children } = props;

  return (
    <div className={'tag-action ' + className}>
      <ButtonText size='xxs' variant='gray' onClick={onClick}>
        <FarIcon icon='times' size='2x' />
      </ButtonText>
    </div>
  )
}

export {
  TagsContainer,
	Tag,
  TagBody,
  TagAction
}
