import express from "express"
import * as controller from "../controllers/accountController.js"
import { authUser } from "../helpers/auth.js";

const router = express.Router()

router.use(authUser)

router.get("/", controller.find)
router.put("/", controller.edit)
router.delete("/", controller.remove)

export default router