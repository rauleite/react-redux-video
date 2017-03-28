import { Card, CardText, CardTitle } from 'material-ui/Card'
import React, { PropTypes } from 'react'

import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

const Reset = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  success,
  user,
  styles,
  button
}) => (
  <Card >
    <form action='/' onSubmit={onSubmit}>
      { successMessage && <p className='success-message'>{ successMessage }</p> }
      { /* IF show or not */ }
      { !success && !errors.errorForm ?
        <div>
          <br />
          <p className='error-message'>{ errors.summary }</p>
          <CardText>
            <Link to='/forgot'>Tente novamente</Link>
          </CardText>
        </div>
        :
        <div>
          <CardTitle title='Altere' subtitle='Digite uma nova senha.' />
          { errors.summary && <p className='error-message'>{ errors.summary }</p> }
          <TextField
            autoFocus
            floatingLabelText='Senha'
            type='password'
            name='password'
            onChange={onChange}
            errorText={errors.password}
            floatingLabelShrinkStyle={styles.password}
            errorStyle={styles.password}
          />
          <br />
          <TextField
            floatingLabelText='Confirme a Senha'
            type='password'
            name='confirmePassword'
            onChange={onChange}
            errorText={errors.confirmePassword}
            floatingLabelShrinkStyle={styles.confirmePassword}
            errorStyle={styles.confirmePassword}
          />
          <br />
          <br />
          <RaisedButton type='submit' label='ALTERAR' primary disabled={button.disabled} />
          <br />
          <br />
        </div>
      }{/* END IF show or not */}
      <br />
    </form>
  </Card>
)

Reset.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  styles: PropTypes.object.isRequired,
  success: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  button: PropTypes.object.isRequired
}

export default Reset
