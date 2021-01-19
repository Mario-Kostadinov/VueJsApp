<template>
  <div class="mb-5">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <router-link :to="{ name: 'home' }" class="navbar-brand">VueCourses</router-link> 
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link :to="{ name: 'home' }" class="nav-link">Home</router-link> 
            </li>        
            <li v-if="isAdmin" class="nav-item">
              <router-link :to="{ name: 'view-all-courses' }" class="nav-link">Courses</router-link> 
            </li>
          </ul>
          <div v-if="currentUser === null">
            <router-link :to="{ name: 'login' }" class="mr-3">Login</router-link> 
            <router-link :to="{ name: 'register' }">Register</router-link> 
          </div>
          <div v-else class="d-flex align-items-center justify-content-center">
            <span class="welcome--username">Welcome, {{ currentUser.username }}</span>
            <button class="btn" style="color: #fff" @click="handleLogout">Logout</button> 
          </div>
        </div>
      </div>
    </nav>
    <div v-if="flashMessage !== null" :class="'alert-'+flashMessage.type" class="alert alert-dismissible fade show" role="alert">
      {{ flashMessage.message }}
    <button type="button" @click="removeFlashMessage" class="close" data-dismiss="alert" aria-label="Close">
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

    const removeFlashMessage = () => {
        store.commit('removeFlashMessage')
      }

    return {
      currentUser: computed(() => store.getters.getCurrentUser),
      flashMessage: computed(() => store.getters.flashMessage),
      isAdmin: computed(() => store.getters.isAdmin),
      removeFlashMessage: removeFlashMessage,
      handleLogout: handleLogout
    }
  }
}
</script>

<style scoped lang="scss">

  .navbar-dark .navbar-nav .nav-link {
    color: #fff;
  }   
  .navbar {
    a {
      color: #fff;
      transition: all 250ms;
    }
  }
  .router-link-active {
    color: #ffaf10 !important;
  }

  .welcome--username {
    color: #fff;
    margin-right: 10px;
  }

  .navbar-brand {
    color: #fff !important;
  }

</style>