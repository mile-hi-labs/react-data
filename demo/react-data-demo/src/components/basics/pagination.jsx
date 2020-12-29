import React, { useState } from 'react';
import RbPagination from 'react-bootstrap/Pagination'
import { logger } from 'utils/helpers';

const Pagination = (props) => {
  const { meta = {}, setPage, className = '', children } = props;
  const page = meta.page;
  const pageSize = meta.pageSize;
  const totalRecords = meta.totalRecords;
  const totalPages = Math.floor(totalRecords / pageSize);

  const pages = () => {
    let pages = [];
    while (pages.length < totalPages) {
      pages.push(pages.length + 1);
    }
    return pages;
  }

  return (
    <RbPagination className={className}>
      <PaginationFirst
        item={1}
        disabled={(page == 0) || !totalPages > 1}
        onClick={() => setPage(0)}
      />
      <PaginationPrev
        item={page - 1}
        disabled={page == 0}
        onClick={() => setPage(page - 1)}
      />
      {pages().map(p => (
        <PaginationItem
          key={p}
          item={p}
          active={p == page + 1}
          onClick={() => setPage(p - 1)}
        />
      ))}
      <PaginationNext
        item={page + 1}
        disabled={page == totalPages}
        onClick={() => setPage(page + 1)}
      />
      <PaginationLast
        item={pages}
        disabled={(page == totalPages) || (!totalPages > 1)}
        onClick={() => setPage(totalPages)}
      />
    </RbPagination>
  )
}

const PaginationFirst = (props) => {
  const { item, disabled, className = '', onClick } = props;

  return <RbPagination.First className={className} disabled={disabled} onClick={onClick} />
}

const PaginationPrev = (props) => {
  const { item, disabled, className = '', onClick } = props;

  return <RbPagination.Prev className={className} disabled={disabled} onClick={onClick} />
}


const PaginationItem = (props) => {
  const { item, active, className = '', onClick } = props;

  return (
    <RbPagination.Item active={active} className={className} onClick={onClick}>
      {item}
    </RbPagination.Item>
  )
}

const PaginationNext = (props) => {
  const { item, disabled, className = '', onClick } = props;

  return <RbPagination.Next className={className} disabled={disabled} onClick={onClick}/>
}

const PaginationLast = (props) => {
  const { item, disabled, className = '', onClick } = props;

  return <RbPagination.Last className={className} disabled={disabled} onClick={onClick}/>
}


export { Pagination, PaginationFirst, PaginationPrev, PaginationItem, PaginationNext, PaginationLast }

// Docs:
// https://react-bootstrap.github.io/components/pagination/
