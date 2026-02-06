const pool = require("../db");

// REGISTER
exports.registerUser = (req, res) => {
  const { name, email, password } = req.body;

  pool.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password],
    (err, result) => {
      if (err) {
        console.log("Register error:", err);
        return res.status(500).json({ message: "Register failed" });
      }
      res.json({ message: "✅ User registered successfully" });
    }
  );
};

// LOGIN
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  pool.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, result) => {
      if (err) {
        console.log("Error finding user:", err);
        return res.status(500).json({ message: "DB error" });
      }

      if (result.length === 0) {
        return res.status(401).json({ message: "User not found" });
      }

      if (result[0].password !== password) {
        return res.status(401).json({ message: "Wrong password" });
      }

      res.json({
        message: "✅ Login successful",
        user: result[0],
      });
    }
  );
};
