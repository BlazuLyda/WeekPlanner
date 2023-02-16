import express from "express"
import * as controller from "../controllers/userController.js"

const router = express.Router()

router.get("/", controller.view)
router.post("/", controller.create)
router.get("/:id", controller.find)
router.put("/:id", controller.edit)
router.delete("/:id", controller.remove)

export default router