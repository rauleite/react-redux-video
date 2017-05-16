// import Signup from '../../routes/Form/components/Signup'
// import SignupHomeContainer from '../../containers/SignupHomeContainer'
import SignupHomeContainer from './SignupHomeContainer'
import { Card, CardText, CardTitle } from 'material-ui/Card'
import React, { PropTypes } from 'react'
import FacebookEnter from '../../components/Buttons/Facebook/FacebookEnter'

import '../../styles/icons/scss/material-design-iconic-font.scss'

import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

const SignupHome = ({
  onSubmit,
  onChange,
  errors,
  styles,
  button,
  successMessage,
  userSignupHome
}) => (
  <Card>
    <form action='/' onSubmit={onSubmit}>
      {/*<CardTitle
        subtitle='Faça seu cadastro e tenha acesso a conteúdo gratuito'
      />*/}
      <div>
        <br />
        <FacebookEnter >cadastre-se</FacebookEnter>
        <br />&nbsp;
        <hr className='hr-text' data-content='Ou' />
        <TextField
          floatingLabelText={<i className='zmdi zmdi-account zmdi-hc-lg'></i>}
          hintText='Nome'
          tabIndex='3'
          name='nameSignupHome'
          autoFocus
          onChange={onChange}

          value={userSignupHome.get('name')}
          errorText={errors.get('name')}
          floatingLabelShrinkStyle={styles.get('name')}
          errorStyle={styles.get('name')}
          />
      </div>
      <div>
        <TextField
          floatingLabelText={<i className='zmdi zmdi-email zmdi-hc-lg'></i>}
          hintText='Email'
          tabIndex='4'
          name='emailSignupHome'
          onChange={onChange}

          value={userSignupHome.get('email')}
          errorText={errors.get('email')}
          floatingLabelShrinkStyle={styles.get('email')}
          errorStyle={styles.get('email')}
          />
      </div>
      <div>
        <TextField
          floatingLabelText={<i className='zmdi zmdi-key zmdi-hc-lg'></i>}
          hintText='Senha'
          tabIndex='5'
          type='password'
          name='passwordSignupHome'
          onChange={onChange}

          value={userSignupHome.get('password')}
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
      </div>
    </form>
    <br />&nbsp;
  </Card>
)

SignupHome.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  button: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  userSignupHome: PropTypes.object.isRequired,
}

// export default SignupHome

export default SignupHomeContainer(SignupHome)
