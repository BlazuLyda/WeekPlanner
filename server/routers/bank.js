import express from "express"
import bankController from "../controllers/bankController.js";

const router = express.Router()

router.get("/", bankController.all)
router.post("/", bankController.create)

router.get("/:taskId", bankController.one)
router.put("/:taskId", bankController.edit)
router.delete("/:taskId", bankController.remove)

export default router