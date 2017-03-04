import React from 'react'
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
  // stateName: 'forgot',
  errors: forgot.errors,
  successMessage: forgot.successMessage,
  user: forgot.user
})

export default connect(mapStateToProps, mapDispatchToProps)(Forgot)
