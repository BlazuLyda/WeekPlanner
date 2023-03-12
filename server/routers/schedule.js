import express from "express";

const router = express.Router()

router.get("/") // TODO view all schedules
router.post("/") // TODO create new schedule

router.get("/:scheduleId") // TODO view one schedule
router.put("/:scheduleId") // TODO update schedule
router.delete("/:scheduleId") // TODO delete schedule