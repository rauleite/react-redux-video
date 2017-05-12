import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import '../../styles/icons/scss/material-design-iconic-font.scss'
// import '../../styles/core.scss'

const styleButton = {
  // width: '50%'
  // margin: 12
  // padding: 10
}

const styleLabel = {
  paddingLeft: 20,
  paddingRight: 20,
  color: '#ffffff'
}

const styleIcon = {
  paddingRight: 5
}

export const FacebookButton = (props) => (
  <RaisedButton
    onClick={props.onClick}
    style={styleButton}
    backgroundColor='#3b5998'>
    <div style={styleLabel}>
      <i className='zmdi zmdi-facebook zmdi-hc-lg' style={styleIcon}></i>|<span style={styleIcon}></span>
      facebook
    </div>
  </RaisedButton>
)

export default FacebookButton
