import React from 'react'
import { Link } from 'react-router'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import SignupHome from '../SignupHome'
import '../../styles/icons/scss/material-design-iconic-font.scss'

export default class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
    this.links = props.links
  }

  handleToggle = () => this.setState({open: !this.state.open})

  handleClose = () => this.setState({open: false})

  render() {
    return (
      <div>
        <FlatButton
          icon={<i className='zmdi zmdi-menu'></i>}
          onTouchTap={this.handleToggle}
        />

        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})} >
          { itens(this.links) }
        </Drawer>
      </div>
    );
  }
}

function itens (links) {
  let arr = []
  links.forEach((item, index) => {
    arr.push(<MenuItem key={index} >{item}</MenuItem>)
  })
  return arr
}