import { Router } from "express";
import { validUser } from "../middlewares/usersMiddleware.js";
import { getUserUrls } from "../controllers/userController.js";

const router = Router();

router.get("/users/me", validUser, getUserUrls);

export default router;
