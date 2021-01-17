import { createServer, Model, belongsTo } from "miragejs"

export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
      course: Model.extend({
        owner: belongsTo('user')
      })
    },

    seeds(server) {
      server.create("user", { name: "admin", role: 'admin', password: 'admin' })
      server.create("user", { name: "Bob", role: "user", password: 'bob' })
      let alice = server.create("user", { name: "Alice", role: "user", password: 'alice' })
      server.create("course", { title: "Vuex Course", owner: alice })
      // server.create("course", {owner: 'user'})
    },

    routes() {
      this.namespace = "api"

      this.get("/users", (schema) => {
        return schema.users.all()
      })
      this.get("/courses", (schema) => {
        console.log('hello world')
        console.log(schema.courses.all())
        return schema.courses.all()
      })
    },
  })

  return server
}