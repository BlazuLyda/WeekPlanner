import express from "express";
import scheduleController from "../controllers/scheduleController.js";

const router = express.Router()

router.get("/", scheduleController.allSchedules)
router.post("/") // TODO create new schedule

router.get("/:scheduleId", scheduleController.oneSchedule)
router.put("/:scheduleId") // TODO update schedule info
router.delete("/:scheduleId") // TODO delete schedule

router.post("/:scheduleId/activities")
router.get("/:scheduleId/activities/:activityId") // TODO get one activity from a schedule
router.put("/:scheduleId/activities/:activityId") // TODO update one activity in a schedule
router.delete("/:scheduleId/activities/:activityId") // TODO delete one activity from a schedule