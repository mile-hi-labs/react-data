import React, { useEffect, useState } from 'react';
import AuthorList from 'components/author/author-list';
import CategoryList from 'components/category/category-list';
import PublisherList from 'components/publisher/publisher-list';
import { BookDetailCard }from 'components/book/book-card';
import { MktRoute } from 'components/basics/routes';
import { Container, Row, Col } from 'components/basics/grids';
import { SectionBlock, SectionHeader, SectionBody, SectionFooter } from 'components/basics/sections';
import { timeout } from 'utils/helpers';


const AuthorSection = (props) => {
	const { data = [], bookId, dataLoading } = props;
	const [ authors, setAuthors ] = useState([]);
	const [ loading, setLoading ] = useState(false);

	useEffect(() => {
		dataLoading && fetchData();
	}, [])

	const fetchData = async () => {
		try {
			setLoading(true);
			let model = await store.query('author', { bookId: bookId })
			setAuthors(model);
		} catch (e) {
			toast.showError(e)
		} finally {
			setLoading(false);
		}
	}

	return (
	<SectionBlock>
		<SectionHeader title='Authors' />
		<SectionBody>
			<AuthorList authors={book.authors} loading={loading} />
		</SectionBody>
	</SectionBlock>
	)
}

export default AuthorSection;
