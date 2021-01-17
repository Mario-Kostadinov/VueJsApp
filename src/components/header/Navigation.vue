<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#">VueCourses</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link :to="{ name: 'home' }" class="nav-link">Home</router-link> 
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'course-add' }" class="nav-link">Add Course</router-link> 
          </li>
          <li class="nav-item">
              <router-link :to="{ name: 'testing' }" class="nav-link">Testing</router-link> 
          </li>
        </ul>

        <router-link  :to="{ name: 'register' }" class="mr-3">Login</router-link> 
        <router-link :to="{ name: 'login' }">Register</router-link> 

      </div>
    </div>
  </nav>


  <div id="nav">


  </div>
</template>

<script>

import { ref } from 'vue';



export default {
  setup(){
    const isLoggedIn = ref(true);

    return {
      user: {
        isLoggedIn: isLoggedIn
      }
    }
  }
}
</script>

<style scoped lang="scss">

  .router-link-active {
    color: orange !important;
  }

</style>