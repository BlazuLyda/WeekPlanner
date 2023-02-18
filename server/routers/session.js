import express from "express"
import * as controller from "../controllers/sessionController.js"
import { create as createAccount } from "../controllers/accountController.js";

const router = express.Router()

router.post("/login", controller.login)
router.post("/logout", controller.logout)
router.post("/register", createAccount)

export default router