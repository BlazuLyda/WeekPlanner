import weekDAO from "../model/weekDAO.js";
import {Activity} from "../model/Activity.js";

const weekController = {}

/**
 * @param req.session
 * @param {string} req.params.day
 * @param {string} req.params.week
 * @param {ObjectId} req.params.activityId
 */
weekController.all = async (req, res, next) => {
    try {
        const userId = req.session.userId
        const { week, day } = req.params

        const activities = await weekDAO.getActivities(userId, week, day)
        res.json({ "activities" : activities })

    } catch (err) {
        next(err)
    }
}

weekController.one = async (req, res, next) => {
    try {
        const userId = req.session.userId
        const { week, day, activityId } = req.params

        const activity = await weekDAO.getActivity(userId, week, day, activityId)
        res.json({ "activity": activity })

    } catch (err) {
        next(err)
    }
}

weekController.create = async (req, res, next) => {
    try {
        const userId = req.session.userId
        const { week, day } = req.params
        const newActivity = new Activity({ ...req.body })

        const addedActivity = await weekDAO.addActivity(userId, week, day, newActivity)
        res.json({ "addedActivity": addedActivity })

    } catch (err) {
        next(err)
    }
}

export default weekController