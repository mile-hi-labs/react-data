import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { withStore } from '@mile-hi-labs/react-data';
import { withToast } from 'contexts/toast-context';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'components/basics/dropdowns';
import { FarIcon } from 'components/vendors/fa-wrapper';
import { isEmpty, timeout, logger } from 'utils/helpers';

const BookActions = (props) => {
	const { book = {}, history, store, toast, table = false, refreshData } = props;
	const [ dropOpen, setDropOpen ] = useState(false);
	const [ taskRunning, setTaskRunning ] = useState(false);


	// Methods
	const archiveContact = async () => {
		try {
			setDropOpen(!dropOpen);
			setTaskRunning(true);
			await contact.destroy();
			toast.showSuccess('Book destroyed!');
			table ? refreshData() : history.push('/books');
		} catch (e) {
			toast.showError(e);
		} finally {
			setTaskRunning(false);
		}
	}


	// Render
	return (
		<Dropdown open={dropOpen} toggle={() => setDropOpen(!dropOpen)}>
			{table ? (
		   	<DropdownToggle size='xs' variant='text-gray' taskRunning={taskRunning} onClick={() => setDropOpen(!dropOpen)}>
      		<FarIcon icon='chevron-down' className='ml-2'/>
	    	</DropdownToggle>
			) : (
		   	<DropdownToggle size='sm' variant='secondary' taskRunning={taskRunning} onClick={() => setDropOpen(!dropOpen)}>
	      	Actions<FarIcon icon='chevron-down' className='ml-2'/>
		    </DropdownToggle>
	    )}

    	<DropdownMenu open={dropOpen} toggle={() => setDropOpen(!dropOpen)}>
    		{table && <DropdownItem title='View' onClick={() => history.push(`${book.url}`)}/>}
    		<DropdownItem title='Edit' onClick={() => history.push(`${book.url}/edit`)}/>
    		<DropdownItem title='Archive' onClick={() => archiveContact()}/>
    	</DropdownMenu>
    </Dropdown>
	)
}

export default withStore(withToast(withRouter(BookActions)));
