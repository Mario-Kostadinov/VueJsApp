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
      <img src="/spinner.gif" style="width: 300px;" />
    </div>
    <div class="mt-5">
      <div v-if="isUserEnrolled !== null">
        <div v-if="courseLectures.length > 0">
          <p>Course Lectures</p>
          <div v-for="lecture in courseLectures" :key="lecture.title" class="course-lectures d-flex justify-content-between align-items-center">
            <h4>
            {{ lecture.title }}
            </h4>
            <button @click="handleShowModal(lecture)" class="btn btn-primary">PLAY</button>
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
 
    <div id="modal-template">
      <transition name="modal">
        <div class="modal-mask" :class="showModal == true ? '' : 'd-none'" >
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="modal-body">
                <slot name="body">
                  <h2 class="mb-5">{{ lectureTitle }}</h2>
                  <iframe width="560" height="315" :src="lectureVideoUrl" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                </slot>
              </div>
              <div class="modal-footer">
                <slot name="footer">
                  <button class="btn btn-primary" @click="showModal = false">
                    Close
                  </button>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

  </div>
</template>

<script>
import { ref, computed ,onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  props: ['id'],
  setup(props){
    const store = useStore();
    const router = useRouter();
    const showModal = ref(false)
    const currentUser = computed(() => store.getters.getCurrentUser);
    
    const lectureTitle = ref('');
    const lectureVideoUrl = ref('');

    const handleShowModal = lecture => {
      showModal.value = true
      lectureTitle.value = lecture.title
      lectureVideoUrl.value = `https://www.youtube.com/embed/${lecture.video_url}`
    }

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
      showModal: showModal,
      lectureTitle: lectureTitle,
      lectureVideoUrl: lectureVideoUrl,
      handleEnrollButton: handleEnrollButton,
      isUserEnrolled: isUserEnrolled,
      handleShowModal: handleShowModal,
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
      max-width: 600px;
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
  .modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  max-width: 740px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>