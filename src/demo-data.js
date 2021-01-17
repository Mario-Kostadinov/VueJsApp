export default {
  users: [
    {
      username: 'mario',
      password: '123',
      enrolledCourses: [1,2],
      roles: ['user'],
      id: 1
    },
    {
      username: 'maya',
      password: '321',
      enrolledCourses: [1],
      roles: ['admin'],
      id: 2
    }
  ],
  courses: [
    {
      id: 1,
      title: 'Demo Course One',
      description: 'Demon Description for Course one!',
      imageUrl: "https://images.unsplash.com/photo-1585076641399-5c06d1b3365f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      isPublic: true,
      lectures: [123,1234],
      users: [1,2]
    }
  ],
  lectures: [
    
  ]
}