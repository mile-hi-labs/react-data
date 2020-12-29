import React, { Fragment } from 'react';
import { BookListCard } from 'components/book/book-card';
import { SectionEmpty } from 'components/basics/empties';
import { Row, Col } from 'components/basics/grids';
import { ListSkeleton, SearchSkeleton } from 'components/vendors/loading-skeleton-wrapper';

const BookList = (props) => {
	const { books = [], selectedID, selectedIDs, loading, onClick } = props;

	if (loading) {
		return <ListSkeleton count={3} />
	}
	if (books.length > 0) {
		return (
			<Row>
				{books.map(book => (
					<Col key={book.id} xs={12}>
						<BookListCard book={book}/>
					</Col>
				))}
			</Row>
		)
	}
	return (
		<SectionEmpty
			icon='info'
			title='Books'
			msg="Sorry, looks like there aren't any books yet."
		/>
	)
}

export default BookList;
