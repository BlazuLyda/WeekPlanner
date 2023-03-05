import express from "express"
import sessionController from "../controllers/sessionController.js";
import bankController from "../controllers/bankController.js";

const router = express.Router()

router.use(sessionController.authUser)

router.get("/", bankController.view)
router.post("/", bankController.create)
router.delete("/", bankController.remove)