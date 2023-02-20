import mongoose from "mongoose"
import bcrypt from "bcrypt"

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
})

// Password hashing middleware
userSchema.pre(["save", /[uU]pdate$/], async function(next) {
  if (this.isModified("password") || this.isNew) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

const User = mongoose.model("User", userSchema)
export default User

// Dataset manipulation methods
User.getAll = async () => {
  return User.find()
}

User.getOne = async (id) => {
  return User.find({ _id: id })
}

User.getByEmail = async (email) => {
  const userData = await User.find({ email: email }).lean()
  return Array.from(userData)[0]
}

User.addUser = async (name, email, password) => {
  const newUser = new User({
    name: name,
    email: email,
    password: password
  });
  await newUser.save()
  return newUser
}