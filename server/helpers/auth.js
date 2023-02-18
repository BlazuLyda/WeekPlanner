import { ClientError } from "./errors.js";
import User from "../model/User.js"
import bcrypt from "bcrypt";

export async function authUser(req, res, next) {
  const userId = req.session.userId
  if (userId) {
    const user = await User.getOne(userId)
    if (user) return next()
  }
  next(new ClientError("Unauthorized access", 401))
}