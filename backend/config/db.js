const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',       // 🔥 BLANK PASSWORD
  database: 'test',
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.log('❌ DB Error:', err.message);
  } else {
    console.log('✅ MySQL Connected Successfully');
  }
});

module.exports = db;
