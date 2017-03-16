import React, { PropTypes, PureComponent } from 'react'
import { Router, browserHistory } from 'react-router'
import Home from '../routes/Home'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

export default class AppContainer extends PureComponent {

  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  // componentWillMount () {
  // }

  // shouldComponentUpdate () {
  //   return true
  // }

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
