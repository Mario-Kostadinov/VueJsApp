<template>
  <div class="register container">
    <h2 class="mb-4">Login</h2>
    <form @submit.prevent="handleFormSubmission" class="shadow pl-4 pr-4 pt-5 pb-5">
      <div class="form-group">
        <label for="username">Username</label>
        <input class="form-control" :class="[usernameValidityClass]" @change="handleUsernameCheck" v-model.trim="form.username.value" type="text" id="username" aria-describedby="emailHelp" placeholder="Username">
        <div class="invalid-feedback">
          <p>{{ usernameError }}</p>
        </div>
      </div>
      <div class="form-group">
        <label for="pasword">Password</label>
        <input v-model.trim="form.password.value" type="password" :class="[passwordValidityClass]" class="form-control" id="pasword" placeholder="Password">
        <div class="invalid-feedback">
          <p>{{ passwordError }}</p>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
      <p class="mt-4 mb-0">Don't have an account?           
        <router-link :to="{ name: 'register' }">Sign up</router-link>!
      </p>
    </form>

  </div>
</template>

<script>

import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

// Utility functions for validating inputs
import formValidations from '../utils/formValidations.js';

export default {
  setup() {

    const router = useRouter();
    const store = useStore();

    const username = ref('');
    const usernameError = ref('');

    const password = ref('');
    const passwordError = ref('');

    const usernameValidity = ref(null)
    const passwordValidity = ref(null)

    /**
     * @function
     * @name invalidateForm
     * @description On failed authentication show errors
     * 
     */
    const invalidateForm = () => {
      username.value = '';
      password.value = '';
      usernameValidity.value = false;
      passwordValidity.value = false;
    }

    /**
     * @function
     * @name usernameValidityClass
     * @description Based on username validity ref return css class
     * 
     * @return CSS class for validity
     */
    const usernameValidityClass = computed(() => {
      if (usernameValidity.value === null){
        return;
      } else {
        return usernameValidity.value == true ? 'is-valid' : 'is-invalid';
      }
    })

    /**
     * @function
     * @name passwordValidityClass
     * @description Based on password validity ref return css class
     * 
     * @return CSS class for validity
     */
    const passwordValidityClass = computed(() => {
      if (passwordValidity.value === null){
        return;
      } else {
        return passwordValidity.value == true ? 'is-valid' : 'is-invalid';
      }
    })

    /**
     * @function
     * @name handleFormSubmission
     * @description Validate form and submit it.
     * 
     * @return Validity Errors or Logged in User
     * @note UX could be improved here
     */
    const handleFormSubmission = async () => {
      const formUsername = formValidations.validateUsername(username.value)
      if(!formUsername.valid){
        usernameValidity.value = false;
        usernameError.value = formUsername.error;
      } else {
        usernameValidity.value = true;
      }

      const formPassword = formValidations.validatePassword(password.value)
    
      if(!formPassword.valid){
        passwordValidity.value = false;
        passwordError.value = formPassword.error;
      } else {
        passwordValidity.value = true;
      }

      if(formUsername.valid && formPassword.valid) {   
        const payload = {
          username: username.value,
          password: password.value
        }
        try {
          await store.dispatch('login', payload);
          router.push({
            name: 'home'
          })
        } catch(e) {
          invalidateForm()
        }
      }

    }

    return {
      handleFormSubmission: handleFormSubmission,
      usernameValidityClass: usernameValidityClass,
      passwordValidityClass: passwordValidityClass,
      usernameError: usernameError,
      passwordError: passwordError,
      form: {
        username: username,
        password: password
      }
    }
  }
}
</script>