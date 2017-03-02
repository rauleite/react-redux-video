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
  const linksNoAuth = [
    '/login',
    '/signup?param1=oi&param2=hello',
    '/forgot'
  ]

  const labelLinksNoAuth = [
    'login',
    'cadastre-se',
    'forgot'
  ]

  if (Auth.isUserAuthenticated()) {
    return (
      <li key={'logout'}>
        <Link to='/logout'> sair
        </Link>
      </li>)
  } else {
    return map(linksNoAuth, (value, index) => {
      return (
        <li key={index}>
          <Link to={value}>
            {labelLinksNoAuth[index]}
          </Link>
        </li>)
    })
  }
}

export default Navbar
