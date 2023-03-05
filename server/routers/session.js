import express from "express"
import sessionController from "../controllers/sessionController.js"
import accountController from "../controllers/accountController.js";

const router = express.Router()

router.post("/login", sessionController.login)
router.post("/logout", sessionController.logout)
router.post("/register", accountController.create)

export default router