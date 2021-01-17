<template>
  <div>
    <form @submit.prevent="handleValidation">
    <input name="email" v-model="email" />
    <span>{{ emailError }}</span>

    <input name="password" v-model="password" type="password" />
    <span>{{ passwordError }}</span>
    <button>Submit</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import joi from 'joi';

export default {
  setup() {
    const email = ref('')
    const emailError = ref('')
    const password = ref('')
    const passwordError = ref('')

    const schema = joi.object({
        email: joi.string()
        .required('Required it is')
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: joi.string()
        .required()
    }).and("email", "password");

    const handleValidation = () => {

      const { error, value } = schema.validate({ email: '',
      password: '' })
      // const { passwordErrorA, bvalue } = schema.validate({ password: password.value })
      console.log(error.details)
      console.log(value)
      // console.log(passwordErrorA)
      // console.log(bvalue)
      console.log('joi')
    }

    return {
      email,
      emailError,
      password,
      passwordError,
      handleValidation
    }
  }
};
</script>