<template>
  <div class="contacts-wrapper"> 
    <h2 class="text-center">Contacts Layout</h2>
    <ul>
      <li v-for="contact in contacts" :key="contact.id" >
        <contact 
          :name="contact.name"
          :phone-number="contact.phoneNumber"
          :id="contact.id"
          @add-to-favourites="addToFavouriteWithinParent"
         ></contact>
      </li>
    </ul>
  </div>
</template>

<script>

import Contact from '@/components/testing/Contact.vue';

export default {
  data(){
    return {
      contacts: [
        {
          name: 'Maia Petrova',
          phoneNumber: '0899182902',
          id: 1
        },
        {
          name: 'Mario Kostadinov',
          phoneNumber: '0896886612',
          id: 2
        }
      ]
    }
  },
  methods: {
      addToFavouriteWithinParent(contactId){
        console.log('Adding to favourites')
        console.log(contactId)
      }
    },
  components: {
    Contact
  }
}
</script>

<style scoped lang="scss">
  .contacts-wrapper {
    border: 1px solid white;
    padding-top: 20px;
    padding-bottom: 20px;
    margin-left: 20px;
    margin-right: 20px;
  }
</style>