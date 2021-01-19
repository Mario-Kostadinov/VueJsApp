<template>
  <div class="home">
    <h2 class='mb-3'>View Courses!</h2>

    <div class="search-container d-flex align-items-center mb-5">
      <input v-on:keypress.enter="handleSearch" type="text" class="form-control mr-3" v-model.trim="searchQuery" placeholder="Search Courses...">
      <button class="btn btn-primary" @click="handleSearch">Search</button>
    </div>

    <CourseListing />
  </div>
</template>

<script>
// @ is an alias to /src
import CourseListing from '@/components/course/CourseListing.vue'

import { ref, onUnmounted } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Home',
  setup() {
    const store = useStore();

    const searchQuery = ref('');
    const handleSearch = () => {
      const payload = {
        query: searchQuery.value.toLowerCase()
      }
      store.dispatch('searchAllCourses', payload)
    }

    onUnmounted(() => {
      store.commit('removeCourseListing')
    })
    return {
      searchQuery,
      handleSearch
    }
  },
  components: {
    CourseListing
  }
}
</script>

<style scoped lang="scss">

  .search-container {
    max-width: 400px;
    margin: auto;
  }

</style>
