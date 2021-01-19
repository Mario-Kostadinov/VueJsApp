<template>
  <div class="course-detail container shadow-lg">
    <div v-if="courseDetail !== null" class="row">
      <div class="col-12 col-lg-7">
        <h2>{{ courseDetail.title }}</h2>
        <img v-if="courseDetail.imageUrl" :src="courseDetail.imageUrl" class="course-detail__image" style="width: 100%" />
        <img v-else src="https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png" class="course-detail__image" style="width: 100%" />
      </div>
      <div class="col-12 col-lg-5 mt-md-4 mt-lg-0">
        <div>
          <h3>Course Description</h3>
          <p>{{ courseDetail.description }}</p>
        </div>
        <div v-if="currentUser !== null" class="course-enroll d-flex justify-content-center align-items-center">
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
          <p>You need to <router-link :to="{ name: 'login' }" >login</router-link> first before enrolling</p>
        </div>
      </div>
    </div>
    <div v-else>
      Loading...
    </div>
    <div class="mt-5">
      <div v-if="isUserEnrolled !== null">
        <div v-if="courseLectures.length > 0">
          <p>Course Lectures</p>
          <div v-for="lecture in courseLectures" :key="lecture.title" class="course-lectures d-flex justify-content-between align-items-center">
            <h4>
            {{ lecture.title }}
            </h4>
            <button class="btn btn-primary">PLAY</button>
          </div>
        </div>
        <div v-else>
          <p>There aren't any lectures yet!</p>
        </div>  
      </div>
      <div v-else>
        <p> To get full access to the course you need to enroll first.</p>
      </div>
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
  .course-detail {
    background: #fff;
    padding: 50px 40px;
    border-radius: 10px;

    &__image {
      border-radius: 10px;
      display: block;
    }

    .course-lectures {
      max-width: 500px;
      margin: 0 auto;
      border-bottom: 1px solid black;
      padding-bottom: 10px;
      margin-bottom: 10px;
      h4 {
        margin: 0
      }
    }

    .course-enroll {
      &__enrolled {
        background-color: rgb(16, 190, 16);
        color: #fff;
        padding: 10px;
        border-radius: 5px;
      }
    }
  }
</style>