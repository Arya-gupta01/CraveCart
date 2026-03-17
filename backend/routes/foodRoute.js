import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";
import authMiddleware from "../middleware/auth.js";

const foodRouter = express.Router();

const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
            return;
        }
        cb(new Error("Only JPG, JPEG, PNG and WEBP images are allowed."));
    },
});

const uploadImage = (req, res, next) => {
    upload.single("image")(req, res, (err) => {
        if (err) {
            return res.json({ success: false, message: err.message });
        }
        next();
    });
};

foodRouter.post("/add", uploadImage, authMiddleware, addFood);
foodRouter.get("/list",listFood);
foodRouter.post("/remove",authMiddleware,removeFood);

export default foodRouter;
