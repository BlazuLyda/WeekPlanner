import mongoose from "mongoose"

// User model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  psw: { type: String, required: true },
})

const User = mongoose.model("User", userSchema)

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

User.addUser = async (name, email, psw) => {
  const newUser = new User({
    name: name,
    email: email,
    psw: psw
  });
  await newUser.save()
}

export default User