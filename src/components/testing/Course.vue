<template>
  <div class="course-test container">
    <p class="text-center mt-5">Counter {{ courseCounter }}</p>
    <button @click="counter.increase">Increase Counter</button>
    <button @click="counter.reset">Reset Counter</button>
  </div>
</template>

<script>

import { ref } from 'vue';

export default {
  setup(){

    const courseCounter = ref(1);

    const increaseCounter = () => {
      courseCounter.value += 1;
    }

    const resetCounter = () => {
      courseCounter.value = 0;
    }

    return {
      courseCounter: courseCounter,
      counter: {
        increase: increaseCounter,
        reset: resetCounter
      }
    }
  }
}
</script>