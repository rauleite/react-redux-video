import { Card, CardText, CardTitle } from 'material-ui/Card'
import React, { PropTypes } from 'react'

import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

const Signup = ({
  onSubmit,
  onChange,
  errors,
  styles,
  button,
  successMessage,
  user
}) => (
  <Card>
    <form action='/' onSubmit={onSubmit}>
      <CardTitle
        title='Cadastre-se'
        subtitle='Tenha acesso a muito conteúdo [significativo] gratuitamente'
      />
      {errors.summary && <p className='error-message'> {errors.summary} </p>}
      <div>
        <TextField
          tabIndex='1'
          floatingLabelText='Nome'
          name='name'
          autoFocus
          onChange={onChange}

          value={user.get('name')}
          errorText={errors.get('name')}
          floatingLabelShrinkStyle={styles.get('name')}
          errorStyle={styles.get('name')}
          />
      </div>
      <div>
        <TextField
          tabIndex='2'
          floatingLabelText='Email'
          name='email'
          onChange={onChange}

          value={user.get('email')}
          errorText={errors.get('email')}
          floatingLabelShrinkStyle={styles.get('email')}
          errorStyle={styles.get('email')}
          />
      </div>
      <div>
        <TextField
          tabIndex='3'
          floatingLabelText='Senha'
          type='password'
          name='password'
          onChange={onChange}

          value={user.get('password')}
          errorText={errors.get('password')}
          floatingLabelShrinkStyle={styles.get('password')}
          errorStyle={styles.get('password')}
          />
      </div>
      <p />
      <br />
      <div>

        <RaisedButton type='submit' label={button.get('label') ? button.get('label') : 'ENTRAR'}
        primary disabled={button.get('disabled')} />

        {/*<RaisedButton type='submit' label='CRIAR NOVA CONTA' primary />*/}
      </div>
      <CardText>
        Já possui uma conta?
        <Link to={'/login'}> Logue-se
        </Link>
      </CardText>
    </form>
  </Card>
)

Signup.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  button: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
}

export default Signup
