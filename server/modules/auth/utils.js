/**
 * Valida o email
 * @param {string} email email em questão
 */
export function validateEmail (email) {
  var re = new RegExp([
    '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|',
    '(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|',
    '(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
  ].join(''))
  return re.test(email)
}

/**
 * Altera o objeto errors adicionando mensagem a propriedade email
 * @param {object} user
 * @param {object} errors
 * @param {boolean} isFormValid
 */
export function emailFormValidate (user, errors, isFormValid) {
  console.log('emailFormValidate()')
  if (user.email.length === 0) {
    console.error('ERRO GRAVE: Email vazio')
    errors.email = 'Erro no formulário. Preencha corretamente.'
    return false
  }

  if (!validateEmail(user.email)) {
    console.error('ERRO GRAVE: Email não validado')
    errors.email = 'Erro no formulário. Preencha corretamente.'
    return false
  }

  return true
}

/**
 * Altera o objeto errors adicionando mensagem a propriedade email
 * @param {object} payload
 * @param {object} errors
 * @param {boolean} isFormValid
 */
export function passwordFormValidate (body, errors, isFormValid) {
  console.log('passwordFormValidate()')
  if (body.password.length < 8) {
    console.error('ERRO GRAVE: A senha deve ter pelo menos 8 dígitos.')
    // isFormValid = false
    errors.password = 'Erro no formulário. Preencha corretamente.'
    return false
  }

  if (!validatePassword(body.password)) {
    console.error('ERRO GRAVE: Senha não validada')
    // isFormValid = false
    errors.password = 'Erro no formulário. Preencha corretamente.'
    return false
  }

  return true
}

/**
 * Valida o password
 * @param {string} password senha em questão
 */
function validatePassword (password) {
  var re = /\s/
  return !re.test(password)
}
