<template>
  <h2>Course Detail View</h2>
  <h3>Slug: {{ slug }}</h3>
</template>

<script>
export default {
  props: ['slug'],
  setup(props){
    console.log(props.slug)
  }
}
</script>