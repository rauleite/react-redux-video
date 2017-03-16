import Reset from '../components/Reset'
import { connect } from 'react-redux'
import { processForm, changeUser } from '../modules/resetActions'

const mapDispatchToProps = {
  onSubmit: processForm,
  onChange: changeUser
}

const mapStateToProps = ({ reset }) => ({
  errors: reset.get('errors'),
  user: reset.get('user'),
  successMessage: reset.get('successMessage'),
  success: reset.get('success'),
  token: reset.get('token')
})

export default connect(mapStateToProps, mapDispatchToProps)(Reset)
