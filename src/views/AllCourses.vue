<template>
  <div class="container">
    <div class="all-courses">
      <h1 class="mb-5">View All Courses</h1>
      <div> <router-link :to="{ name: 'course-add' }" class="btn btn-primary mr-3 mb-4">Create Course</router-link> </div>

      <div class="view-all-courses">
        <table class="table course">
          <tbody>
            <tr v-for="course in courses" :key="course.id">
              <th class="course__title" scope="row">{{ course.title }}</th>
              <td class="course__buttons">
                <router-link :to="'/course/'+course.id+'/edit'" class="btn btn-primary mr-3">Edit</router-link>
                <router-link :to="'/course/'+course.id+'/lecture'" class="btn btn-warning mr-3">Add Lectures</router-link></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';


export default {
  setup(){

    const store = useStore()

    onMounted(() =>{
      store.dispatch('fetchCourses')
    })

    return {
      courses: computed(() => {
        return store.getters.getAllCoursesUnfiltered
      })
    }
  }
}
</script>

<style scoped lang="scss">

  .all-courses {
    background-color: #fff;
    border-radius: 10px;
    padding: 50px 40px;
  }

  .courses-item {
    border: 1px solid black;
    border-top: none;
  }

  .course {
    &__title {
      text-align: left;
    }
    &__buttons {
      text-align: right;
    }
  }
</style>