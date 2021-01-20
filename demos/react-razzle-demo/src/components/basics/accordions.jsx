import React from 'react';
import { ButtonText } from 'components/basics/buttons';
import RBAccordion from 'react-bootstrap/Accordion';
import { FarIcon } from 'components/vendors/fa-wrapper';

const Accordion = (props) => {
	const { id, variant, className = '', children } = props;

	return (
		<RBAccordion variant={variant} defaultActiveKey={id} className={className}>
			{children}
		</RBAccordion>
	)
}

const AccordionToggle = (props) => {
	const { id, title, onClick, className = '', children } = props;

	return (
		<div className='accordion-toggle'>
      <h6 className='title'>{title}</h6>
			<RBAccordion.Toggle as={ButtonText} size='xs' variant='gray' eventKey={id} onClick={onClick} className={className}>
				<FarIcon icon='plus' size='2x' />
			</RBAccordion.Toggle>
		</div>
	)
}

const AccordionCollapse = (props) => {
	const { id, className = '', children } = props;

	return (
		<RBAccordion.Collapse eventKey={id} className={className}>
			<div className='accordion-collapse'>
				<p>{children}</p>
			</div>
		</RBAccordion.Collapse>
	)
}

export { Accordion, AccordionToggle, AccordionCollapse };

// Docs:
// https://react-bootstrap.github.io/components/accordion/
