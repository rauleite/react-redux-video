import React, { PropTypes } from 'react'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Card } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import LoginContainerBase from '../../routes/Form/containers/LoginContainerBase'
import FacebookEnter from '../Buttons/Facebook/FacebookEnter'
import '../../styles/icons/scss/material-design-iconic-font.scss'

const LoginHome = ({
  onSubmit,
  onChange,
  errors,
  styles,
  button,
  user
}) => {
  return (
    <Card>
      <form action='/' onSubmit={onSubmit}>
        <br />
        <FacebookEnter >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;login &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</FacebookEnter>
        <br />&nbsp;
        <hr className='hr-text' data-content='Ou' />

        <TextField
          hintText='Email'
          tabIndex='1'
          name='email'
          onChange={onChange}
          value={user.get('email')}
          floatingLabelShrinkStyle={styles.get('email')}
          errorStyle={styles.get('email')}
        />

        <p />

        {/*errorText={errors.get('password')}*/}
        {/*floatingLabelText={<i className='zmdi zmdi-key zmdi-hc-lg'></i>}*/}
        <TextField
          hintText='Senha'
          tabIndex='2'
          type='password'
          name='password'
          onChange={onChange}
          value={user.get('password')}
          floatingLabelShrinkStyle={styles.get('password')}
          errorStyle={styles.get('password')}
        />
        
        <p />&nbsp;
      
        {/*icon={<i className="zmdi zmdi-key zmdi-hc-1x"></i>}*/}
        <RaisedButton
          type='submit'
          style= {
            {
              lineHeight: '0px',
              minWidth: '0px'
            }
          }
          label='Log In'
          primary={!button.get('disabled')}
          disabled={button.get('disabled')} />
      </form>
      <br />&nbsp;
    </Card>
  )
}
/*(
)*/

LoginHome.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  // onChangeCaptcha: PropTypes.func.isRequired,
  // errors: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  button: PropTypes.object.isRequired,
  // successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
  // captcha: PropTypes.object.isRequired
}

// export default LoginHome
export default LoginContainerBase(LoginHome)
