<template>
  <div class="register container">
    <h2 class="mb-4">Register</h2>
    <form @submit.prevent="handleFormSubmission" class="shadow pl-4 pr-4 pt-5 pb-5">
      <div class="form-group">
        <label for="username">Username</label>
        <input v-model="form.username.value" :class="[usernameValidityClass]" @change="handleUsernameCheck" type="text" class="form-control" id="username" placeholder="Username">
        <div class="invalid-feedback">
          <p>{{ usernameError }}</p>
        </div>
      </div>
      <div class="form-group">
        <label for="passwowrd_one">Password</label>
        <input v-model="form.password.value" :class="[passwordValidityClass]" type="password" class="form-control" id="password_one" placeholder="Password">
      </div>
      <div class="form-group">
        <label for="password_two">Password</label>
        <input v-model="form.passwordConfirm.value" :class="[passwordValidityClass]" type="password" class="form-control" id="password_two" placeholder="Password Confirm">
        <div class="invalid-feedback">
          <p>Paswords are not matching</p>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
      <p class="mt-4 mb-0">Already have an account?             
        <router-link :to="{ name: 'login' }">Login</router-link> instead!
      </p>
    </form>
  </div>
</template>

<script>

import { ref, computed } from 'vue';
import { useStore } from 'vuex';

import { useRouter } from 'vue-router';
// Utility functions for validating inputs
export default {
  setup() {
    
    const store = useStore();
    const router = useRouter();

    const username = ref('');
    const usernameError = ref('');
    const usernameValidity = ref(null)

    const password = ref('');
    const passwordConfirm = ref('');
    const passwordValidity = ref(null)
    const passwordsMatch = ref(false)
    const formValidity = ref(false)

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
     * @description Check if passwords match
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
     * @name handleUsernameCheck
     * @description Check if username exists in DB
     * 
    */
    const handleUsernameCheck = async () => {
      if(username.value === ''){
        usernameValidity.value = false;
        formValidity.value = false;
        usernameError.value = 'Username is required';
      } else {
        try {
          await store.dispatch('checkUsernameAvailability', {username: username.value})
          usernameValidity.value = true;
          formValidity.value = true;
        } catch(e){
          usernameValidity.value = false;
          formValidity.value = false;
          usernameError.value = 'Username taken';
        }
      }
    }

    const handleFormSubmission = async () => {

      if(password.value !== passwordConfirm.value){
        passwordsMatch.value = false;
        formValidity.value = true;
        passwordValidity.value = false;
      } else {
        passwordsMatch.value = true;
      }

      if(usernameValidity.value !== true) {
        handleUsernameCheck()
      }

      if(usernameValidity.value === true && passwordsMatch.value === true){
        formValidity.value = true;
      } else {
        formValidity.value = false;
      }

       
      const payload = {
        username: username.value,
        password: password.value
      }
      if(formValidity.value) {
        try {
          await store.dispatch('register', payload)
          router.push({
            name: 'home'
          })
        } catch(e){
          console.log(e)
        }
      }
    }

    return {
      handleFormSubmission: handleFormSubmission,
      handleUsernameCheck: handleUsernameCheck,
      usernameValidityClass: usernameValidityClass,
      passwordValidityClass: passwordValidityClass,
      usernameError: usernameError,
      form: {
        username: username,
        password: password,
        passwordConfirm: passwordConfirm
      }
    }
  }
}
</script>