import express from "express"
import accountController from "../controllers/accountController.js"
import sessionController from "../controllers/sessionController.js";

const router = express.Router()

router.use(sessionController.authUser)

router.get("/", accountController.find)
router.put("/", accountController.edit)
router.delete("/", accountController.remove)

export default router