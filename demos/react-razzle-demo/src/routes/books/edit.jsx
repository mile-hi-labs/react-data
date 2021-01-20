import React, { useEffect, useState } from 'react';
import BookForm from 'components/book/book-form';
import { BtnLink } from 'components/basics/links';
import { MktRoute } from 'components/basics/routes';
import { Container, Row, Col } from 'components/basics/grids';
import { SectionBlock, SectionHeader, SectionBody, SectionFooter } from 'components/basics/sections';
import { timeout } from 'utils/helpers';

const BooksEditRoute = (props) => {
	const { bookId, store = {}, toast, history } = props;
	const [ book, setBook ] = useState({});
	const [ loading, setLoading ] = useState(false);


	// Hooks
	useEffect(() => {
		fetchData();
		return () => console.log('rollback changes...');
	}, [])


	// Methods
	const fetchData = async () => {
		try {
			setLoading(true);
			let model = await store.queryRecord('book', bookId, { include: 'authors' })
			toast.showSuccess('Book received!');
			setBook(model);
		} catch (e) {
			toast.showError(e)
		} finally {
			setLoading(false);
		}
	}


	return (
		<MktRoute title='Library - Edit Book'>
			<Container className='pt-3 pb-3'>

				<SectionBlock>
					<BookForm
						title='Edit Book'
						book={book}
						nextAction={() => history.push(`/books/${book.id}`)}
					/>
				</SectionBlock>

			</Container>
		</MktRoute>
	);
}

export default BooksEditRoute;
