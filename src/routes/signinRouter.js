import { Router } from "express";
import { validSchemaSignin } from "../middlewares/signinMiddleware.js";
import { signinUser } from "../controllers/signinController.js";

const router = Router();

router.post("/signin", validSchemaSignin, signinUser);

export default router;
