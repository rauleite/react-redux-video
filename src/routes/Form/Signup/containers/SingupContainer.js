import React from 'react'
import Signup from '../components/Signup'
import { connect } from 'react-redux'
import { processForm, changeUser } from '../modules/signupActions'

const mapDispatchToProps = {
  onSubmit: processForm,
  onChange: changeUser
}

const mapStateToProps = ({ signup }) => ({
  errors: signup.errors,
  user: signup.user
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
