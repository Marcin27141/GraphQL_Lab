const database = require('./database_api');
const sql = require('mssql');

async function getAllUsers() {
    let users = await database.executeSimpleQuery("SELECT * FROM Users");
    return users.recordset.map(({ Id, Name, Email, Login }) => ({
        id: Id,
        name: Name,
        email: Email,
        login: Login,
    }));
}

async function getUserById(id) {
    let users = await getAllUsers();
    return users.find(u => u.id == id);
}

async function getUsersCount() {
    let countQuery = await database.executeSimpleQuery('SELECT COUNT(*) AS totalCount FROM Users');
    return countQuery.recordset[0]['totalCount'];
}

async function addUser(name, email, login) {
    let currentCount = await getUsersCount();
    let nextId = 1 + currentCount;
    let request = await database.getRequest();
    await request
        .input('id', sql.Int, nextId)
        .input('name', sql.VarChar(32), name)
        .input('email', sql.VarChar(32), email)
        .input('login', sql.VarChar(32), login)
        .query('insert into Users(id, name, email, login) values(@id, @name, @email, @login)');
    
    return nextId;
}

async function updateUser(id, name, email, login) {
    let request = await database.getRequest();
    let result = await request
        .input('id', sql.Int, id)
        .input('name', sql.VarChar(32), name)
        .input('email', sql.VarChar(32), email)
        .input('login', sql.VarChar(32), login)
        .query('update Users set name = @name, email = @email, login = @login where id = @id');
    
    return result.rowsAffected[0] == 0 ? false : true;
}

async function removeUserTodos(userId) {
    let request = await database.getRequest();
    let result = await request
        .input('userId', sql.Int, userId)
        .query('delete from Todos where UserId = @userId');
    
    return result.rowsAffected[0] == 0 ? false : true;
}

async function removeUser(id) {
    await removeUserTodos(id);

    let request = await database.getRequest();
    let result = await request
        .input('id', sql.Int, id)
        .query('delete from Users where Id = @id');
    
    return result.rowsAffected[0] == 0 ? false : true;
}

module.exports = {
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    addUser: addUser,
    updateUser: updateUser,
    removeUser: removeUser,
};