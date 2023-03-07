import express from "express"
import sessionController from "../controllers/sessionController.js";
import bankController from "../controllers/bankController.js";

const router = express.Router()

router.use(sessionController.authUser)

router.get("/", bankController.all)
router.post("/", bankController.create)

router.get("/:activityId", bankController.one)
router.delete("/:activityId", bankController.remove)

export default router