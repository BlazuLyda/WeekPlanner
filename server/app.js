import bodyParser from "body-parser"
import express from "express"
import path from "path"
import mongoose from "mongoose"
import session from "express-session"
import connect_mongodb_session from "connect-mongodb-session"
import usersRouter from "./routers/users.js";

// Database config
const MONGODB_URI = "mongodb+srv://mongo:zvXycqaSRMC7zZ6@cluster0.vypym1r.mongodb.net/?retryWrites=true&w=majority"
await mongoose.connect(MONGODB_URI)

// Session storage config
const MongoDBStore = connect_mongodb_session(session);
const sessionStore = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
})

// Express app config
const app = express()
const ROOT = "/api"

// Session storage middleware
app.use(
  session({
    secret: "JQKnfBRmONm0Gek1v83T1g3O7NC85ui3",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

// Body parsing
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Path handlers
app.use(path.join(ROOT, "users"), usersRouter)

app.get("/", (req, res) => {
  res.send("Hello World!")
})
app.get("/create", (req, res) => {
  console.log("sending a file");
  res.sendFile( "/", { root: import.meta.url })
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})