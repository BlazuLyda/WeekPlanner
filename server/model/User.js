import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {ClientError} from "../helpers/errors.js";
import {activitySchema} from "./Activity.js";
import {weekSchema} from "./Week.js";
import {taskSchema} from "./Task.js";

// User model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    match: /^\p{L}{1,20}$/u
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /(?![.\-_].*)(?!.*[.\-_]@)(?!.*[_\-.]{2,}.*)^[a-z|0-9|_\-.]+@[a-z|0-9|-]+\.[a-z]{2,4}$/ui
  },
  password: {
    type: String,
    required: true
    // Password validation in 'pre save' middleware
  },
  taskBank: [ taskSchema ],
  weeks: {
    current: weekSchema,
    next: weekSchema
  },
  schedules: [{
    _id: { type: String, required: true, unique: true }, // name of schedule
    activities: [activitySchema]
  }]
})

// Password validation and hashing middleware
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    if (!this.password.match(/(?=.*[A-Z]+.*)(?=.*[a-z]+.*)^[\w.\-!#+\/?*@=$%&]{8,40}$/u)) {
      throw new ClientError("Path password does not meet the requirements")
    }
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

userSchema.pre([/^.*[uU]pdate$/], async function (next) {
  const newPassword = this.getUpdate().password
  if (newPassword) {
    if (!newPassword.match(/(?=.*[A-Z]+.*)(?=.*[a-z]+.*)^[\w.\-!#+\/?*@=$%&]{8,40}$/u)) {
      throw new ClientError("Path password does not meet the requirements")
    }
    this.getUpdate().password = await bcrypt.hash(newPassword, 10)
  }
  next()
})

const User = mongoose.model("User", userSchema)

export default User