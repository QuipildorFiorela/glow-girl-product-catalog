import { Router } from "express";
import { upload } from "../controllers/imageController.js";
import multer from "../middlewares/imageUploadMiddleware.js";

const router = Router();

router.post("/", multer.single("image"), upload);

export default router;
