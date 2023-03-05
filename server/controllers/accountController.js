import UserDAO from "../model/User.js"
import { ClientError } from "../helpers/errors.js"
import mongoose from "mongoose";

const accountController = {}

accountController.view = async (req, res, next) => {
  try {
    const usersData = await UserDAO.getAll()
    res.json(usersData)
  } catch (err) {
    next(err)
  }
}

accountController.find = async (req, res, next) => {
  try {
    const id = req.session.userId
    const userData = await UserDAO.getOne(id)
    res.json(userData);
  } catch (err) {
    next(err)
  }
}

accountController.edit = async (req, res, next) => {
  const id = req.session.userId
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password

  try {
    if (email !== undefined && await UserDAO.getByEmail(email)) {
      return next(new ClientError(`User with email ${email} already exists`))
    }

    const updatedUser = await UserDAO.update(id, name, email, password)
    res.json({ message: "Account successfully updated", data: updatedUser })

  } catch (err) {
    if (err instanceof mongoose.Error.ValidatorError) {
      return next(new ClientError(err.message, 400))
    }
    next(err)
  }
}

accountController.remove = async (req, res, next) => {
  const id = req.session.userId
  try {
    await UserDAO.delete(id)
  } catch (err) {
    next(err)
  }
}

accountController.create = async (req, res, next) => {
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password

  try {
    const sameEmailCount = await UserDAO.getByEmail(email)
      .then(() => { throw new ClientError(`User with email ${email} already exists`) })
      .catch(() => {})

    const newUser = await UserDAO.addUser(name, email, password)
    res.json({ message: "Account successfully created", data: newUser })

  } catch (err) {
    if (err instanceof mongoose.Error.ValidatorError) {
      return next(new ClientError(err.message, 400))
    }
    next(err)
  }
}

export default accountController