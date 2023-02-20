import User from "../model/User.js";
import { ClientError } from "../helpers/errors.js";
import bcrypt from "bcrypt";

export async function login(req, res, next) {
  const { email, password } = req.body

  const user = await User.getByEmail(email)
  const validatePassword = () => bcrypt.compareSync(password, user.password)
  if (!user || !validatePassword()) {
    next(new ClientError("Invalid user password combination"), 400)
  }

  // Create new session
  req.session.userId = user._id
  res.send("Logged in successfully")
}

export async function logout(req, res, next) {
  req.session.destroy()
  res.send("Logged out successfully")
}

