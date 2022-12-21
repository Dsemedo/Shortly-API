import { Router } from "express";
import { validSchemaUrl } from "../middlewares/urlsMiddleware.js";
import { postUrl, getUrl } from "../controllers/urlsController.js";

const router = Router();

router.post("/urls/shorten", validSchemaUrl, postUrl);
router.get("/urls/shorten", getUrl);

export default router;
