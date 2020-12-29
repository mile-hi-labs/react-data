import React, { useEffect } from 'react';
import { ButtonText } from 'components/basics/buttons';
import { Image, CircleImage } from 'components/basics/images';
import { FarIcon } from 'components/vendors/fa-wrapper';
import { capitalize } from 'utils/transforms';
import { isEmpty, logger } from 'utils/helpers';


const Avatar = (props) => {
  const { photo, title, line1, size = 'xs', onClick, className = '', children } = props;

  return (
    <div className={'avatar-block ' + className}>
      <AvatarImage photo={photo} size={size} />
      <div className='avatar-details'>
        {title && <h6 className='title'>{title}</h6>}
        {line1 && <h6>{line1}</h6>}
      </div>
      {children}
    </div>
  )
}

const AvatarImage = (props) => {
  const { photo, size, children } = props;

  return photo ? <Image src={photo} className={'avatar-img ' + size}/> : <div className={'avatar-img ' + size}/>
}

export { Avatar, AvatarImage }
