import userDAO from "./userDAO.js";
import {ClientError} from "../../helpers/errors.js";

const weekDAO = {}

weekDAO.getScheduleId = async (userId, week) => {
    const userData = await userDAO.getOne(userId)
    return userData.weeks.get(week).scheduleId
}

weekDAO.setScheduleId = async (userId, week, scheduleId) => {
    const userData = await userDAO.getOne(userId)
    userData.weeks.get(week).scheduleId = scheduleId
    await userData.save()
}

weekDAO.getActivities = async (userId, week, day) => {
    const userData = await userDAO.getOne(userId)
    return userData.week.get(week).get(day).activities
}

weekDAO.getActivity = async (userId, week, day, activityId) => {
    const activities = await weekDAO.getActivities(userId, week, day)
    const activityToReturn = activities.id(activityId)
    return activityToReturn ||
        throw new ClientError(`Activity with id ${activityId} not found`, 404)
}

weekDAO.addActivity = async (userId, week, day, activity) => {
    const activities = weekDAO.getActivities(userId, week, day)
    activities.push(activity)
    await activities.ownerDocument().save()
        .catch((err) => { throw new ClientError("Invalid activity data") })
    return activities[activities.length - 1]
}

weekDAO.removeActivity = async (userId, week, day, activityId) => {
    const activities = weekDAO.getActivities(userId, week, day)
    const removedActivity = activities.id(activityId)
    if (!removedActivity) {
        throw new ClientError(`Activity with id ${activityId} not found`, 404)
    }
    activities.id(activityId).remove()
    await activities.ownerDocument().save()
    return removedActivity
}

export default weekDAO