import { Card, CardText, CardTitle } from 'material-ui/Card'
import React, { PropTypes } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Facebook from '../../Facebook/components/Facebook'

// function onChange (value) {
//   console.log("Captcha value:", value)
// }

const Login = ({
  onSubmit,
  onChange,
  onChangeCaptcha,
  errors,
  styles,
  button,
  successMessage,
  user,
  captcha
}) => (
  <Card >
    <Facebook />
    <form action='/' onSubmit={onSubmit}>
      <CardTitle title='Entre' subtitle='Faça seu login e bom proveito' />
      { successMessage ? <p className={styles.get('infoMessage')}>{ successMessage }</p> : '' }
      { errors.get('summary') && <p className='error-message'>{ errors.get('summary') }</p> }

      <TextField
        floatingLabelText='Email'
        tabIndex='1'
        autoFocus
        name='email'
        errorText={errors.get('email')}
        onChange={onChange}
        value={user.get('email')}
        floatingLabelShrinkStyle={styles.get('email')}
        errorStyle={styles.get('email')}
      />
      <br />
      <TextField
        floatingLabelText='Senha'
        tabIndex='2'
        type='password'
        name='password'
        onChange={onChange}
        errorText={errors.get('password')}
        value={user.get('password')}
        floatingLabelShrinkStyle={styles.get('password')}
        errorStyle={styles.get('password')}
      />
      <br />
      <br />

      { hasRenderCaptcha(captcha.get('hasCaptchaComponent'), onChangeCaptcha, onChange) }

      <RaisedButton type='submit' label={button.get('label') ? button.get('label') : 'ENTRAR'}
        primary disabled={button.get('disabled')} />
      <CardText>
        <Link to='/forgot'>Ou esqueceu a senha?</Link>
      </CardText>
      <CardText>
        Não possui uma conta?<Link to={'/signup'}> Crie uma</Link>.
      </CardText>
    </form>
  </Card>
)

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeCaptcha: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  button: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  captcha: PropTypes.object.isRequired
}

function hasRenderCaptcha (hasRender, onChangeCaptcha, onChange) {
  console.log('hasRender ---', hasRender)
  if (hasRender) {
    return (
      <center>
        <ReCAPTCHA
          ref={onChangeCaptcha}
          sitekey='6LcBpRoUAAAAABxVZrn9Qv7YwNsZaF9Vip7LNLDH'
          onChange={onChange}
          theme='dark'
        />
        <br />
      </center>
    )
  }
}

export default Login
