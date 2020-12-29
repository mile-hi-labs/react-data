import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import RbTable from 'react-bootstrap/Table';
import { ButtonWrapper } from 'components/basics/buttons';
import { FarIcon } from 'components/vendors/fa-wrapper';
import { logger } from 'utils/helpers';
import { capitalize } from 'utils/transforms';

const Table = (props) => {
  const { size = 'sm', variant, responsive, className = '', children } = props;

  return (
    <RbTable size={size} responsive={true} className={'index ' + className}>
      {children}
    </RbTable>
  )
}

const TableHeader = (props) => {
  const { className = '', children } = props;

  return (
    <thead className={className}>
      {children}
    </thead>
  )
}

const TableHeaderRow = (props) => {
  const { className = '', children } = props;

  return (
    <tr className={className}>
      {children}
    </tr>
  )
}

const TableHead = (props) => {
  const { title, onClick, className = '', children } = props;

  return (
    <th className={className}>
      <ButtonWrapper>{title}</ButtonWrapper>
    </th>
  )
}

const TableHeadSort = (props) => {
  const { title, value, sortProp, sortValue, sortData, className = '', children } = props;
  const direction = (value == sortProp && sortValue == 'asc') ? 'desc' : 'asc';

  return (
    <th className={className}>
      <ButtonWrapper className={value == sortProp && 'active'} onClick={() => sortData(value, direction)}>
        {capitalize(title)}
        {(value == sortProp && sortValue == 'asc') && <FarIcon icon='sort-up' className='ml-2'/>}
        {(value == sortProp && sortValue == 'desc') && <FarIcon icon='sort-down' className='ml-2'/>}
        {(value != sortProp) && <FarIcon icon='sort' className='ml-2'/>}
      </ButtonWrapper>
    </th>
  )
}


const TableBody = (props) => {
  const { className = '', children } = props;

  return (
    <tbody className={className}>
      {children}
    </tbody>
  )
}

const TableRow = (props) => {
  const { className = '', children } = props;

  return (
    <tr className={className}>
      {children}
    </tr>
  )
}

const TableLink = (props) => {
  const { value, to, className = '', children } = props;

  return (
    <td className={className}>
      <Link to={to}>{value ? value : children}</Link>
    </td>
  )
}

const TableData = (props) => {
  const { value, className = '', children } = props;

  return (
    <td className={className}>
      {value ? value : children}
    </td>
  )
}



export { Table, TableHeader, TableHeaderRow, TableHead, TableHeadSort, TableBody, TableRow, TableLink, TableData }

// Docs:
// https://react-bootstrap.github.io/components/table/
