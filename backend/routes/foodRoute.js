import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";
import authMiddleware from "../middleware/auth.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const foodRouter = express.Router();

// Image Storage Engine

const storage= multer.diskStorage({
    destination: path.join(__dirname, "../uploads"),
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload= multer({storage:storage})

foodRouter.post("/add",upload.single("image"),authMiddleware,addFood);
foodRouter.get("/list",listFood);
foodRouter.post("/remove",authMiddleware,removeFood);

export default foodRouter;
