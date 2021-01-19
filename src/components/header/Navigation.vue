<template>
  <div class="mb-5">
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
                <router-link :to="{ name: 'testing' }" class="nav-link">Testing</router-link> 
            </li>
            
            <li v-if="isAdmin" class="nav-item">
              <router-link :to="{ name: 'course-add' }" class="nav-link">Add Course</router-link> 
            </li>
          </ul>
          <div v-if="currentUser === null">
            <router-link :to="{ name: 'login' }" class="mr-3">Login</router-link> 
            <router-link :to="{ name: 'register' }">Register</router-link> 
          </div>
          <div v-else>
            <span class="welcome--username">Welcome, {{ currentUser.username }}</span>
            <button class="btn" style="color: #fff" @click="handleLogout">Logout</button> 
          </div>
        </div>
      </div>
    </nav>
    <div v-if="flashMessage.message" :class="'alert-'+flashMessage.type" class="alert alert-dismissible fade show" role="alert">
      {{ flashMessage.message }}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
    </div>
  </div>
</template>

<script>

import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  setup(){
    
    const store = useStore();

    const handleLogout = () => {
      store.dispatch('logout')
    }

    return {
      currentUser: computed(() => store.getters.getCurrentUser),
      flashMessage: computed(() => store.getters.flashMessage),
      isAdmin: computed(() => store.getters.isAdmin),
      handleLogout: handleLogout
    }
  }
}
</script>

<style scoped lang="scss">

  .router-link-active {
    color: orange !important;
  }

  .welcome--username {
    color: #fff;
    margin-right: 10px;
  }

</style>