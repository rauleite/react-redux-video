import './Navbar.scss'
import '../../styles/core.scss'

import { IndexLink, Link } from 'react-router'
import { map } from 'lodash'

import Auth from '../../modules/Auth'
import React from 'react'

const Navbar = () => (
  <nav className='navbar'>
    <div className='container-fluid'>
      <div className='row '>
        <div className='col-md-4'>
          <div className='box'>
            <IndexLink to='/'>
              Melhore.me
            </IndexLink>
          </div>
        </div>
        <div className='col-md-4'>
          <div className='box'>
            <span>&nbsp;</span>
          </div>
        </div>
        <div className='col-md-4'>
          <div className='box'>
            <ul className='nav nav-right'>
              {links()}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
)

/**
 * Cria os links do lado direito do Navbar
 * @returns elementoHtml
 */
function links () {
  const linksNotShowAuth = [
    '/login',
    '/signup',
    '/forgot',
    '/counter'
  ]

  const labelLinksNotShowAuth = [
    'login',
    'cadastre-se',
    'forgot',
    'counter'
  ]

  const linksShowAuth = [
    '/counter',
    '/dashboard',
    '/logout'
  ]

  const labelNotShowAuth = [
    'counter',
    'dashboard',
    'logout'
  ]

  if (Auth.isUserAuthenticated()) {
    return map(linksShowAuth, (value, index) => {
      return (
        <li key={index}>
          <Link to={value}>
            {labelNotShowAuth[index]}
          </Link>
        </li>)
    })
  } else {
    return map(linksNotShowAuth, (value, index) => {
      return (
        <li key={index}>
          <Link to={value}>
            {labelLinksNotShowAuth[index]}
          </Link>
        </li>)
    })
  }
}

export default Navbar
