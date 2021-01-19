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
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>


<script>

import { ref } from 'vue';
// import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  setup() {

    // const router = useRouter();
    const store = useStore();

    const lectureTitle = ref('Angular Js')
    const lectureVideoUrl = ref('Angular Description')

    const handleFormSubmission = () => {
     
      const payload = {
        lectureTitle: lectureTitle.value,
        lectureVideoUrl: lectureVideoUrl.value,
      }

      store.dispatch('addLecture', payload)

      // router.push({
      //   name: 'home'
      // })

    }

    return {
      lectureTitle,
      lectureVideoUrl,
      handleFormSubmission
    }
  }
}
</script>