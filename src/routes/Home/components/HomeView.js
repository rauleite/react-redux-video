import './HomeView.scss'

import DuckImage from '../assets/Duck.jpg'
import React from 'react'

export const HomeView = () => (
  <div>
    <h4>Welcome! =</h4>
    <img
      alt='This is a duck, because Redux!'
      className='duck'
      src={DuckImage} />
  </div>
)

export default HomeView
