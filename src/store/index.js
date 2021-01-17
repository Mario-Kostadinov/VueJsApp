import { createStore } from 'vuex'


export default createStore({
  state(){
    return {
      counter: 0,
      user: {
        id: 3,
        username: 'mariog',
        token: '1234'
      }
    }
  }
})
