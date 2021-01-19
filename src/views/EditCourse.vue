<template>
  <div class="register container">
    <h2>Edit</h2>
    <div v-if="courseDetail !== null">
      <form @submit.prevent="handleFormSubmission" class="shadow pl-4 pr-4 pt-5 pb-5">
        <div class="form-group">
          <label for="course_title">Course Title</label>
          <input class="form-control" v-model="courseDetail.title" type="text" id="course_title" placeholder="Course title">
        </div>
        <div class="form-group">
          <label for="course_description">Course Description</label>
          <input v-model="courseDetail.description" type="text" class="form-control" id="course_description" placeholder="Course description">
        </div>
        <div class="form-group">
          <label for="image_url">Image Url</label>
          <input v-model="courseDetail.imageUrl" type="text" class="form-control" id="image_url" placeholder="Course image url">
        </div>
        <div class="form-check mb-3">
          <input type="checkbox" class="form-check-input" v-model="courseDetail.isPublic" id="is_public">
          <label class="form-check-label" for="is_public">Public</label>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
    <div v-else>...Loading</div>
  </div>
</template>


<script>
import {  computed , onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  props: ['id'],
  setup(props) {

    const router = useRouter();
    const store = useStore();

    const courseDetail = computed(() => {
      return store.getters.getCourseDetail;
    })

    const courseTitle = computed(() => {
      if(courseDetail.value !== null){
        return courseDetail.value.title
      } else {
        return null;
      }
    })
    const courseDescription = computed(() => {
      if(courseDetail.value !== null){
        return courseDetail.value.description
      } else {
        return null;
      }
    })
    const courseImageUrl = computed(() => {
      if(courseDetail.value !== null){
        return courseDetail.value.imageUrl
      } else {
        return null;
      }
    })
    const courseIsPublic = computed(() => {
      if(courseDetail.value !== null){
        return courseDetail.value.isPublic
      } else {
        return null;
      }
    })

    /**
     * @function handleFormSubmission
     * @description Collects the data from the inputs and submits the it
     */
    const handleFormSubmission = () => {
     
      const payload = {
        courseTitle: courseTitle.value,
        courseDescription: courseDescription.value,
        courseImageUrl: courseImageUrl.value,
        courseIsPublic: courseIsPublic.value,
        courseId: props.id
      }

      store.dispatch('EditCourse', payload)

      router.push({
          name: 'view-all-courses'
      })

    }
    onMounted(async () => {
      await store.dispatch('courseDetail', {courseId: props.id})
    })

    onUnmounted(() => {
      store.commit('unmountCourseDetail')
    })
    
    return {
      courseTitle: courseTitle,
      courseDescription: courseDescription,
      courseImageUrl: courseImageUrl,
      courseIsPublic: courseIsPublic,
      handleFormSubmission: handleFormSubmission,
      courseDetail: courseDetail

    }
  }
}
</script>