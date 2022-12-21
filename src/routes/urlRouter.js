import { Router } from "express";
import { validSchemaUrl } from "../middlewares/urlsMiddleware.js";
import { postUrl } from "../controllers/urlsController.js";

const router = Router();

router.post("/urls/shorten", validSchemaUrl, postUrl);

export default router;
