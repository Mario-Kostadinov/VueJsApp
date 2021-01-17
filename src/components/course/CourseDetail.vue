<template>
  <div class="course-detail">
    This is the course detail
  </div>
</template>

<script>
export default {
  props: ['slug'],
  setup(props){
    console.log(props)
    console.log('detail')
  }
}
</script>