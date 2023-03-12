import bankDAO from "../model/bankDAO.js";
import {Task} from "../model/Task.js";
import mongoose from "mongoose";
import {ClientError} from "../helpers/errors.js";

const bankController = {}

/**
 * @param req.session
 * @param {ObjectId} req.params.taskId
 */
bankController.all = async (req, res, next) => {
  try {
    const bank = await bankDAO.getBank(req.session.userId)
    res.json(bank)

  } catch (err) {
    next(err)
  }
}

bankController.one = async (req, res, next) => {
  try {
    const task = await bankDAO.getFromBank(req.session.userId, req.params.taskId)
    res.json({ "task": task })

  } catch (err) {
    next(err)
  }
}

bankController.create = async (req, res, next) => {
  try {
    const newTask = new Task({ ...req.body })
    const addedTask = await bankDAO.addToBank(req.session.userId, newTask)
    res.json({ "addedTask": addedTask })

  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new ClientError(err.message, 400))
    }
    next(err)
  }
}

bankController.edit = async (req, res, next) => {
  try {
    const updatedTask = await bankDAO.updateBank(req.session.userId, req.params.taskId, req.body)
    res.json({ updatedTask: updatedTask })

  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new ClientError(err.message, 400))
    }
    next(err)
  }
}

bankController.remove = async (req, res, next) => {
  try {
    const deletedTask = await bankDAO.removeFromBank(req.session.userId, req.params.taskId)
    res.json({ deletedTask: deletedTask })

  } catch (err) {
    next(err)
  }
}

export default bankController