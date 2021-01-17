<template>
  <div class="contact">
    <h3>{{ name }}</h3>
    <p>{{ phoneNumber }}</p>
    <button @click="addToFavourites">Add to Favourites</button>
  </div>
</template>

<script>
  export default {
    props: {
      id: {
        type: Number,
        required: true
      },
      emits: {
        'add-to-favourites': function(id){
          console.log('emitting')
          if(id){
            return true;
          } else {
           console.warn('Id is missing!');
           return false; 
          }
        }
      },
      name: {
        type: String,
        required: true,
        default: 'Nameless',
        validator: function(value){
           return value.length > 3;
        }
      },
      phoneNumber: {
        type: String
      }
    },
    methods: {
      addToFavourites() {
        this.$emit('add-to-favourites')
      }
    }
  }
</script>

<style scoped lang="scss">
  .contact {
    border: 1px solid orange;
    padding: 10px;
  }
</style>