<template>
  <div class="home">
    <h2 class='mb-5'>View Courses!</h2>
    <CourseListing />
  </div>
</template>

<script>
// @ is an alias to /src
import CourseListing from '@/components/course/CourseListing.vue'

export default {
  name: 'Home',
  components: {
    CourseListing
  }
}
</script>
