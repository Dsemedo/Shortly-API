import { Router } from "express";
import { validSchemaUrl } from "../middlewares/urlsMiddleware.js";
import { postUrl, getUrl, openUrl } from "../controllers/urlsController.js";

const router = Router();

router.post("/urls/shorten", validSchemaUrl, postUrl);
router.get("/urls/:id", getUrl);
router.get("/urls/open/:shortUrl", openUrl);

export default router;
