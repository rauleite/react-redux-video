import Login from '../components/Login'
import { connect } from 'react-redux'
import { changeUser, processForm } from '../modules/loginActions'

const mapDispatchToProps = {
  onSubmit: processForm,
  onChange: changeUser
}

/**
 * @param {Object} state Contem todos os estados
 * @param {Object} ownProps Todas propriedades
 * @return {Object} Propriedades relacionado ao Login
*/
const mapStateToProps = ({ login }, ownProps) => {
  return {
    // props: login
    errors: login.get('errors'),
    successMessage: login.get('successMessage'),
    user: login.get('user'),
    styles: login.get('styles'),
    button: login.get('button')
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
