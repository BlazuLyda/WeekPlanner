import express from "express";
import weekController from "../controllers/weekController.js"

const router = express.Router()

router.get("/:week/:day", weekController.all)
router.post("/:week/:day", weekController.create)

router.get("/:week/:day/:activityId", weekController.one)
router.put("/:week/:day/:activityId")
router.delete("/:week/:day/:activityId")

export default router