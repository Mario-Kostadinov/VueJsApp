<template>
  <div class="register container">
    <form @submit.prevent="handleFormSubmission" class="shadow pl-4 pr-4 pt-5 pb-5">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input v-model="form.email.value" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input v-model="form.password.value" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword2">Password</label>
        <input v-model="form.passwordConfirm.value" type="password" class="form-control" id="exampleInputPassword2" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>

import { ref, onBeforeMount, onMounted } from 'vue';
import { useRouter } from 'vue-router';


export default {
  setup() {

    const router = useRouter();

    const email = ref('mario@gmai.com');
    const password = ref(null);
    const passwordConfirm = ref(null);

    const handleFormSubmission = () => {

      router.push({
        name: 'home'
      })

    }

    onBeforeMount(() => {
      console.log('Fetching data')
    })

    onMounted(() => {
      console.log('rendering')
    })




    return {
      handleFormSubmission: handleFormSubmission,
      form: {
        email: email,
        password: password,
        passwordConfirm: passwordConfirm
      }
    }
  }
}
</script>