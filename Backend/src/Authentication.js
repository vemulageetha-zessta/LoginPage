// Import statements
const mysql = require("mysql");

//custom imports
const { tokenGenerator } = require("./TokenGeneration");

const connection = mysql.createConnection({
  //properties...
  host: "localhost",
  user: "root",
  password: "geetha@26",
  database: "users",
  multipleStatements: true,
});

connection.connect((error) => {
  if (error) {
    console.log("Error", 'There is an error in DB connection');
  } else {
    console.log("connection to DB is successful");
  }
});

const executeQuery = (query) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, rows) => {
      if (err) {
        reject(err);
      } else if (rows.length > 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    })
  });
};

const selectQuery = (query) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, rows) => {
      if (err) {
        reject(err);
      } else if (rows.length > 0) {
        resolve(rows[0]);
      } else {
        resolve(false);
      }
    });
  });
};

const authenticate = async (username, password) => {
  const query = `select * from userDetails where email='${username}' and password='${password}'`;
  const dbresponse = await executeQuery(query);
  if (dbresponse) {
    const token = tokenGenerator({ username });
    return token;
  } else {
    return "Enter a valid user details";
  }
};

const userDetails = async (username) => {
  const query = `select * from userDetails where email = '${username}'`;
  const dbresponse = await selectQuery(query);
  return dbresponse;
};

module.exports = {
  authenticate,
  userDetails,
};
