<template>
  <div>
    Counter {{ count }}
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore()

    fetch("/api/courses")
    .then((res) => res.json())
    .then((json) => {
      // this.users = json.users
      console.log(json.courses)
    })

    return {
      count: computed(() => store.state.counter)
    }
  }
}
</script>