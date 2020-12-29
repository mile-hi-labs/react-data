import React from 'react';
import { Container, Row, Col } from 'components/basics/grids';

const AdminMain = (props) => {
  const { title, className = '', children } = props;

  return (
    <main className={'admin-main ' + className}>
      {children}
    </main>
  )
}

const AuthMain = (props) => {
  const { className = '', children } = props;

  return (
    <main className={'auth-main ' + className}>
      {children}
    </main>
  )
}

const MktMain = (props) => {
	const { className = '', children } = props;

	return (
    <main className={'mkt-main ' + className}>
      {children}
    </main>
	)
}

const SplashMain = (props) => {
  const { className = '', children } = props;

  return (
    <main className={'splash-main ' + className}>
      {children}
    </main>
  )
}

export {
	AdminMain,
  AuthMain,
  MktMain,
  SplashMain
}
