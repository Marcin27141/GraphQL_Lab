const database = require('./database_api');
const sql = require('mssql');
const users_api = require('./users_api');
const db_errors = require('./database_errors');

async function getAllTodos() {
    let todos = await database.executeSimpleQuery("SELECT * FROM Todos");
    return todos.recordset.map(({ Id, Title, Completed, UserId }) => ({
        id: Id,
        title: Title,
        completed: Completed,
        user_id: UserId,
    }));
}

async function getTodoById(id) {
    let todos = await getAllTodos();
    return todos.find(t => t.id == id);
}

async function testIfTodoWithIdExists(todoId) {
    var todo = await getTodoById(todoId);
    if (todo == null)
        throw new db_errors.TodoDoesntExistException(`Todo with id ${todoId} does not exist`);
}

async function getMaxId() {
    let countQuery = await database.executeSimpleQuery('SELECT MAX(Id) AS maxId FROM Todos');
    return countQuery.recordset[0]['maxId'];
}

async function addTodo(title, completed, userId) {
    await users_api.testIfUserWithIdExists(userId);
    let maxId = await getMaxId();
    let nextId = 1 + maxId;
    let request = await database.getRequest();
    await request
        .input('id', sql.Int, nextId)
        .input('title', sql.VarChar(256), title)
        .input('completed', sql.Bit, completed)
        .input('userId', sql.Int, userId)
        .query('insert into Todos(id, title, completed, userId) values(@id, @title, @completed, @userId)');
    
    return nextId;
}

async function updateTodo(id, title, completed, userId) {
    await testIfTodoWithIdExists(id);
    await users_api.testIfUserWithIdExists(userId);
    let request = await database.getRequest();
    let result = await request
        .input('id', sql.Int, id)
        .input('title', sql.VarChar(256), title)
        .input('completed', sql.Bit, completed)
        .input('userId', sql.Int, userId)
        .query('update Todos set title = @title, completed = @completed, userId = @userId where id = @id');
    
    return result.rowsAffected[0] == 0 ? false : true;
}

async function removeTodo(id) {
    await testIfTodoWithIdExists(id);
    let request = await database.getRequest();
    let result = await request
        .input('id', sql.Int, id)
        .query('delete from Todos where Id = @id');
    
    return result.rowsAffected[0] == 0 ? false : true;
}

module.exports = {
    getAllTodos: getAllTodos,
    getTodoById: getTodoById,
    addTodo: addTodo,
    updateTodo: updateTodo,
    removeTodo: removeTodo,
};