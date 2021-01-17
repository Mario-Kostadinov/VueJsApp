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
  props: ['slug'],
  setup(props){

    const courseData = ref({})
    const loading = ref(true)
    // const userId = ref(3)
   
    // const isEnrolled = computed(()=>{
    //   return courseData.value.enrolledUsers.indexOf(userId) === -1 ? false : true
    // })
    const isEnrolled = ref(false);

    const enrollUser = (userId) => {
      console.log(userId)
      console.log('Enrolling User')
      console.log(userId)
      isEnrolled.value = true;
      return true
    }

    const fetchCourse = courseSlug => {
      console.log('Fetching course: ', courseSlug)
      setTimeout(()=>{
        courseData.value = {
          title: 'Demo Title 1',
          imageUrl: "https://images.unsplash.com/photo-1585076641399-5c06d1b3365f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          enrolledUsers: [1,2]
        }
        loading.value = false;
      },1000)

    }

    onMounted(() => {
      console.log('mounted')
      fetchCourse(props.slug)
      
    })
    return {
      courseData,
      loading,
      isEnrolled,
      enrollUser
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