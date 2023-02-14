const express = require("express")
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const path = require("path");

const router = express.Router()

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  psw: { type: String, required: true },
})

const User = mongoose.model("User", userSchema)

// Populate User with sample data
// User.collection.drop()
//   .then(() =>
//     User.insertMany(users)
//     .then(() => console.log('Populated with example data'))
//     .catch((error) => console.log(error)))
//   .catch((error) => console.log(error))

router.get("/", async (req, res) => {
  try {
    const usersData = await User.find()
    res.send(usersData)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get("/create", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/create-user.html"))
})

router.post("/create", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    psw: req.body.password
  });

  await newUser.save()
  res.redirect(req.baseUrl + req.path);
})

module.exports = router