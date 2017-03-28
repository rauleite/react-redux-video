import { Card, CardText, CardTitle } from 'material-ui/Card'
import React, { PropTypes } from 'react'

import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

const Signup = ({ onSubmit, onChange, errors, user, successMessage }) => (
  <Card>
    <form action='/' onSubmit={onSubmit}>
      <CardTitle
        title='Cadastre-se'
        subtitle='Tenha acesso a muito conteúdo [significativo] gratuitamente'
      />
      {errors.summary && <p className='error-message'> {errors.summary} </p>}
      <div>
        <TextField
          floatingLabelText='Nome'
          name='name'
          autoFocus
          errorText={errors.name}
          onChange={onChange}
          value={user.name}
          />
      </div>
      <div>
        <TextField
          floatingLabelText='Email'
          name='email'
          errorText={errors.email}
          onChange={onChange}
          value={user.email}
          />
      </div>
      <div>
        <TextField
          floatingLabelText='Senha'
          type='password'
          name='password'
          onChange={onChange}
          errorText={errors.password}
          value={user.password}
          />
      </div>
      <p />
      <br />
      <div>
        <RaisedButton type='submit' label='CRIAR NOVA CONTA' primary />
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
  user: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired
}

export default Signup
