<template>
  <div class="course-listing">
    <div class="container">
      <div class="row">
        <div class="col-4" v-for="course in courses" :key="course.id"> 
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

import { ref, onMounted } from 'vue';
import CourseItem from '@/components/course/CourseItem.vue';


export default {
  setup(){
    const courses = ref()

    const fetchCourse = () => {
      fetch("/api/courses")
        .then((res) => {
          var response = JSON.parse(res._bodyText)
          console.log(response.courses[0].id)
          courses.value = response.courses;
      })
    }

    onMounted(() =>{
      fetchCourse()
    })

    return {
      courses: courses
    }
  },
  components: {
    CourseItem
  }
}
</script>