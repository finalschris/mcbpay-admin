var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mcbpay"
});

con.query('SELECT * FROM users where status ="active" ',function(err,rows){
  if(err) throw err;

  for (var i = 0; i < rows.length; i++) {
    console.log(rows[i].username);
  };

});

