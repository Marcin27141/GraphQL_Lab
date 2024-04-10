const { createServer } = require('node:http')
const { createSchema, createYoga } = require('graphql-yoga')
const { GraphQLError } = require('graphql')
const users_api = require('./mssql/users_api');
const todos_api = require('./mssql/todos_api');

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
      type Mutation {
        postUser(name: String!, email: String!, login: String!): User!
        updateUser(id: ID!, name: String!, email: String!, login: String!): User!
        deleteUser(id: ID!): Boolean!
        postTodo(title: String!, completed: Boolean!, userId: ID!): ToDoItem!
        updateTodo(id: ID!, title: String!, completed: Boolean!, userId: ID!): ToDoItem!
        deleteTodo(id: ID!): Boolean!
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
        users: async () => users_api.getAllUsers(),
        todos: async () => todos_api.getAllTodos(),
        todo: async (parent, args, context, info) => todos_api.getTodoById(args.id),
        user: async (parent, args, context, info) => users_api.getUserById(args.id),
      },
      Mutation: {
        postUser: withErrorHandling(async (parent, args) => {
          let id = await users_api.addUser(args.name, args.email, args.login);
          return users_api.getUserById(id);
        }),
        updateUser: withErrorHandling(async (parent, args) => {
          let result = await users_api.updateUser(args.id, args.name, args.email, args.login);
          return result ? await users_api.getUserById(args.id) : null;
        }),
        deleteUser: withErrorHandling(async (parent, args) => {
          let result = await users_api.removeUser(args.id);
          return result;
        }),
        postTodo: withErrorHandling(async (parent, args) => {
          let id = await todos_api.addTodo(args.title, args.completed, args.userId);
          return todos_api.getTodoById(id);
        }),
        updateTodo: withErrorHandling(async (parent, args) => {
          let result = await todos_api.updateTodo(args.id, args.title, args.completed, args.userId);
          return result ? await todos_api.getTodoById(args.id) : null;
        }),
        deleteTodo: withErrorHandling(async (parent, args) => {
          let result = await todos_api.removeTodo(args.id);
          return result;
        }),
      },
      User:{
        todos: async (parent, args) => {
          let todos = await todos_api.getAllTodos();
          return todos.filter(t => t.user_id == parent.id);
        }
      },
      ToDoItem:{
        user: async (parent, args) => {
          let users = await users_api.getAllUsers();
          return users.find(u => u.id == parent.user_id);
        }
      }
    }
  })
})

function withErrorHandling(resolver) {
  return async (parent, args) => {
      try {
          return await resolver(parent, args);
      } catch (error) {
          return returnErrorMessage(error);
      }
  };
}

function returnErrorMessage(e) {
  return Promise.reject(
    new GraphQLError(e.message)
  );
}

const server = createServer(yoga)

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})