//Getting mysql connection
const connection = require("./connection.js");

function createQmarks(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

function translateSql(ob) {
  var arr = [];
  for (var key in ob) {
    var value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
}


var orm = {
  //Select all
  selectAll: function (table, cb) {
    let queryString = "SELECT * FROM" + table + ";";
    connection.query(queryString, (err, data) => {
      if (err) {
        throw err;
      }
      cb(data);
    });
  },

  //Insert
  insertOne: function (table, cols, vals, cb) {
    let queryString =
      "INSERT INTO" +
      table +
      "(" +
      cols.toStrings() +
      ")" +
      "VALUES (" +
      createQmarks(vals.length) +
      ")";

    console.log(queryString);
    connection.query(queryString, val, (err, data) => {
      if (err) {
        throw err;
      }
      cb(data);
    });
  },
  //Update
  updateOne: function (table, objColVals, condition, cb) {
    let queryString =
      "UPDATE" + table + "SET" + translateSql(objColVals) + "WHERE" + condition;
    
      connection.query(queryString, (err, data) => {
      if (err) {
        throw err;
      }
      cb(data);
    });
  },
  deleteOne: function(table,condition,cb) {
      let queryString= "DELETE FROM" + table + "WHERE" + condition;

  }
};
 connection.query(queryString, (err, data) => {
   if (err) {
     throw err;
   }
   cb(data);
 });

module.exports = orm;
