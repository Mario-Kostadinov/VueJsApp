<template>
  <div class="appContainer">
    <div class="container mt-5">
      <hr>
      <h1 class="text-center">Testing Layout</h1>
    </div>
    <Contacts />
    <Course />
  </div>
</template>

<script>

import Contacts from '@/components/testing/Contacts.vue'
import Course from '@/components/testing/Course.vue'


export default {
  data() {
    return {
    }
  },
  components: {
    Contacts,
    Course
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.appContainer {
  background-color: black;
  height: 100vh;
  color: #fff;
}
</style>