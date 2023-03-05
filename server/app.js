import * as dotenv from 'dotenv'
dotenv.config()

import express from "express"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import session from "express-session"
import connect_mongodb_session from "connect-mongodb-session"
import cors from "cors"

import accountRouter from "./routers/account.js"
import sessionRouter from "./routers/session.js"
import { errorHandler } from "./helpers/errorHandler.js"

// Database config
const MONGODB_URI = process.env.URI
await mongoose.connect(MONGODB_URI)

// Session storage config
const MongoDBStore = connect_mongodb_session(session);
const sessionStore = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
})

// Express app config
const app = express()
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

// Session storage middleware
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    unset: "destroy",
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      domain: "localhost",
      sameSite: true
    }
  })
);

// Body parsing
// app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Request handlers
app.use("/session", sessionRouter)
app.use("/account", accountRouter)

app.get("/create", (req, res) => {
  console.log("sending a file");
  res.sendFile( "/", { root: import.meta.url })
})

app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})