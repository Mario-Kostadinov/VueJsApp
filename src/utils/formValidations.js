import { isEmail } from 'validator';

const validateUsername = username => {
  if (!username.length) {
    return { valid: false, error: 'Username is required.'}
  }

  return {
     valid: true, error: null 
  }
}
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
  validatePassword,
  validateUsername
}