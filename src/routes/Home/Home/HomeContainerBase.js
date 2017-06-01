import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { 
  onChangeLogin,
  onSubmitLogin
} from "../LoginHome/loginHomeActions"
import {
  onChangeSignup,
  onSubmitSignup
} from "../SignupHome/signupHomeActions"

const mapDispatchToProps = {
  onChangeLogin,
  onSubmitLogin,
  onChangeSignup,
  onSubmitSignup
}

/**
 * @param {Object} state Contem todos os estados
 * @return {Object} Propriedades relacionado ao Home
*/
const mapStateToProps = ({home}) => {
  console.log(
    'home',
    home.toJS()
  )
  console.log(
    'home.loginHome',
    home.getIn(['loginHome', 'user'])
  )

  // console.log('home.signup', home.signup.toJS())
  // console.log('ownProps', ownProps)
  return {
    // user: home.getIn(['loginHome', 'user']),
    // styles: home.get('styles'),
    // button: home.get('button'),
    // errors: home.get('errors'),

    login: home.getIn(['home', 'login']),
    signup: home.getIn(['home', 'signup']),

    // user: home.get('user'),
    // styles: home.get('styles'),
    // button: home.get('button'),
    // errors: home.get('errors')
  }
  // successMessage: home.get('successMessage'),
  // captcha: home.get('captcha')
}

export default connect(mapStateToProps, mapDispatchToProps)
