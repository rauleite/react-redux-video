import './CoreLayout.scss'
import '../../styles/core.scss'
import '../../../node_modules/flexboxgrid/dist/flexboxgrid.css'

import Header from '../../components/Header'
import React from 'react'

export const CoreLayout = ({ children }) => (
  <div>
    <Header />
    <div className='row center-lg'>
      <div className='col-md-6 col-lg-6'>
        <div className='box'>
          {children}
        </div>
      </div>
    </div>
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
