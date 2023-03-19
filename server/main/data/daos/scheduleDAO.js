import userDAO from "./userDAO.js";
import {ClientError} from "../../helpers/errors.js";

const scheduleDAO = {}

scheduleDAO.getAllSchedules = async (userId) => {
    const userData = await userDAO.getOne(userId)
    return userData.schedules
}

scheduleDAO.getOneSchedule = async (userId, scheduleId) => {
    const schedule = await scheduleDAO.getAllSchedules(userId).id(scheduleId)
    return schedule || throwScheduleNotFound(scheduleId)
}

function throwScheduleNotFound(scheduleId) {
    throw new ClientError(`Schedule with id ${scheduleId} not found`, 404)
}

export default scheduleDAO