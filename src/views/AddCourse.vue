<template>
  <div class="register container">
    <form @submit.prevent="handleFormSubmission" class="shadow pl-4 pr-4 pt-5 pb-5">
      <div class="form-group">
        <label for="course_title">Course Title</label>
        <input class="form-control" v-model="courseTitle" type="text" id="course_title" placeholder="Course title">
      </div>
      <div class="form-group">
        <label for="course_description">Course Description</label>
        <input v-model.trim="courseDescription" type="text" class="form-control" id="course_description" placeholder="Course description">
      </div>
      <div class="form-group">
        <label for="image_url">Image Url</label>
        <input v-model.trim="courseImageUrl" type="text" class="form-control" id="image_url" placeholder="Course image url">
      </div>
      <div class="form-check mb-3">
        <input type="checkbox" class="form-check-input" v-model="courseIsPublic" id="is_public">
        <label class="form-check-label" for="is_public">Public</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>


<script>

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  setup() {

    const router = useRouter();
    const store = useStore();

    const courseTitle = ref('')
    const courseDescription = ref('')
    const courseImageUrl = ref('')
    const courseIsPublic = ref(false)

    const handleFormSubmission = () => {
     
      const payload = {
        courseTitle: courseTitle.value,
        courseDescription: courseDescription.value,
        courseImageUrl: courseImageUrl.value,
        courseIsPublic: courseIsPublic.value
      }
      store.dispatch('addCourse', payload)

      router.push({
        name: 'view-all-courses'
      })

    }

    return {
      courseTitle,
      courseDescription,
      courseImageUrl,
      courseIsPublic,
      handleFormSubmission
    }
  }
}
</script>