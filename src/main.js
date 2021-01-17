import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app';


 



  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyD6wdGkZhMsQL9GbataAtT-vB3Mcs-4qQc",
    authDomain: "vuejsproject-1b3eb.firebaseapp.com",
    databaseURL: "https://vuejsproject-1b3eb-default-rtdb.firebaseio.com",
    projectId: "vuejsproject-1b3eb",
    storageBucket: "vuejsproject-1b3eb.appspot.com",
    messagingSenderId: "71113648636",
    appId: "1:71113648636:web:a39e44b079a9b3cf172a79",
    measurementId: "G-5NXBM6VF1Q"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig); 

createApp(App).use(store).use(router).mount('#app')

// Testing Purposes
//import TestingApp from './TestingApp.vue'
// createApp(TestingApp).mount('#testingApp')