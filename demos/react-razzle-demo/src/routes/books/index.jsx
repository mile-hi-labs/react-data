import React, { useEffect, useState } from 'react';
import BookList from 'components/book/book-list';
import { LinkBtn } from 'components/basics/links';
import { MktRoute } from 'components/basics/routes';
import { Container, Row, Col } from 'components/basics/grids';
import { SectionBlock, SectionHeader, SectionBody, SectionFooter } from 'components/basics/sections';
import { Pagination } from 'components/basics/pagination';
import { isEmpty, logger, timeout, timer } from 'utils/helpers';

const BooksIndexRoute = (props) => {
	const { ssrData = [], store, toast, history } = props;
	const [ books, setBooks ] = useState([]);
	const [ page, setPage ] = useState(0);
	const [ pageSize, setPageSize ] = useState(20);
	const [ sortProp, setSortProp ] = useState('id');
	const [ sortValue, setSortValue ] = useState('asc');
	const [ loading, setLoading ] = useState(false);
	const model = !isEmpty(books) ? books : ssrData;


	// Hooks
	useEffect(() => {
		fetchData();
	}, [page, pageSize, sortProp, sortValue])


	// Methods
	const fetchData = async () => {
		try {
			setLoading(true);
			let start = new Date();
			let model = await store.$query('book', {
        page: page,
        pageSize: pageSize,
        sortProp: sortProp,
        sortValue: sortValue,
        include: 'authors,categories,publishers'
			})
			logger('Time elapsed: ', timer(start));
			setBooks(model);
		} catch (e) {
			toast.showError(e)
		} finally {
			setLoading(false);
		}
	}


  const sortData = (prop, value) => {
    setSortProp(prop);
    setSortValue(value);
  }


	return (
		<MktRoute title='Library - Books'>
			<Container className='pt-3 pb-3'>

				<SectionBlock>
					<SectionHeader title='Books' className='flex-between'>
						<LinkBtn to='books/new' className='btn-sm btn-primary'>Add New</LinkBtn>
					</SectionHeader>
					<SectionBody>
						<BookList books={model} loading={loading} />
					</SectionBody>
					<SectionFooter>
						<Pagination meta={model.meta} setPage={page => setPage(page)}/>
					</SectionFooter>
				</SectionBlock>

			</Container>
		</MktRoute>
	);
}

BooksIndexRoute.getInitialProps = async (store) => {
  try {
    return await store.$query('book', { include: 'authors,categories,publishers' });
  } catch (e) {
    console.log('Fetch Error: ', e);
  }
}



export default BooksIndexRoute;
