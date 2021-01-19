<template>
  <div class="register container">
  
    <h2 class="mb-5">{{ courseDetail.title }}</h2>
    <h3>Add Lecture</h3>
    <form @submit.prevent="handleFormSubmission" class="shadow pl-4 pr-4 pt-5 pb-5">
      <div class="form-group">
        <label for="lecture_title">Lecture Title</label>
        <input class="form-control" v-model="lectureTitle" type="text" id="lecture_title" placeholder="Course title">
      </div>
      <div class="form-group">
        <label for="lecture_video_url">Lecture Video Url</label>
        <input v-model.trim="lectureVideoUrl" type="text" class="form-control" id="lecture_video_url" placeholder="Course description">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <div class="course-lectures mt-5">
      <h3>There are {{ courseLectures.length }} in this course</h3>
      <div v-for="lecture in courseLectures" :key="lecture.id">
        <div class="d-flex justify-content-between align-items-center pb-3 pt-3 p-2 mb-3" style="border: 1px solid black; border-radius: 5px">
        <p>{{ lecture.title }}</p>
        <button class="btn btn-danger" @click="handleDeleteLecture(lecture.id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  props: ['id'],
  setup(props) {

    const store = useStore();

    const lectureTitle = ref('Angular Jss')
    const lectureVideoUrl = ref('Angular Description')

    const handleFormSubmission = () => {
     
      const payload = {
        lectureTitle: lectureTitle.value,
        lectureVideoUrl: lectureVideoUrl.value,
        courseId: props.id
      }

      store.dispatch('addLecture', payload)
    }

    const handleDeleteLecture = lectureId => {
      console.log('Deleting', lectureId)
    }

    onMounted(() => {
      store.dispatch('courseDetail', {courseId: props.id})
      store.dispatch('fetchLectures', {courseId: props.id})
    })

    return {
      lectureTitle: lectureTitle,
      lectureVideoUrl: lectureVideoUrl,
      handleFormSubmission: handleFormSubmission,
      handleDeleteLecture: handleDeleteLecture,
      courseLectures: computed(() => {
        return store.getters.getCourseLectures
      }),
      courseDetail: computed(() => {
        return store.getters.getCourseDetail;
      }),
    }
  }
}
</script>

<style scoped lang="scss">
  p {
    margin-bottom: 0 !important;
  }
</style>