import React, { useEffect, useState } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Container, Row, Col } from 'components/basics/grids';
import { capitalize } from 'utils/transforms';
import { logger } from 'utils/helpers';

const AdminHeader = (props) => {
  const { title, subtitle, className } = props;

  return (
    <Jumbotron className={className}>
      <Container fluid>
        <h1>{title}</h1>
        <h4>{subtitle}</h4>
      </Container>
    </Jumbotron>
  )
}

const MktHeader = (props) => {
	const { title, subtitle, className } = props;

	return (
  	<Jumbotron className={className}>
  		<Container fluid>
    		<h1>{title}</h1>
    		<h4>{subtitle}</h4>
    	</Container>
    </Jumbotron>
	)
}

export { AdminHeader, MktHeader }
