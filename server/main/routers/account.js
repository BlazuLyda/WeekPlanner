import express from "express"
import accountController from "../controllers/accountController.js"

const router = express.Router()

router.get("/", accountController.find)
router.put("/", accountController.edit)
router.delete("/", accountController.remove)

export default router