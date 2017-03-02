import React from 'react'
import Login from '../components/Login'
import { connect } from 'react-redux'
import { changeUser, processForm } from '../modules/loginActions'

// const storedMessage = localStorage.getItem('successMessage')
// let successMessage = ''

// if (storedMessage) {
//   successMessage = storedMessage
//   localStorage.removeItem('successMessage')
// }

const mapDispatchToProps = {
  onSubmit: processForm,
  onChange: changeUser
}

/**
 * @param {Object} state Contem todos os estados
 * @param {Object} ownProps Todas propriedades
 * @return {Object} Propriedades relacionado ao Login
*/
const mapStateToProps = ({ login }, ownProps) => ({
  // stateName: 'login',
  errors: login.errors,
  successMessage: login.successMessage,
  user: login.user
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
