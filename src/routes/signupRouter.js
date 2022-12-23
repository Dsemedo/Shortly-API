import { Router } from "express";
import { validSchemaSignup } from "../middlewares/signupMiddleware.js";
import {
  createUser,
  getUserDevelopment,
} from "../controllers/signupController.js";

const router = Router();

router.post("/signup", validSchemaSignup, createUser);
router.get("/signup", getUserDevelopment);

export default router;
