<template>
  <div class="register container">
    <form @submit.prevent="handleFormSubmission" class="shadow pl-4 pr-4 pt-5 pb-5">
      <div class="form-group">
        <label for="exampleInputEmail1">Username</label>
        <input class="form-control" :class="[emailValidityClass]" v-model.trim="form.email.value" type="text" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
        <div class="invalid-feedback">
          <p>{{ emailError }}</p>
        </div>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input v-model.trim="form.password.value" type="password" :class="[passwordValidityClass]" class="form-control" id="exampleInputPassword1" placeholder="Password">
        <div class="invalid-feedback">
          <p>{{ passwordError }}</p>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>

import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import formValidations from '../utils/formValidations.js';

export default {
  setup() {

    const router = useRouter();
    const store = useStore();

    const email = ref('admin');
    const emailError = ref('');
    const password = ref('ewqqweqwewq');
    const passwordError = ref('');

    const emailValidity = ref(null)
    const passwordValidity = ref(null)

    let emailValidityClass = computed(() => {
      if (emailValidity.value === null){
        return;
      } else {
        return emailValidity.value == true ? 'is-valid' : 'is-invalid';
      }
    })

    let passwordValidityClass = computed(() => {
      if (passwordValidity.value === null){
        return;
      } else {
        return passwordValidity.value == true ? 'is-valid' : 'is-invalid';
      }
    })

    const handleFormSubmission = async () => {
      const formEmail = formValidations.validateEmail(email.value)
      if(!formEmail.valid){
        emailValidity.value = false;
        emailError.value = formEmail.error;
      } else {
        emailValidity.value = true;
      }

      const formPassword = formValidations.validatePassword(password.value)
    
      if(!formPassword.valid){
        passwordValidity.value = false;
        passwordError.value = formPassword.error;
      } else {
        passwordValidity.value = true;
      }

      // if(formEmail.valid && formPassword.valid) {   
        const payload = {
          username: email.value,
          password: password.value
        }
        await store.dispatch('login', payload)

        router.push({
          name: 'home'
        })

    }

    return {
      handleFormSubmission: handleFormSubmission,
      emailValidityClass: emailValidityClass,
      passwordValidityClass: passwordValidityClass,
      emailError: emailError,
      passwordError: passwordError,
      form: {
        email: email,
        password: password
      }
    }
  }
}
</script>