<template>
  <navigation></navigation>
  <router-view/>
</template>


<script>
import Navigation from '@/components/header/Navigation.vue';
import { useStore } from 'vuex'

export default {
  setup(){
    const store = useStore();
    store.dispatch('tryLogin')
  },
  components: {
    Navigation,
  
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  background-color: #f0f0f0;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

form {
    background: #fff;
    max-width: 480px;
    margin: auto;
    border-radius: 10px;

    button {
      width: 100%;
      margin-top: 20px;
    }
}

</style>
