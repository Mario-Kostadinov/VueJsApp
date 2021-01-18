<template>
  <div class="course-detail container">
    <div v-if="courseDetail !== null" class="row">
      <div class="col-7">
        <h2>{{ courseDetail.title }}</h2>
        <img :src="courseDetail.imageUrl" style="width: 100%" />
      </div>
      <div class="col-5">
        <div>
          <h3>Course Description</h3>
          <p>{{ courseDetail.description }}</p>
        </div>
        <div v-if="currentUser !== null" class="course-enroll d-flex justify-content-center">
          <div v-if="isUserEnrolled">
            <span class="course-enroll__enrolled">Enrolled</span>
          </div>
          <div v-else>
            <button @click="handleEnrollButton" class="btn btn-primary course-enroll__enroll">Enroll</button>
          </div>          
          <div v-if="isAdmin">
            <button @click="handleEditButton" class="btn btn-warning course-enroll__enroll ml-3">Edit</button>
          </div>
        </div>
        <div v-else>
          <p>To enroll please you need to <router-link :to="{ name: 'login' }" >Login</router-link> first</p>
        </div>
      </div>
    </div>
    <div v-else>
      Loading...
    </div>

    <div v-if="isUserEnrolled !== null">
      <p>Course Lectures</p>
      <p v-for="lecture in courseLectures" :key="lecture.title">{{ lecture.title }}</p>
    </div>
    <div v-else>
      <p> To get full access please enroll the course</p>
    </div>
  </div>
</template>

<script>
import { computed ,onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  props: ['id'],
  setup(props){
    const store = useStore();
    const router = useRouter();

    const currentUser = computed(() => store.getters.getCurrentUser);
    
    const handleEnrollButton = () => {
      const user_id = currentUser.value.id;
      const courseId = props.id;

      const payload = {
        userId: user_id,
        courseId: courseId
      }
      store.dispatch('enrollIntoCourse', payload)
    }

    const handleEditButton = () => {
      const courseId = props.id;
      router.push(`/course/${courseId}/edit`)
    }

    const isUserEnrolled = computed(() => {
      const courseDetail = store.getters.getCourseDetail;
      if(courseDetail !== null){

        if (currentUser.value === null){
          return null;
        }

        if (courseDetail.enrolledUserIds.includes(currentUser.value.id.toString())){
          store.dispatch('fetchLectures', {courseId: courseDetail.id})
          return true;
        }
      }
      return null;
    })

    onMounted(() => {
      store.dispatch('courseDetail', {courseId: props.id})
    })

    onUnmounted(() => {
      store.commit('unmountCourseDetail')
    })
    

    return {
      courseDetail: computed(() => {
        console.log('return courseDetail Computed')
        return store.getters.getCourseDetail;
      }),
      currentUser: currentUser,
      handleEnrollButton: handleEnrollButton,
      isUserEnrolled: isUserEnrolled,
      isAdmin: computed(() => store.getters.isAdmin),
      handleEditButton: handleEditButton,
      courseLectures: computed(() => {
        return store.getters.getCourseLectures
      })
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