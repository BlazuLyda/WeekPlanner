import {ClientError} from "../helpers/errors.js";
import userDAO from "./userDAO.js";

const bankDAO = {}

// Activity bank access methods
bankDAO.getBank = async (userId) => {
    const userData = await userDAO.getOne(userId)
    return userData.taskBank
}

bankDAO.getFromBank = async (userId, taskId) => {
    const userData = await userDAO.getOne(userId)
    const task = userData.taskBank.id(taskId)
    if (!task) {
        throw new ClientError("Task with specified id does not exist", 404)
    }
    return task
}

bankDAO.addToBank = async (userId, task) => {
    const userData = await userDAO.getOne(userId)
    userData.taskBank.push(task)
    await userData.save()

    return userData.taskBank.at(-1)
}

bankDAO.removeFromBank = async (userId, taskId) => {
    const userData = await userDAO.getOne(userId)
    const removedTask = userData.taskBank.id(taskId)
    userData.taskBank.id(taskId).remove()
    await userData.save()

    return removedTask
}

export default bankDAO