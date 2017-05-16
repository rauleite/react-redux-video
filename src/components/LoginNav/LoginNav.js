import React, { PropTypes } from 'react'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import LoginContainerBase from '../../routes/Form/containers/LoginContainerBase'
import FacebookEnter from '../Buttons/Facebook/FacebookEnter'
import '../../styles/icons/scss/material-design-iconic-font.scss'

const textStyle = {
  width: '140px',
  fontSize: 'small',
  marginLeft: '1px',
}

const LoginNav = ({
  onSubmit,
  onChange,
  errors,
  styles,
  button,
  user
}) => {
  return (
    <form action='/' onSubmit={onSubmit}>
      <TextField
        hintText='Email'
        tabIndex='1'
        name='email'
        style={textStyle}
        onChange={onChange}
        value={user.get('email')}
        floatingLabelShrinkStyle={styles.get('email')}
        errorStyle={styles.get('email')}
      />
      &nbsp;
      {/*errorText={errors.get('password')}*/}
      {/*floatingLabelText={<i className='zmdi zmdi-key zmdi-hc-lg'></i>}*/}
      <TextField
        hintText='Senha'
        tabIndex='2'
        style={textStyle}
        type='password'
        name='password'
        onChange={onChange}
        value={user.get('password')}
        floatingLabelShrinkStyle={styles.get('password')}
        errorStyle={styles.get('password')}
      />
      &nbsp;
      {/*icon={<i className="zmdi zmdi-key zmdi-hc-1x"></i>}*/}
      <FlatButton
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

      &nbsp;
      <span className='hidden-down-sm'>
        <FacebookEnter >login</FacebookEnter>
      </span>
      <span className='hidden-up-md'>
        <FacebookEnter />
      </span>
      

    </form>
  )
}
/*(
)*/

LoginNav.propTypes = {
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

// export default LoginNav
export default LoginContainerBase(LoginNav)
