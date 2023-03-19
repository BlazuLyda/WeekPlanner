import {ClientError} from "../../helpers/errors.js";
import userDAO from "./userDAO.js";

const bankDAO = {}

// Task bank data access/manipulation methods
bankDAO.getAllTasks = async (userId) => {
    const userData = await userDAO.getOne(userId)
    return userData.taskBank
}

bankDAO.getOneTask = async (userId, taskId) => {
    const task = bankDAO.getAllTasks(userId).id(taskId)
    return task || throwTaskNotFound(taskId)
}

bankDAO.addTask = async (userId, task) => {
    const taskBank = bankDAO.getAllTasks(userId)
    taskBank.push(task)
    await taskBank.ownerDocument().save()
    return taskBank.at(-1)
}

bankDAO.updateTask = async (userId, taskId, updateData) => {
    const currentTask = bankDAO.getOneTask(userId, taskId)
    currentTask.set(updateData)
    await currentTask.ownerDocument().save()
    return currentTask // TODO check if this work or if I need to return "currentTask.parent().id(currentTask._id)"
}

bankDAO.removeTask = async (userId, taskId) => {
    const removedTask = await bankDAO.getAllTasks(userId).id(taskId)
    if (!removedTask) {
        throwTaskNotFound(taskId)
    }
    removedTask.remove()
    await removedTask.ownerDocument().save()
    return removedTask
}

function throwTaskNotFound(taskId) {
    throw new ClientError(`Task with id ${taskId} not found`, 404)
}

export default bankDAO