import { createStore } from 'vuex'

export default createStore({
  state(){
    return {
      counter: 0,
      courseDetail: null,
      courseLectures: [],
      courses: null,
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
    updateCourses(state, payload){
      console.log('Mutations')
      console.log(payload.courses)
      state.courses = payload.courses
    },
    unmountCourseDetail(state){
      state.courseDetail = null;
    },
    removeCourseListing(state){
      state.courses = null
    },
    formFailed(state){
      state.formFailed = true
    },
    formSucceeded(state){
      state.formFailed = false
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
        .then(() => {
          context.commit('logoutUser')
          context.commit('flashMessage', {
            type: 'warning',
            message: 'Logged out!'
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
        console.log('fethcLEcturees')
        let api = `/api/courses/${payload.courseId}/lectures`;
        fetch(api)
          .then((res) => {
            var response = JSON.parse(res._bodyText)
            context.commit('updateLectures', response)
        })
    },
    deleteLecture(context, payload) {
        console.log('Delete Lecture')
        let api = `/api/courses/${payload.courseId}/lectures/${payload.lectureId}/delete`;
        fetch(api, {
          method: "DELETE",
          body: JSON.stringify(payload)
        })
          .then(() => {
            context.dispatch('fetchLectures', payload)
            context.commit('flashMessage', {
              type: 'danger',
              message: 'Lecture removed!'
            })
        })
    },
    fetchCourses(context) {
        let api = `/api/courses`;
        fetch(api)
          .then((res) => {
            var response = JSON.parse(res._bodyText)
            context.commit('updateCourses', response)
        })
    },
    addCourse(context, payload){
      console.log('Adding Course')
      // query for logging in
      let api = `/api/course`
      fetch(api, {
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
            context.dispatch('fetchCourses')
            context.commit('flashMessage', {
              type: 'success',
              message: 'New course created successfully!'
            })
          }
          // courseData.value = response.course;
      })
    },
    EditCourse(context, payload){
      console.log('Adding Course')
      // query for logging in
      let api = `/api/course/${payload.courseId}/edit`
      fetch(api, {
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
            context.commit('flashMessage', {
              type: 'success',
              message: 'Course edited successfully!'
            })
          }
          // courseData.value = response.course;
      })
    },
    addLecture(context, payload){
      console.log('----dispatch lecture-----')
      let api = `/api/courses/${payload.courseId}/lecture`;
      fetch(api, {
        method: "POST",
        body: JSON.stringify(payload)
      })
        .then(() => {
          context.dispatch('courseDetail', {courseId: payload.courseId})
          context.dispatch('fetchLectures', {courseId: payload.courseId})
          context.commit('flashMessage', {
            type: 'success',
            message: 'New lecture created successfully!'
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
        // query for logging in
        let api = `/api/login`
        await fetch(api, {
          method: "POST",
          body: JSON.stringify(payload)
        })
          .then((res) => {
            var response = JSON.parse(res._bodyText)
            console.log(response)
            if(response.message === 'failed to authenticate'){
              // Authentication Failed           
              context.commit('flashMessage', {
                type: 'danger',
                message: 'Failed to Authenticate!'
              })
              throw new Error('Failed to Authenticate')
            } else {
              if (response.message === 'success') {
                // Log user in
                console.log('Success motherfucker')
  
                context.commit('authenticateUser', response)
                context.commit('flashMessage', {
                  type: 'success',
                  message: 'Logged in successfully!'
                })
              } else {
                throw new Error('Failed to Authenticate')
              }
            }
  
      })
    }
  },
  getters: {
    flashMessage(state) {
      return state.flashMessage
    },
    getCourseDetail(state) {
      return state.courseDetail === null ? null : state.courseDetail
    },
    getCourseLectures(state) {
      return state.courseLectures === null ? null : state.courseLectures
    },
    getCurrentUser(state){
      console.log('get current user')
      console.log(state.user)
      if(state.user === undefined) {
        console.log('it is undefinied')
        return null
      }
      if (state.user !== null || state.user !== undefined) {
        console.log('CurerntUser exists')
        typeof(state.user)
        return state.user
      } else {
        return null
      }
    },
    isAdmin(state){
      if (state.user) {
        return state.user.role === 'admin' ? true : false;
      } else {
        return false
      }
    },
    getAllCourses(state) {
      return state.courses !== null ? state.courses : null;
    },
  }
})
