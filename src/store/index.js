import { createStore } from 'vuex'

export default createStore({
  state(){
    return {
      counter: 0,
      courseDetail: null,
      courseLectures: [],
      courses: null,
      user: null,
      flashMessage: null
    }
  },
  mutations: {
    fetchCourseData(state, payload) {
      state.courseData = payload.value;
    },
    authenticateUser(state, payload){
      // In Production this will be replaced by JWT
      localStorage.setItem('token', payload.user.id)
      state.user = payload.user
    },
    logoutUser(state){
      state.user = null
      localStorage.removeItem('token')
    },
    flashMessage(state, payload){
      state.flashMessage = payload
    },
    removeFlashMessage(state){
      state.flashMessage = null
    },
    updateCourseDetail(state, payload){
      state.courseDetail = payload.course
    },
    updateLectures(state, payload){
      state.courseLectures = payload.lectures
    },
    updateCourses(state, payload){
      state.courses = payload.courses
    },
    unmountCourseDetail(state){
      state.courseDetail = null;
    },
    removeCourseListing(state){
      state.courses = null
    },
    searchAllCourses(state, payload) {
      if (state.courses === null) {
        state.courses = null;
      } else {
        const filteredCourses = state.courses.filter((course) => {
          return course.title.toLowerCase().includes(payload.query)
        })
        state.courses = filteredCourses
      }
    }
  },
  actions: {
    /**
     * @function
     * @name searchAllCourses
     * @description Used to search courses and updates the state
     * 
     */
    searchAllCourses(context, payload) {
      if(payload.query.length > 0) {
        context.commit('searchAllCourses', payload)
      } else {
        context.dispatch('fetchCourses')
      }
    },
     /**
     * @function
     * @name courseDetail
     * @description Update courseDetail state
     * 
     */   
    courseDetail(context, payload){
      const api = `/api/courses/${payload.courseId}`;
      fetch(api)
        .then((res) => {
          var response = JSON.parse(res._bodyText)
          context.commit('updateCourseDetail', response)
      })
    },
    /**
     * @function
     * @name setUser
     * @description Auto log in user if token is present
     * 
     */  
    setUser(context, payload) {
      let api = `/api/users/${payload.token}`
      fetch(api, {
        method: "POST",
        body: JSON.stringify({id: payload.token})
      })
        .then((res) => {
          var response = JSON.parse(res._bodyText)  
          if(response.user !== null){
            context.commit('authenticateUser', response)
          }
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
      console.log(payload)
        let api = `/api/courses/${payload.courseId}/lectures`;
        fetch(api)
          .then((res) => {
            var response = JSON.parse(res._bodyText)
            console.log(response)
            context.commit('updateLectures', response)
        })
    },
    deleteLecture(context, payload) {
      console.log('-------')
      console.log(payload)
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
      let api = `/api/course`
      fetch(api, {
        method: "POST",
        body: JSON.stringify(payload)
      })
      .then(() => {
        context.dispatch('fetchCourses')
        context.commit('flashMessage', {
          type: 'success',
          message: 'New course created successfully!'
        })
      })
    },
    EditCourse(context, payload){
      let api = `/api/course/${payload.courseId}/edit`
      fetch(api, {
        method: "POST",
        body: JSON.stringify(payload)
      })
        .then(() => {
          context.commit('flashMessage', {
            type: 'success',
            message: 'Course edited successfully!'
          })
      })
    },
    addLecture(context, payload){
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
    tryLogin(context) {
      const token = localStorage.getItem('token')
      if(token){
        context.dispatch('setUser', {token: token})
      }
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
            if(response.message === 'failed to register'){
              throw new Error('Failed to register')
            } else {
              //success 
              context.commit('authenticateUser', response)
              context.commit('flashMessage', {
                type: 'success',
                message: 'Register successfully!'
              })
            }
        })
    },
    async login(context, payload) {  
        let api = `/api/login`
        await fetch(api, {
          method: "POST",
          body: JSON.stringify(payload)
        })
          .then((res) => {
            var response = JSON.parse(res._bodyText)
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
    },
    async checkUsernameAvailability(context, payload) {
      // query for logging in
      let api = `/api/username/check`
      await fetch(api, {
        method: "POST",
        body: JSON.stringify(payload)
      })
        .then((res) => {
          var response = JSON.parse(res._bodyText)
          if(response.exists === true){
            throw new Error('Username exists')
          } else {
            return 'success'
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
    /**
     * @function
     * @name getCurrentUser
     * @return Null if no user or entire user object
     */
    getCurrentUser(state){
      if(state.user === undefined) {
        return null
      }
      if (state.user !== null || state.user !== undefined) {
        typeof(state.user)
        return state.user
      } else {
        return null
      }
    },
      /**
     * @function
     * @name isAdmin
     * @description Determines whether currentUser is admin
     * 
     * @return true or false
     */
    isAdmin(state){
      if (state.user) {
        return state.user.role === 'admin' ? true : false;
      } else {
        return false
      }
    },
    /**
     * @function
     * @name getAllCourses
     * @return Only public courses
     * 
     */
    getAllCourses(state) {
      if (state.courses === null) {
        return null;
      } else {
        const filteredCourses = state.courses.filter((course) => {
          return course.isPublic === true;
        })
        return filteredCourses
      }
    },
    /**
     * @function
     * @name getAllCoursesUnfiltered
     * @return All courses for the Admin
     * 
     */
    getAllCoursesUnfiltered(state) {
      if (state.courses === null) {
        return null;
      } else {
        return state.courses
      }
    }
  }
})
