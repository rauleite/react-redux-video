import './Header.scss'

import { IndexLink, Link } from 'react-router'

import Navbar from '../Navbar'
import React from 'react'

export const Header = () => (

  <div>
    <Navbar />
    <h1>React Redux Starter Kit</h1>
    <IndexLink to='/' activeClassName='route--active'>
      Home
    </IndexLink>
    {' · '}
    <Link to='/counter' activeClassName='route--active'>
      Counter
    </Link>
    {' · '}
    <Link to='/dashboard' activeClassName='route--active'>
      Dashboard
    </Link>
    {' · '}
    <Link to='/login' activeClassName='route--active'>
      Login
    </Link>
    {' · '}
    <Link to='/signup' activeClassName='route--active'>
      Signup
    </Link>
  </div>
)

export default Header
