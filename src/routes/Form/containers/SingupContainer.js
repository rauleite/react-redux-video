import Signup from '../components/Signup'
import { connect } from 'react-redux'
import { processForm, changeUser } from '../modules/signupActions'

const mapDispatchToProps = {
  onSubmit: processForm,
  onChange: changeUser
}

const mapStateToProps = ({ signup }) => ({
  errors: signup.get('errors'),
  user: signup.get('user'),
  successMessage: signup.get('successMessage')
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)