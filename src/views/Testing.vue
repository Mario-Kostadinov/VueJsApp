<template>
  <div>
    Counter {{ count }}
    <p>A: {{ a }}</p>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore()
    const a = ref([1,2])
    fetch("/api/courses")
    .then((res) => res.json())
    .then((json) => {
      // this.users = json.users
      console.log(json.courses)
      a.value = [1,2]
    })

    return {
      count: computed(() => store.state.counter),
      a: a
    }
  }
}
</script>