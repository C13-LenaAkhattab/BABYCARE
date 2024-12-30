const express = require("express");
const cors = require("cors");
require('dotenv').config();
require("./models/db"); 
const usersRouter = require("./routes/users"); 
const rolesRouter=require("./routes/roles")
const foodRouter=require("./routes/food")
const adviceRouter=require("./routes/advice")

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);
app.use("/roles" , rolesRouter)
app.use("/food", foodRouter)
app.use("/advice", adviceRouter)




// Handle undefined routes
app.use("*", (req, res) => res.status(404).json("No content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
