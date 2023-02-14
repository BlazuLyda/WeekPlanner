const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

// Database config
const dbUrl = "mongodb+srv://mongo:zvXycqaSRMC7zZ6@cluster0.vypym1r.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(dbUrl)

// Express app config
const app = express()
const ROOT = "/api"
const usersRouter = require("./routers/users")

app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(path.join(ROOT, "users"), usersRouter)

app.get("/", (req, res) => {
  res.send("Hello World!")
})




const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})