import { createServer, Model, belongsTo, hasMany, Serializer } from "miragejs"

    /** miragejs is a API mocking library used for development only
     *  Can be found here. https://miragejs.com/
     */
export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
      course: Model.extend({
        owner: belongsTo('user'),
        enrolledUsers: hasMany('user')
      }),
      lecture: Model.extend({
        course: belongsTo('course')
      })
    },
    serializers: {
      course: Serializer.extend({
        include: ['owner', 'enrolledUsers']
      })
    },
    /**
     * @function
     * @name seeds
     * @description creates the dummy data used for testing
     */
    seeds(server) {
      let admin = server.create("user", { username: "admin", role: 'admin', password: 'adminadmin', enrolledCourses: [] })
      let bob = server.create("user", { username: "Bob", role: "user", password: 'bobbob', enrolledCourses: [] })
      let alice = server.create("user", { username: "Alice", role: "user", password: 'alicealice', enrolledCourses: [] })
      let project_one = server.create("course", { title: "Vue Course", description: 'Time to learn some Vuex', isPublic: true , owner: alice, enrolledUsers: [bob, admin], imageUrl: 'https://vuex.vuejs.org/flow.png' })
      server.create("course", { title: "React Course", description: 'Time to learn some React', isPublic: true , owner: bob, enrolledUsers: [bob], imageUrl: 'data:image/png;base64,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' })
      server.create('lecture', { title: "Lecture 1: Introduction", video_url: 'Wy9q22isx3U', course: project_one, isDeleted: false })
      server.create('lecture', { title: "Lecture 2: Vue Basics", video_url: '4UZrsTqkcW4', course: project_one, isDeleted: false })
      // server.create("course", {owner: 'user'})
    },
    /**
     * @function
     * @name routes
     * @description specifies the REST routes used in testing
     * 
     * @name  GET/users 
     * @description Get all users
     * @name  GET/courses 
     * @description Get all courses
     * @name  GET/courses/:id 
     * @description Get a course with an id
     * @name  GET/courses/:id/lectures
     * @description Get all lectures for that course 
     * @name  POST/login 
     * @description Log user in
     * @name  POST/logout 
     * @description Log out user
     * @name  POST/course 
     * @description Create a course
     * @name  POST/course/:id/edit
     * @description Edit Course 
     * @name  POST/courses/:id/lecture
     * @description Creates a lecture
     * @name  POST/courses/:id/lectures/:lectureId/delete 
     * @description Deletes a lecture
     * @name  POST/courses/:id/enroll 
     * @description Enroll user to a course
     * @name  POST/username/check 
     * @description Checkes if username is taken
     */
    routes() {
      this.namespace = "api"
      this.get("/users", (schema) => {
        return schema.users.all()
      })
      this.post("/users/:id", (schema, request) => {
        return schema.users.findBy({id: request.params.id})
      })
      this.get("/courses", (schema) => {
        return schema.courses.all()
      })
      this.get("/courses/:id", (db, request) => {
        return db.courses.find(request.params.id)
      })
      this.get("/courses/:id/lectures", (db, request) => {
        return db.lectures.where({courseId: request.params.id, isDeleted: false})
      })
      this.post("/login", (db, request) => {
        let attrs = JSON.parse(request.requestBody)
        const user = db.users.findBy({username: attrs.username})
        if (user === null) {
          return {
            message: 'failed to authenticate'
          }
        } else {
          if (user.attrs.password === attrs.password && user.attrs.username === attrs.username) {
            return {
              message: 'success',
              user: user.attrs 
            }
          } else {
              return {
              message: 'failed to authenticate'
            } 
          }
        }
      })
      this.get("/logout", () => {
        return {message: 'success'}
      }),
      this.post("/course", (schema, request) => {
        let attrs = JSON.parse(request.requestBody) 
        const newCourse = {
          title: attrs.courseTitle,
          description: attrs.courseDescription,
          imageUrl: attrs.courseImageUrl,
          isPublic: attrs.courseIsPublic
        } 
        server.schema.courses.create(newCourse); 
      }),
      this.post("/course/:id/edit", (db, request) => {
        let attrs = JSON.parse(request.requestBody) 
        let course_id = request.params.id;
        const newCourse = {
          title: attrs.courseTitle,
          description: attrs.courseDescription,
          imageUrl: attrs.courseImageUrl,
          isPublic: attrs.courseIsPublic
        } 
        let findCourseById = db.courses.find(course_id)
        findCourseById.attrs.title = newCourse.title;
        findCourseById.attrs.description = newCourse.description;
        findCourseById.attrs.imageUrl = newCourse.imageUrl;
        findCourseById.attrs.isPublic = newCourse.isPublic;
        findCourseById.save()
      }),
      this.post("/courses/:id/lecture", (db, request) => {
        let attrs = JSON.parse(request.requestBody)
        let course_id = request.params.id;
        let findCourseById = db.courses.find(course_id)
        const payload = {
          title: attrs.lectureTitle, 
          video_url: attrs.lectureVideoUrl, 
          course: findCourseById,
          isDeleted: false
        }
        const lecture = server.schema.lectures.create(payload);
        return lecture
      }),
      this.delete("/courses/:id/lectures/:lectureId/delete", (db, request) => {
        let lectureId = request.params.lectureId;
        let lecture = db.lectures.findBy({id: lectureId})
        lecture.isDeleted = true
        lecture.save();
        return { message: 'success' }
      }),
      this.post("/courses/:id/enroll", (db, request) => {
        let attrs = JSON.parse(request.requestBody)
        let course_id = request.params.id;
        let user_id = attrs.user_id
        let findCourseById = db.courses.find(course_id)
        let enrolledUsersSlice = findCourseById.attrs.enrolledUserIds.slice();
        enrolledUsersSlice.push(user_id)
        findCourseById.attrs.enrolledUserIds = enrolledUsersSlice;
        findCourseById.save();   
        return findCourseById
      }),
      this.post("/register", (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        const newUser = {
          username: attrs.username,
          password: attrs.password,
          role: 'user',
          enrolledCourses: []
        }
        const user = server.schema.users.create(newUser);
        if (user === null) {
          return {
            message: 'failed to register'
          }
        } else {
          return {
            message: 'success',
            user: user.attrs 
          }
        }
      }),
      this.post("/username/check", (db, request) => {
        let attrs = JSON.parse(request.requestBody)     
        const user = db.users.findBy({username: attrs.username})
        if (user === null) {
          return {
            exists: false
          }
        } else {
          return {
            exists: true
          }
        }
      })
    }
  })
  server.logging = true;
  return server
}