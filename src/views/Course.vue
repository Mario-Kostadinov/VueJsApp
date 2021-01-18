<template>
  <div class="course-detail container">
    <div v-if="loading != true" class="row">
      <div class="col-7">
        <h2>{{ courseData.title }}</h2>
        <img :src="courseData.imageUrl" style="width: 100%" />
      </div>
      <div class="col-5">
        <div class="course-enroll">
          <div v-if="isEnrolled">
            <span class="course-enroll__enrolled">Enrolled</span>
          </div>
          <div v-else>
            <button @click="enrollUser" class="btn btn-primary course-enroll__enroll">Enroll</button>
          </div>
          
        </div>
      </div>
    </div>
    <div v-else>
      Loading
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
export default {
  props: ['id'],
  setup(props){

    const courseData = ref({})
    const loading = ref(true)
    // const userId = ref(3)
   
    // const isEnrolled = computed(()=>{
    //   return courseData.value.enrolledUsers.indexOf(userId) === -1 ? false : true
    // })
    const isEnrolled = ref(false);

    const enrollUser = (userId) => {

      enrollUserIntoCourse(2, 1)
      console.log(userId)
      console.log('Enrolling User')
      console.log(userId)
      isEnrolled.value = true;
      return true
    }

    const enrollUserIntoCourse = (courseId, userId) => {
      let api = `/api/courses/${courseId}/enroll`
      fetch(api, {
        method: "POST",
        body: JSON.stringify({user_id: userId})
      })
        .then((res) => {
          var response = JSON.parse(res._bodyText)
          courseData.value = response.course;
      })
    }

    const fetchCourse = () => {
      let api = '/api/courses/2'
      fetch(api)
        .then((res) => {
          var response = JSON.parse(res._bodyText)
          loading.value = false;
          courseData.value = response.course;
      })
    }

    onMounted(() => {
      console.log('mounted')
      fetchCourse(props.id)
    
    })
    return {
      courseData,
      loading,
      isEnrolled,
      enrollUser,
    }
  }

}
</script>

<style scoped lang="scss">
  .course-enroll {
    &__enrolled {
      background-color: rgb(16, 190, 16);
      color: #fff;
      padding: 10px;
      border-radius: 5px;
    }
  }
</style>