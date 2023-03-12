import userDAO from "./userDAO.js";
import {ClientError} from "../helpers/errors.js";

const weekDAO = {}

weekDAO.getActivities = async (userId, week, day) => {
    const userData = await userDAO.getOne(userId)
    const activities = userData[week][day]
    return activities
}

weekDAO.getActivity = async (userId, week, day, activityId) => {
    const userData = await userDAO.getOne(userId)
    const activities = userData.weeks.get(week).get(day)
    const activityToReturn = activities.filter((activity) => activity._id.toString() === activityId)[0]
    if (!activityToReturn) {
        throw new ClientError("Activity with specified id does not exist", 404)
    }

    return activityToReturn
}

weekDAO.addActivity = async (userId, week, day, activity) => {
    const userData = await userDAO.getOne(userId)
    userData.weeks.get(week).get(day).push(activity)
    await userData.save()
        .catch((err) => { throw new ClientError("Invalid activity data") })
}

weekDAO.removeActivity = async (userId, week, day, activityId) => {
    const userData = await userDAO.getOne(userId)
    const activities = userData.weeks.get(week).get(day)
    const spliceIndex = activities.find((activity) => activity._id.toString() === activityId)
    if (!spliceIndex) {
        throw new ClientError("Activity with specified id does not exist", 404)
    }
    const removedActivity = activities.at(spliceIndex)

    userData.get(week).get(day).splice(spliceIndex)
    await userData.save()

    return removedActivity
}

export default weekDAO