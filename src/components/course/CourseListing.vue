<template>
  <div class="course-listing">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-6 col-lg-4 mb-4" v-for="course in courses" :key="course.id"> 
        <course-item 
          :title="course.title" 
          :id="course.id"
          :description="course.description"
          :image-url="course.imageUrl == '' ? 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png' : course.imageUrl"
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
        return store.getters.getAllCourses
      })
    }
  },
  components: {
    CourseItem
  }
}
</script>

