const express = require("express");
const cors = require("cors");
require('dotenv').config();
require("./models/db");  // Assuming this file connects to MongoDB
const usersRouter = require("./routes/users");  // Fixed the import here

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Use the usersRouter for any routes starting with "/users"
app.use("/users", usersRouter);

// Handle undefined routes
app.use("*", (req, res) => res.status(404).json("No content at this path"));



app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
