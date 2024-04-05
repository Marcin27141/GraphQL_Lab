const axios = require("axios"); 
const { log } = require('node:console');

async function todoById(parent, args, context, info){
    let todos = await getRestTodosList();
    return todos.find(t => t.id == args.id);
}
async function userById(parent, args, context, info){
    let users = await getRestUsersList();
    return users.find(u => u.id == args.id);
}

async function getRestUsersList(){
    try {
        const users = await axios.get("https://jsonplaceholder.typicode.com/users")
        console.log(users);
        return users.data.map(({ id, name, email, username }) => ({
        id: id,
        name: name,
        email: email,
        login: username,
        }))
    } catch (error) {
        throw error
    }
}

async function getRestTodosList(){
    try {
        const todos = await axios.get("https://jsonplaceholder.typicode.com/todos")
        console.log(todos);
        return todos.data.map(({ userId, id, title, completed }) => ({
        id: id,
        title: title,
        completed: completed,
        user_id: userId,
        }))
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllTodos: getRestTodosList,
    getAllUsers: getRestUsersList,
    getTodoById: todoById,
    getUserById: userById,
};