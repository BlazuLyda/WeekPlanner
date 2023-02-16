import mongoose from "mongoose"

// User model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  psw: { type: String, required: true },
})

const User = mongoose.model("User", userSchema)

// Database access methods
User.getAll = async () => {
  try {
    return await User.find()
  } catch (e) {
    console.log(e);
    return {}
  }
}

User.getOne = async (id) => {
  try {
    return await User.find({ _id: id })
  } catch (e) {
    // console.log(e);
    return null
  }
}

User.findByEmail = async (email) => {
  try {
    return await User.find({ email: email })
  } catch (e) {
    // console.log(e);
    return null
  }
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