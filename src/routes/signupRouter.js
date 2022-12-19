import { Router } from "express";
import { validSchemaSignup } from "../middlewares/signupMiddleware.js";
import { createUser, getUser } from "../controllers/signupController.js";

const router = Router();

router.post("/signup", validSchemaSignup, createUser);
router.get("/signup", getUser);


export default router;
