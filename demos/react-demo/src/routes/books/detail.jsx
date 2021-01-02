import React, { useEffect, useState } from 'react';
import AuthorList from 'components/author/author-list';
import BookActions from 'components/book/book-actions';
import { BookDetailCard }from 'components/book/book-card';
import { MktRoute } from 'components/basics/routes';
import { Container, Row, Col } from 'components/basics/grids';
import { SectionBlock, SectionHeader, SectionBody, SectionFooter } from 'components/basics/sections';
import { timeout } from 'utils/helpers';

const BooksDetailRoute = (props) => {
	const { bookId, store, toast, history } = props;
	const [ book, setBook ] = useState({});
	const [ loading, setLoading ] = useState(false);


	// Hooks
	useEffect(() => {
		fetchData();
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
		<MktRoute title='Library - Book Detail'>
			<Container className='pt-3 pb-3'>

				<SectionBlock>
					<SectionHeader title={`Book #${bookId}`} className='flex-between no-b'>
						<BookActions book={book} />
					</SectionHeader>
				</SectionBlock>

				<Row>

					<Col xs={12} md={4}>
						<BookDetailCard book={book} loading={loading} />

						<SectionBlock>
							<SectionHeader title='Authors' />
							<SectionBody className='xs'>
								<AuthorList authors={book.authors} loading={loading} />
							</SectionBody>
						</SectionBlock>
					</Col>

					<Col xs={12} md={8}>
						<SectionBlock>
							<SectionHeader title='Description' />
							<SectionBody>
								<p>{book.description}</p>
							</SectionBody>
						</SectionBlock>

					</Col>

				</Row>

			</Container>
		</MktRoute>
	);
}

export default BooksDetailRoute;
