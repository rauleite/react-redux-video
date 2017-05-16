import './HomeView.scss'

import SignupHome from '../../../components/SignupHome'
import LoginHome from '../../../components/LoginHome'
import { Card } from 'material-ui/Card'

import React from 'react'

export const HomeView = () => (
  <div className='container-fluid'>

    <div className='row'>

      <div className='hidden-xs col-sm-5 col-md-6 col-lg-7' >
        <div className='box'>
          {/*{children}*/}
        </div>
      </div>

      <div className='col-xs-12 col-sm-7 col-md-6 col-lg-5 center-xs' >
        <div className='box'>
          <div className='hidden-up-sm' >
            <LoginHome />
            &nbsp;
          </div>
          <SignupHome />
        </div>
      </div>

    </div>
  </div>
)

export default HomeView
