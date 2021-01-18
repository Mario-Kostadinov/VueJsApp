<template>
  
  <router-link :to="'/course/'+id" class="course-item">
    <img class="course-item__image" :src="imageUrl" />
    <h2 class="course-item__title">{{ title }}</h2>
    <p class="course-item__description">{{ description }}</p>
  </router-link> 


</template>

<script>
export default {
  props: [
    'imageUrl',
    'title',
    'description',
    'id'
  ]
}
</script>

<style scoped lang="scss">
  .course-item {
    &__image {
      width: 100%;
    }
  }

</style>