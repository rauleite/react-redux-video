import { Card, CardText, CardTitle } from 'material-ui/Card'
import React, { PropTypes } from 'react'

import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

const Forgot = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user
}) => (
  <Card >
    <form action='/' onSubmit={onSubmit}>
      <CardTitle title='Esqueceu sua Senha?' subtitle='Então coloque seu email e resete-a' />
      { successMessage && <p className='success-message'>{ successMessage }</p> }
      { errors.summary && <p className='error-message'>{ errors.summary }</p> }

      <TextField
        floatingLabelText='Email'
        name='email'
        autoFocus
        errorText={errors.email}
        onChange={onChange}
        value={user.email}
      />
      <br />
      <br />
      <RaisedButton type='submit' label='ENTRAR' primary />
      <CardText>
        <Link to='/forgot'>Ou esqueceu a senha?</Link>
      </CardText>
      <CardText>
        Não possui uma conta?<Link to={'/signup'}> Crie uma</Link>.
      </CardText>
    </form>
  </Card>
)

Forgot.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
}

export default Forgot
