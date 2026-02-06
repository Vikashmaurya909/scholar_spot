const express = require("express");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const path = require("path");
const cors = require("cors");

const db = require("./db"); // ✅ ONLY THIS

const app = express();

// Static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Session Store (USING SAME DB)
const sessionStore = new MySQLStore({}, db);

// Session middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

app.use(express.json());

// Routes
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

app.use("/api/users", userRoutes);
app.use("/api", blogRoutes);

// Start server
app.listen(5000, () => {
  console.log("🚀 Server is running on port 5000");
});
