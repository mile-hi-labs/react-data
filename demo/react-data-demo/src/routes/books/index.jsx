import React, { useEffect, useState } from 'react';
import BookList from 'components/book/book-list';
import { MktRoute } from 'components/basics/routes';
import { Container, Row, Col } from 'components/basics/grids';
import { SectionBlock, SectionHeader, SectionBody, SectionFooter } from 'components/basics/sections';
import { timeout } from 'utils/helpers';

const BooksRoute = (props) => {
	const { store = {}, toast, history } = props;
	const [ books, setBooks ] = useState([]);
	const [ page, setPage ] = useState(0);
	const [ pageSize, setPageSize ] = useState(20);
	const [ sortProp, setSortProp ] = useState('id');
	const [ sortValue, setSortValue ] = useState('asc');
	const [ loading, setLoading ] = useState(false);


	// Hooks
	useEffect(() => {
		fetchData();
	}, [])


	// Methods
	const fetchData = async () => {
		try {
			setLoading(true);
			let model = await store.query('book', params())
			toast.showSuccess('Books fetched!');
			setBooks(model);
		} catch (e) {
			toast.showError(e)
		} finally {
			setLoading(false);
		}
	}

	const params = () => {
		let params = {};
		if (pageSize) params.pageSize = pageSize;
		if (sortProp) params.sortProp = sortProp;
		if (sortValue) params.sortValue = sortValue;
		params.page = page;
		params.include = 'authors,categories,publishers';
		return params;
	}

	return (
		<MktRoute title='Library - Books'>
			<Container className='pt-3 pb-3'>

				<SectionBlock>
					<SectionHeader title='Books' />
					<SectionBody>
						<BookList books={books} loading={loading} />
					</SectionBody>
					<SectionFooter>
					</SectionFooter>
				</SectionBlock>

			</Container>
		</MktRoute>
	);
}

export default BooksRoute;
