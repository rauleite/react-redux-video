import React, { Component, PropTypes } from 'react'
import { Router, browserHistory } from 'react-router'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import Auth from '../modules/Auth'
import { authXXX } from '../store/middleware'

class AppContainer extends Component {
  // componentWillMount() {
  // }
  constructor(props) {
    super(props)
    console.log('montoooooou')
    console.log('this.state', this.state)
    console.log('props.routes', props.routes)
    console.log('props.store', props.store)
    console.log('props.store.getState', props.store.getState())
    console.log('props', props)
    authXXX(props.store.getState(), this.store)

    const isUrlSignup = props.store.getState().location.pathname === '/signup'
    console.log('isUrlSignup', isUrlSignup)
    if (Auth.isUserAuthenticated()) {
      if (isUrlSignup) {
        props.store.dispatch({
          type: 'LOCATION_CHANGE',
          payload: '/'
        })
      }

    }
  }
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return true
  }

  render () {
    const { routes, store } = this.props

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Provider store={store}>
          <div style={{ height: '100%' }}>
            <Router history={browserHistory} children={routes} />
          </div>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default AppContainer
