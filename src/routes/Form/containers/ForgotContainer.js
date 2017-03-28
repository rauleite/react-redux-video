import Forgot from '../components/Forgot'
import { connect } from 'react-redux'
import { changeUser, processForm } from '../modules/forgotActions'

const mapDispatchToProps = {
  onSubmit: processForm,
  onChange: changeUser
}

/**
 * @param {Object} state Contem todos os estados
 * @param {Object} ownProps Todas propriedades
 * @return {Object} Propriedades relacionado ao Forgot
*/
const mapStateToProps = ({ forgot }, ownProps) => ({
  errors: forgot.get('errors'),
  successMessage: forgot.get('successMessage'),
  user: forgot.get('user'),
  styles: forgot.get('styles'),
  button: forgot.get('button')
})

export default connect(mapStateToProps, mapDispatchToProps)(Forgot)
