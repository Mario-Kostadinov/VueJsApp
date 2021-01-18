import { createStore } from 'vuex'


export default createStore({
  state(){
    return {
      counter: 0,
      courseData: {},
      user: {},
      flashMessage: {}
    }
  },
  mutations: {
    increment(state) {
      state.counter = state.counter + 1;
    },
    increase(state, payload) {
      state.counter = state.counter + payload.value
    },
    fetchCourseData(state, payload) {
      state.courseData = payload.value;
    },
    authenticateUser(state, payload){
      state.user = payload.user
    },
    logoutUser(state){
      state.user = {}
    },
    flashMessage(state, payload){
      state.flashMessage = payload
    }
  },
  actions: {
    logout(context) {
      // query for logging in
      let api = `/api/logout`
      fetch(api)
        .then((res) => {
          console.log(res)
          console.log('Logging out')
          context.commit('logoutUser')
          context.commit('flashMessage', {
            type: 'success',
            message: 'Logged out successfully!'
          })
          // courseData.value = response.course;
      })
    },
    async register(context, payload) {
        // query for logging in
        let api = `/api/register`
        await fetch(api, {
          method: "POST",
          body: JSON.stringify(payload)
        })
          .then((res) => {
            var response = JSON.parse(res._bodyText)
            console.log('is this a response')
            console.log(response)
            if(response.message === 'failed to register'){
              // push fail              
            } else {
              //success 
              context.commit('authenticateUser', response)
              context.commit('flashMessage', {
                type: 'success',
                message: 'Register successfully!'
              })
            }
            // courseData.value = response.course;
        })
    },
    async login(context, payload) {
      console.log('Login action hit')
  
        // query for logging in
        let api = `/api/login`
        await fetch(api, {
          method: "POST",
          body: JSON.stringify(payload)
        })
          .then((res) => {
            var response = JSON.parse(res._bodyText)
            console.log('is this a response')
            console.log(response)
            if(response.message === 'failed to authenticate'){
              // push fail              
            } else {
              //success 
              context.commit('authenticateUser', response)
              context.commit('flashMessage', {
                type: 'success',
                message: 'Logged in successfully!'
              })
            }
            // courseData.value = response.course;
        })

    },
    fetchCourseData(context, payload) {
      context.commit('increment', payload)
    },
    increment(context) {
      return new Promise((resolve, reject) => {
        try {
          setTimeout(() => {
            console.log('After 1 second')
            context.commit('increment')
            resolve()
          }, 1000)
        } catch(e) {
          reject(e)
        }
      })
    }
  },
  getters: {
    finalCounter(state) {
      return state.counter + 10;
    },
    flashMessage(state) {
      return state.flashMessage
    }
  }
})
