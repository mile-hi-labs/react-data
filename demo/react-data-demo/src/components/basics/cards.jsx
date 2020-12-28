import React from 'react';
import RbCard from 'react-bootstrap/Card';

const Card = (props) => {
  const { className = '', children } = props;

  return (
    <RbCard className={className}>
      {children}
    </RbCard>
  )
}

const CardHeader = (props) => {
  const { className = '', children } = props;

  return (
    <div className={className + ' card-header'}>
      {children}
    </div>
  )
}

const CardImg = (props) => {
  const { src, className } = props;

  return <RbCard.Img className={className} src={src} />
}

const CardBody = (props) => {
  const { className = '', children } = props;

  return (
    <RbCard.Body className={className}>
      {children}
    </RbCard.Body>
  )
}

const CardTitle = (props) => {
  const { className = '', children } = props;

  return (
    <RbCard.Title className={className}>
      {children}
    </RbCard.Title>
  )
}

const CardText = (props) => {
  const { className = '', children } = props;

  return (
    <RbCard.Text className={className}>
      {children}
    </RbCard.Text>
  )
}


const CardFooter = (props) => {
  const { className = '', children } = props;

  return (
    <RbCard.Footer className={className}>
      {children}
    </RbCard.Footer>
  )
}

export { Card, CardHeader, CardImg, CardBody, CardTitle, CardText, CardFooter }

// Docs:
// https://react-bootstrap.github.io/components/cards/
