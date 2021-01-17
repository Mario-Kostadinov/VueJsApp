<template>
  <div class="course-listing">
    <div class="container">
      <div class="row">
        <div class="col-4" v-for="course in courses" :key="course.id">
          <course-item 
            :title="course.title"
            :description="course.description"
            :image-url="course.imageUrl"
            :slug="course.slug"
          ></course-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { reactive } from 'vue';
import CourseItem from '@/components/course/CourseItem.vue';

export default {
  setup(){
    const courses = reactive([
      {
        id: 1,
        title: 'Firstt Course',
        description: 'First Desc',
        imageUrl: "https://images.unsplash.com/photo-1585076641399-5c06d1b3365f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        slug: '/course/slug1'
      },
      {
        id: 2,
        title: 'Second Course',
        description: 'Second Desc',
        imageUrl: "https://images.unsplash.com/photo-1585076641399-5c06d1b3365f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        slug: '/course/slug2'
     },
      {
        id: 3,
        title: 'Third Course',
        description: 'Third Desc',
        imageUrl: "https://images.unsplash.com/photo-1585076641399-5c06d1b3365f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        slug: '/course/slug3'
      }
    ])

    return {
      courses: courses
    }
  },
  components: {
    CourseItem
  }
}
</script>