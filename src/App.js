const { createServer } = require('node:http')
const { createSchema, createYoga } = require('graphql-yoga')
const database_api = require('./database_api');

const yoga = createYoga({
  schema: createSchema({
    typeDefs: `
      type Query {
        demo: String!
        todos: [ToDoItem!]
        todo(id: ID!): ToDoItem
        users: [User!]
        user(id: ID!): User
      }
      type ToDoItem{
        id: ID!
        title: String!
        completed: Boolean!
        user: User!
      }
      type User{
        id: ID!
        name: String!
        email: String!
        login: String!
        todos: [ToDoItem!]!
      }        
    `,
    resolvers: {
      Query: {
        demo: () => 'Witaj, GraphQL działa!',
        users: async () => database_api.getAllUsers(),
        todos: async () => database_api.getAllTodos(),
        todo: async (parent, args, context, info) => database_api.getTodoById(args),
        user: async (parent, args, context, info) => database_api.getUserById(args),
      },
      User:{
        todos: async (parent, args, context, info) => {
          let todos = await database_api.getAllTodos();
          return todos.filter(t => t.user_id == parent.id);
        }
      },
      ToDoItem:{
        user: async (parent, args, context, info) => {
          let users = await database_api.getAllUsers();
          return users.find(u => u.id == parent.user_id);
        }
      }
    }
  })
})

const server = createServer(yoga)

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})