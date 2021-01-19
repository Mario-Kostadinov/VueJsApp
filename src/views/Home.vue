<template>
  <div class="home">
    <h2 class='mb-5'>View Courses!</h2>
    <CourseListing />
  </div>
</template>

<script>
// @ is an alias to /src
import CourseListing from '@/components/course/CourseListing.vue'

import { onUnmounted } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Home',
  setup() {
    const store = useStore();

    onUnmounted(() => {
      store.commit('removeCourseListing')
    })
  },
  components: {
    CourseListing
  }
}
</script>
