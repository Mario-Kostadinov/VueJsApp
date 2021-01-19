<template>
  <navigation></navigation>
  <router-view/>
  <main-footer></main-footer>
</template>


<script>
import Navigation from '@/components/header/Navigation.vue';
import MainFooter from '@/components/footer/MainFooter.vue';

export default {
  components: {
    Navigation,
    MainFooter
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
</style>
