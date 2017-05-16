// import SignupHome from '../components/SignupHome'
// import SignupContainerBase from '../routes/Form/containers/SignupContainerBase'
import { connect } from 'react-redux'

import { processForm, changeUser } from './signupHomeActions'

const mapDispatchToProps = {
  onSubmit: processForm,
  onChange: changeUser
}

const mapStateToProps = ({ signup }) => ({
  errors: signup.get('errors'),
  successMessage: signup.get('successMessage'),
  styles: signup.get('styles'),
  button: signup.get('button'),
  userSignupHome: signup.get('userSignupHome')
})

export default connect(mapStateToProps, mapDispatchToProps)
