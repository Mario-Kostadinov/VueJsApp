<template>
  
  <router-link :to="'/course/'+id" class="course-item shadow-lg">
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
    display: block;
    padding: 10px;
    border-radius: 10px;
    transform: scale(1);
    transition: transform 250ms;
    color: black;
    background-color: #fff;

    &:hover, &:focus {
      text-decoration: none;
      transform: scale(1.03);
    }

    &__image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 10px;
    }

    &__title {
      margin-top: 15px;
    }
  }

</style>