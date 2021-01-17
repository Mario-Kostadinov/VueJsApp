import { isEmail } from 'validator';

const validateEmail = email => {
  if (!email.length) {
    return { valid: false, error: 'Email is required.'}
  }
  if (!isEmail(email)){
    return { valid: false, error: 'Email is not valid.'}
  }

  return {
     valid: true, error: null 
  }
}

const validatePassword = password => {
  if(!password.length){
    return { valid: false, error: 'Password is required.'}
  }
  console.log(password.length)
  if (password.length < 6){
    console.log('less than 6')
    return { valid: false, error: 'Password must be at least 6 characters'}
  }

  return {
      valid: true, error: null 
  }
}


export default {
  validateEmail,
  validatePassword
}