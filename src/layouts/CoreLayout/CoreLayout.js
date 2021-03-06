import './CoreLayout.scss'
import '../../styles/core.scss'
// import '../../../node_modules/flexboxgrid/dist/flexboxgrid.css'

import Header from '../../components/Header'
import React from 'react'
import Footer from './../../components/Footer'

export const CoreLayout = ({ children }) => (
  <div>
    <Header />
    {children}
    <Footer />
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout

{/*
<div className='col-xs-12 hidden-xs' >
  <div className='box'>
    xs-hidden
  </div>
</div>
<div className='col-xs-12 hidden-sm' >
  <div className='box'>
    sm-hidden
  </div>
</div>
<div className='col-xs-12 hidden-md' >
  <div className='box'>
    md-hidden
  </div>
</div>
<div className='col-xs-12 hidden-lg' >
  <div className='box'>
    lg-hidden
  </div>
</div>

// SHOW -------------

<div className='col-xs-12 show-xs' >
  <div className='box'>
    col-xs-show
  </div>
</div>

<div className='col-xs-12 show-sm' >
  <div className='box'>
    col-sm-show
  </div>
</div>

<div className='col-xs-12 show-md' >
  <div className='box'>
    col-md-show
  </div>
</div>

<div className='col-xs-12 show-lg' >
  <div className='box'>
    col-lg-show
  </div>
</div>

*/}
