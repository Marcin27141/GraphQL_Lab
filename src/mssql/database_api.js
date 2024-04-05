const sql = require('mssql');

const config = {
  user: "sa",
  password: "P@ssw0rd",
  server: "localhost",
  database: "GraphQL_Example",
  options: {
      enableArithAbort: true,
      trustServerCertificate: true,
  },
};

async function getRequest() {
    const pool = await sql.connect(config);
    return pool.request();
}

async function executeSimpleQuery(query) {
    let request = await getRequest();
    return request.query(query);
}

module.exports = {
    getRequest: getRequest,
    executeSimpleQuery: executeSimpleQuery
};