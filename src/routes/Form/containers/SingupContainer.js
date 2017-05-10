import Signup from '../components/Signup'
import { connect } from 'react-redux'
import { processForm, changeUser } from '../modules/signupActions'

const mapDispatchToProps = {
  onSubmit: processForm,
  onChange: changeUser
}

const mapStateToProps = ({ signup }) => ({
    errors: signup.get('errors'),
    successMessage: signup.get('successMessage'),
    user: signup.get('user'),
    styles: signup.get('styles'),
    button: signup.get('button')
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
