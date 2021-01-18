<template>
  <div>
    Counter {{ count }}
    <button @click="handleClick">Increase Counter</button>
    <button @click="handleClickByTen">Increase Counter</button>
    <hr>
    <div>plus 10: {{ plusten }}</div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore()
    
  
    const handleClick = () => {
      store.commit('increase', { value: 10 })
    }
    const handleClickByTen = () => {
      store.dispatch('increment')
    }


    return {
      count: computed(() => store.state.counter),
      handleClick: handleClick,
      handleClickByTen:handleClickByTen,
      plusten: computed(() => store.getters.finalCounter)
    }
  }
}
</script>