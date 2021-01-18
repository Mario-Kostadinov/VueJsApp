<template>
  <div class="course-detail container">
    <div v-if="loading != true" class="row">
      <div class="col-7">
        <h2>{{ courseData.title }}</h2>
        <img :src="courseData.imageUrl" style="width: 100%" />
      </div>
      <div class="col-5">
        <div>
          <h3>Course Description</h3>
          <p>{{ courseData.description }}</p>
        </div>
        <div class="course-enroll">
          <div v-if="isEnrolled">
            <span class="course-enroll__enrolled">Enrolled</span>
          </div>
          <div v-else>
            <button @click="handleEnrollButton" class="btn btn-primary course-enroll__enroll">Enroll</button>
          </div>          
        </div>
      </div>
    </div>
    <div v-else>
      Loading...
    </div>
    <div v-if="isEnrolled == true">
      <p>Course Lectures</p>
      <p v-for="lecture in courseLectures" :key="lecture.title">{{ lecture.title }}</p>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex';

export default {
  props: ['id'],
  setup(props){

    const store = useStore();
    const userId = computed(() => {
      return store.state.user.id;
    })

    const courseLectures = ref([])

    const courseData = ref({})
    const loading = ref(true)

    const isEnrolled = computed(() => {
      const enrolledUsersIntoCourse = courseData.value.enrolledUserIds;
      const userEnrolled = enrolledUsersIntoCourse && enrolledUsersIntoCourse.includes(userId.value.toString())
      if(userEnrolled === true) fetchLectures(props.id)
      return userEnrolled;
    });

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

    const fetchLectures = (courseId) => {
      let api = `/api/courses/${courseId}/lectures`;
      fetch(api)
        .then((res) => {
          var response = JSON.parse(res._bodyText)
          courseLectures.value = response.lectures
      })
    }

    const fetchCourse = (courseId) => {
      let api = `/api/courses/${courseId}`;
      fetch(api)
        .then((res) => {
          var response = JSON.parse(res._bodyText)
          loading.value = false;
          courseData.value = response.course;
      })
    }

    const handleEnrollButton = () => {
      const user_id = userId.value;
      const courseId = props.id;
      enrollUserIntoCourse(courseId, user_id)
    }

    onMounted(() => {
      fetchCourse(props.id)
    })

    return {
      courseData,
      loading,
      isEnrolled,
      handleEnrollButton,
      courseLectures
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