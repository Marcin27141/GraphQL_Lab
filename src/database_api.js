var sql = require('mssql');

var config = {
  user: "sa",
  password: "P@ssw0rd",
  server: "localhost",
  database: "GraphQL_Example",
  options: {
      enableArithAbort: true,
      trustServerCertificate: true,
  },
};

function ExecuteSQL(query) {
    return new Promise((resolve, reject) => {
        sql.connect(config, (err, db) => {
            if (err) reject(err);
            var request = new sql.Request();
            request.query(query, (err, db) => {
                if (err) reject(err);
                resolve(db);
            });
        });
    });
}

async function getAllTodos() {
    let todos = await ExecuteSQL("SELECT * FROM Todos");
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

async function getUserById(id) {
    let users = await getAllUsers();
    return users.find(u => u.id == id);
}

async function getAllUsers() {
    let users = await ExecuteSQL("SELECT * FROM Users");
    return users.recordset.map(({ Id, Name, Email, Login }) => ({
        id: Id,
        name: Name,
        email: Email,
        login: Login,
    }));
}

module.exports = {
    getAllTodos: getAllTodos,
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    getTodoById: getTodoById,
};