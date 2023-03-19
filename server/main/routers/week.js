import express from "express";
import weekController from "../controllers/weekController.js"

const router = express.Router()

// Schedule
router.get("/schedule/:week", weekController.getSchedule)
router.post("/schedule/:week") // TODO add a schedule to a week
router.delete("/schedule/:week") // TODO remove schedule from the week

// Activities
router.get("/activities/:week/:day", weekController.allActivities)
router.post("/activities/:week/:day", weekController.createActivity)

router.get("/activities/:week/:day/:activityId", weekController.oneActivity)
router.put("/activities/:week/:day/:activityId") // TODO modify activities within a week
router.delete("/activities/:week/:day/:activityId") // TODO delete activities from a week

// Tasks
router.get("/tasks/:week/:day") // TODO view all tasks from a week
router.post("/tasks/:week/:day") // TODO create a task in a week

router.get("/tasks/:week/:day/:taskId") // TODO view one task from a week
router.put("/tasks/:week/:day/:taskId") // TODO modify tasks within a week
router.delete("/tasks/:week/:day/:taskId") // TODO delete tasks from a week

export default router