import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { ClientError } from "../helpers/errors.js";
import { Activity } from "./Activity.js";

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
    required: true,
    match: /(?=.*[A-Z]+.*)(?=.*[a-z]+.*)^[\w.\-!#+\/?*@=$%&]{8,40}$/u
  },
  activityBank: [ Activity ],
  currentWeek: {
    type: Map,
    of: [ Activity ]
  },
  nextWeek: {
    type: Map,
    of: [ Activity ]
  },
  schedules: {
    type: Map,
    of: [ Activity ]
  }
})

// Password hashing middleware
userSchema.pre(["save", /[uU]pdate$/], async function(next) {
  if (this.isModified("password") || this.isNew) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

const User = mongoose.model("User", userSchema)
const UserDAO = {}

export default UserDAO

// Dataset manipulation methods
UserDAO.getAll = async () => {
  return User.find().exec()
}

// Singular methods throw error if nothing is found or modified
UserDAO.getOne = async (id) => {
  const userData = await User.findById(id).exec();
  if (!userData) {
    throw new ClientError(`User with id ${id} does not exist`, 404)
  }
  return userData
}

UserDAO.getByEmail = async (email) => {
  const userData = await User.findOne({ email: email }).exec();
  if (!userData) {
    throw new ClientError(`User with email ${email} does not exist`, 404)
  }
  return userData
}

UserDAO.addUser = async (name, email, password) => {
  const newUser = new User({
    name: name,
    email: email,
    password: password
  });
  await newUser.save()
  return newUser
}

UserDAO.update = async (id, name, email, password) => {
  const updatedUser = await User.findByIdAndUpdate(id, {
    name: name,
    email: email,
    password: password
  }).exec()

  if (!updatedUser) {
    throw new ClientError(`User with id ${id} does not exist`, 404)
  }
  return updatedUser
}

UserDAO.delete = async (id) => {
  User.findByIdAndDelete(id)
}

// Activity bank access methods
UserDAO.getBank = async (userId) => {
  const userData = await UserDAO.getOne(userId)
  return userData.activityBank
}

UserDAO.addToBank = async (userId, activity) => {
  const userData = await UserDAO.getOne(userId)
  userData.activityBank.push(activity)
  await userData.save()
}

UserDAO.removeBank = async (userId, activityId) => {
  const userData = await UserDAO.getOne(userId)
  return userData.activityBank.findByIdAndDelete(activityId)
}

