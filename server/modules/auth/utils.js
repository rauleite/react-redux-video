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
 * @param {object} payload
 * @param {object} errors
 * @param {boolean} isFormValid
 */
export function emailFormValidate (payload, errors, isFormValid) {
  console.log('emailFormValidate')
  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    console.log('Forneça um email válido, por favor.')
    isFormValid = false
    errors.email = 'Forneça um email válido, por favor.'
  }

  if (!validateEmail(payload.email)) {
    console.log('Formato do email inválido.')
    isFormValid = false
    errors.email = 'Formato do email inválido.'
  }

  return isFormValid
}

/**
 * Altera o objeto errors adicionando mensagem a propriedade email
 * @param {object} payload
 * @param {object} errors
 * @param {boolean} isFormValid
 */
export function passwordFormValidate (payload, errors, isFormValid) {
  console.log('passwordFormValidate')
  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    console.log('Forneça um password válido, por favor.')
    isFormValid = false
    errors.email = 'Forneça um password válido, por favor.'
  }

  if (payload.password.length < 8) {
    console.log('A senha deve ter pelo menos 8 dígitos.')
    isFormValid = false
    errors.password = 'A senha deve ter pelo menos 8 dígitos.'
  }

  return isFormValid
}
