<template>
  <div class="course-listing">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-6 col-lg-4 mb-4" v-for="course in courses" :key="course.id"> 
        <course-item 
          :title="course.title" 
          :id="course.id"
          :description="course.description"
          :image-url="course.imageUrl"
          ></course-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { computed, onMounted } from 'vue';
import CourseItem from '@/components/course/CourseItem.vue';
import { useStore } from 'vuex';


export default {
  setup(){

    const store = useStore()

    onMounted(() =>{
      store.dispatch('fetchCourses')
    })

    return {
      courses: computed(() => {
        console.log('Computed in all courses')
        return store.getters.getAllCourses
      })
    }
  },
  components: {
    CourseItem
  }
}
</script>

<style scoped lang="scss">
  .course-listing {

  }

</style>