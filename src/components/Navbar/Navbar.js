import { IndexLink, Link } from 'react-router'
import LoginNav from '../LoginNav'
import { isUrl } from '../../utils/url'

import './Navbar.scss'
import '../../styles/core.scss'

import Menu from '../Menu'

import { map } from 'lodash'

import Auth from '../../modules/Auth'
import React from 'react'

const Navbar = () => (
  <nav className='navbar'>
    <div className='container-fluid'>
      <div className='row'>

        <div className='col-xs-2'>
          <div className='box'>
            <IndexLink to='/'>
              M.m
            </IndexLink>
          </div>

        </div>

        <div className='col-xs-6 col-xs-10 col-md-10 col-lg-10'>
          <div className='box hidden-xs'>
            <ul className='nav nav-right'>
              {showLoginNav()}
            </ul>
          </div>
          <div className='box show-xs nav-right'>
            <ul className='nav nav-right'>
              <Menu links={linksLabel()} />
            </ul>
          </div>
        </div>

      </div>
    </div>
  </nav>
)

function showLoginNav() {
  if (isUrl('/')) {
    return <LoginNav />
  }
}

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

/**
 * Cria os links do lado direito do Navbar
 * @returns elementoHtml
 */
function links () {
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

/**
 * Cria os links do lado direito do Navbar
 * @returns elementoHtml
 */
function linksLabel () {
  if (Auth.isUserAuthenticated()) {
    return map(linksShowAuth, (value, index) => {
      return (
        // <li key={index}>
          <Link to={value}>
            {labelNotShowAuth[index]}
          </Link>
        // </li>
      )
    })
  } else {
    return map(linksNotShowAuth, (value, index) => {
      return (
        // <li key={index}>
          <Link to={value}>
            {labelLinksNotShowAuth[index]}
          </Link>
        // </li>
      )
    })
  }
}

export default Navbar
