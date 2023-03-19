import weekDAO from "../data/daos/weekDAO.js";
import {Activity} from "../data/models/Activity.js";
import scheduleDAO from "../data/daos/scheduleDAO.js";
import {ClientError} from "../helpers/errors.js";

const weekController = {}

/**
 * @param req.session
 * @param {string} req.params.day
 * @param {string} req.params.week
 * @param {ObjectId} req.params.activityId
 */
weekController.getSchedule = async (req, res, next) => {
    try {
        const userId = req.session.userId
        const week = req.params.week
        const scheduleId = await weekDAO.getScheduleId(userId, week)
        const schedule = await scheduleDAO.getOneSchedule(userId, scheduleId)

        if (!schedule) {
            return next(new ClientError("Schedule associated with this week not found", 404))
        }
        res.json({ schedule: schedule })
    } catch (err) {
        next(err)
    }
}

weekController.addSchedule = async (req, res, next) => {
    try {
        const userId = req.session.userId
        const { week, scheduleId } = req.params
        const currentScheduleId = await weekDAO.getScheduleId(userId, week)

        if (currentScheduleId) {
            const errorMessage = currentScheduleId === scheduleId ?
                "This schedule is already applied to this week" :
                "The week has already a schedule assigned, you should delete it first"
            return next(new ClientError(errorMessage))
        }

        await weekDAO.setScheduleId(userId, week, scheduleId)
        const activitiesToAdd = await scheduleDAO.getOneSchedule(userId, scheduleId).activities
        for (const activity of activitiesToAdd) {
            await weekDAO.addActivity(userId, week, activity.dayOfWeek, activity)
        }
        res.json({ message: `${activitiesToAdd.length} activities added to the ${week} week`})

    } catch (err) {
        next(err)
    }
}

weekController.remove

weekController.allActivities = async (req, res, next) => {
    try {
        const userId = req.session.userId
        const { week, day } = req.params

        const activities = await weekDAO.getActivities(userId, week, day)
        res.json({ "activities" : activities })

    } catch (err) {
        next(err)
    }
}

weekController.oneActivity = async (req, res, next) => {
    try {
        const userId = req.session.userId
        const { week, day, activityId } = req.params

        const activity = await weekDAO.getActivity(userId, week, day, activityId)
        res.json({ "activity": activity })

    } catch (err) {
        next(err)
    }
}

weekController.createActivity = async (req, res, next) => {
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