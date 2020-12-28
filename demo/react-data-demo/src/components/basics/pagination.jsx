import React, { useState } from 'react';
import RbPagination from 'react-bootstrap/Pagination'
import { logger } from 'utils/helpers';

const Pagination = (props) => {
  const { meta = {}, className = '', onClick, children } = props;
  const page = meta.page + 1;
  const pageSize = meta.pageSize;
  const totalRecords = meta.totalRecords;
  const totalPages = Math.ceil(totalRecords / pageSize);

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
        disabled={!totalPages > 1} 
        onClick={() => onClick(0)}
      />
      <PaginationPrev 
        item={page - 1} 
        disabled={!page > 1} 
        onClick={() => onClick(page >= 2 ? page - 2 : 0)}
      />
      {pages().map(p => (
        <PaginationItem 
          key={p} 
          item={p} 
          active={p == page} 
          onClick={() => onClick(p - 1)}
        />
      ))}
      <PaginationNext 
        item={page + 1} 
        disabled={page == totalPages} 
        onClick={() => onClick(page)}
      />
      <PaginationLast 
        item={pages} 
        disabled={!totalPages > 1} 
        onClick={() => onClick(pages.length)}
      />
    </RbPagination>
  )
}

const PaginationFirst = (props) => {
  const { item, disabled, className = '', onClick } = props;

  return <RbPagination.First className={className} onClick={() => !disabled && onClick(item)} />
}

const PaginationPrev = (props) => {
  const { item, disabled, className = '', onClick } = props;

  return <RbPagination.Prev className={className} onClick={() => !disabled && onClick(item)} />
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

  return <RbPagination.Next className={className} onClick={() => !disabled && onClick(item)}/>
}

const PaginationLast = (props) => {
  const { item, disabled, className = '', onClick } = props;

  return <RbPagination.Last className={className} onClick={() => !disabled && onClick(item)} disabled={disabled}/>
}


export { Pagination, PaginationFirst, PaginationPrev, PaginationItem, PaginationNext, PaginationLast }

// Docs:
// https://react-bootstrap.github.io/components/pagination/
