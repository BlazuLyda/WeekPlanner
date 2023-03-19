import userDAO from "./userDAO.js";
import {ClientError} from "../../helpers/errors.js";

const scheduleDAO = {}

scheduleDAO.getAllSchedules = async (userId) => userDAO.getOne().schedules

scheduleDAO.getOneSchedule = async (userId, scheduleId) => {
    return await scheduleDAO.getAllSchedules(userId).id(scheduleId) ||
        throw new ClientError("Schedule with specified id not found for this user", 404)
}



export default scheduleDAO