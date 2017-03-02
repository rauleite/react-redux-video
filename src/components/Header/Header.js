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
  </div>
)

export default Header
