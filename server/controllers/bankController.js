import UserDAO from "../model/User.js";
import {Activity} from "../model/Activity.js";

const bankController = {}

bankController.all = async (req, res, next) => {
  try {
    const bank = await UserDAO.getBank(req.session.userId)
    res.json(bank)

  } catch (err) {
    next(err)
  }
}

bankController.one = async (req, res, next) => {
  try {
    const activity = await UserDAO.getFromBank(req.session.userId, req.params.activityId)
    res.json({ "activity": activity })

  } catch (err) {
    next(err)
  }
}

bankController.create = async (req, res, next) => {
  try {
    const newActivity = new Activity({ ...req.body })
    const addedActivity = await UserDAO.addToBank(req.session.userId, newActivity)
    res.json({ "addedActivity": addedActivity })

  } catch (err) {
    next(err)
  }
}

bankController.remove = async (req, res, next) => {
  try {
    const deletedActivity = await UserDAO.removeFromBank(req.session.userId, req.params.activityId)
    res.json({ deletedActivity: deletedActivity })

  } catch (err) {
    next(err)
  }
}

export default bankController