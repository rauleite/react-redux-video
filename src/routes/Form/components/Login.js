import { Card, CardText, CardTitle } from 'material-ui/Card'
import React, { PropTypes } from 'react'

import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

const Login = ({
  onSubmit,
  onChange,
  errors,
  styles,
  button,
  successMessage,
  user
}) => (
  <Card >
    <form action='/' onSubmit={onSubmit}>
      {console.log('styles,infoMessage', styles.infoMessage)}
      <CardTitle title='Entre' subtitle='Faça seu login e bom proveito' />
      { successMessage ? <p className={styles.infoMessage}>{ successMessage }</p> : '' }
      { errors.summary && <p className='error-message'>{ errors.summary }</p> }

      <TextField
        floatingLabelText='Email'
        tabIndex='1'
        autoFocus
        name='email'
        errorText={errors.email}
        onChange={onChange}
        value={user.email}
        floatingLabelShrinkStyle={styles.email}
        errorStyle={styles.email}
      />
      <br />
      <TextField
        floatingLabelText='Senha'
        tabIndex='2'
        type='password'
        name='password'
        onChange={onChange}
        errorText={errors.password}
        value={user.password}
        floatingLabelShrinkStyle={styles.password}
        errorStyle={styles.password}
      />
      <br />
      <br />
      <RaisedButton type='submit' label={button.label ? button.label : 'ENTRAR'}
        primary disabled={button.disabled} />
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
  errors: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  button: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
}

export default Login
