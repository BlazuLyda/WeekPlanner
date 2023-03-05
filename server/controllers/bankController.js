import UserDAO from "../model/User.js";
import { Activity } from "../model/Activity.js";


const bankController = {}

bankController.view = async (req, res, next) => {
  try {
    const bank = await UserDAO.getBank(req.session.userId)
    res.json(bank)

  } catch (err) {
    next(err)
  }
}

bankController.create = async (req, res, next) => {
  try {
    const newActivity = new Activity({ ...req.body })
    await UserDAO.addToBank(req.session.userId, newActivity)
    req.json({ message: "Activity successfully added" })

  } catch (err) {
    next(err)
  }
}

bankController.remove = async (req, res, next) => {
  try {
    const deletedActivity = await UserDAO.removeBank(req.session.userId, req.body.activityId)
    req.json({ deletedActivity: deletedActivity })

  } catch (err) {
    next(err)
  }
}

export default bankController