import { createStore } from 'vuex'


export default createStore({
  state(){
    return {
      counter: 0,
      courseDetail: null,
      courseLectures: [],
      courses: [],
      user: null,
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
      state.user = null
    },
    flashMessage(state, payload){
      state.flashMessage = payload
    },
    updateCourseDetail(state, payload){
      state.courseDetail = payload.course
    },
    updateLectures(state, payload){
      console.log(payload.lectures)
      state.courseLectures = payload.lectures
    },
    unmountCourseDetail(state){
      state.courseDetail = null;
    }
  },
  actions: {
    courseDetail(context, payload){
      const api = `/api/courses/${payload.courseId}`;
      fetch(api)
        .then((res) => {
          var response = JSON.parse(res._bodyText)
          context.commit('updateCourseDetail', response)
      })
    },
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
    enrollIntoCourse(context, payload) {
        // query for logging in
        let api = `/api/courses/${payload.courseId}/enroll`
        fetch(api, {
          method: "POST",
          body: JSON.stringify({user_id: payload.userId})
        })
          .then(() => {   
            context.dispatch('courseDetail', {courseId: payload.courseId})
            context.dispatch('fetchLectures', {courseId: payload.courseId})
            context.commit('flashMessage', {
              type: 'success',
              message: 'Enrolled successfully!'
            })
        
        })
    },
    fetchLectures(context, payload) {
        let api = `/api/courses/${payload.courseId}/lectures`;
        fetch(api)
          .then((res) => {
            var response = JSON.parse(res._bodyText)
            context.commit('updateLectures', response)
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
    }
  },
  getters: {
    flashMessage(state) {
      return state.flashMessage
    },
    getCourseDetail(state) {
      return state.courseDetail === null ? false : state.courseDetail
    },
    getCourseLectures(state) {
      return state.courseLectures === null ? null : state.courseLectures
    },
    getCurrentUser(state){
      console.log(state)
      return state.user !== null ? state.user : null
    }
  }
})
