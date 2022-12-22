import { Router } from "express";
import { validSchemaUrl, validIdUrl } from "../middlewares/urlsMiddleware.js";
import {
  postUrl,
  getUrl,
  openUrl,
  deleteUrl,
} from "../controllers/urlsController.js";

const router = Router();

router.post("/urls/shorten", validSchemaUrl, postUrl);
router.get("/urls/:id", getUrl);
router.get("/urls/open/:shortUrl", openUrl);
router.get("/url/:id", validIdUrl, deleteUrl);

export default router;
