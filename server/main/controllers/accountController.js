import userDAO from "../data/daos/userDAO.js"
import {ClientError} from "../helpers/errors.js"
import mongoose from "mongoose";

const accountController = {}

accountController.view = async (req, res, next) => {
  try {
    const usersData = await userDAO.getAll()
    res.json(usersData)
  } catch (err) {
    next(err)
  }
}

accountController.find = async (req, res, next) => {
  try {
    const id = req.session.userId
    const userData = await userDAO.getOne(id)
    res.json(userData);
  } catch (err) {
    next(err)
  }
}

accountController.edit = async (req, res, next) => {
  const id = req.session.userId
  const { name, email, password } = req.body

  try {
    if (email !== undefined && await userDAO.getByEmail(email)) {
      return next(new ClientError(`User with email ${email} already exists`))
    }

    const updatedUser = await userDAO.update(id, name, email, password)
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
    await userDAO.delete(id)
  } catch (err) {
    next(err)
  }
}

accountController.create = async (req, res, next) => {
  const { name, email, password } = req.body

  try {
    await userDAO.getByEmail(email)
      .then(() => { throw new ClientError(`User with email ${email} already exists`) })
      .catch(() => {})

    const newUser = await userDAO.addUser(name, email, password)
    res.json({ message: "Account successfully created", data: newUser })

  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new ClientError(err.message, 400))
    }
    next(err)
  }
}

export default accountController