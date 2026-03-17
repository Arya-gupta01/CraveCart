import foodModel from "../models/foodModel.js";
import userModel from "../models/userModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  uploadImageBuffer,
  deleteCloudinaryImageByUrl,
} from "../config/cloudinary.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, "../uploads");

// add food items

const addFood = async (req, res) => {
  if (!req.file) {
    return res.json({ success: false, message: "Image is required." });
  }
  if (!req.body.name || !req.body.name.trim()) {
    return res.json({ success: false, message: "Product name is required." });
  }
  if (!req.body.description || !req.body.description.trim()) {
    return res.json({ success: false, message: "Product description is required." });
  }
  if (!req.body.price || Number(req.body.price) <= 0) {
    return res.json({ success: false, message: "A valid price is required." });
  }
  if (!req.body.category || !req.body.category.trim()) {
    return res.json({ success: false, message: "Category is required." });
  }
  try {
    let userData = await userModel.findById(req.body.userId);
    if (userData && userData.role === "admin") {
      const imageUrl = await uploadImageBuffer(
        req.file.buffer,
        process.env.CLOUDINARY_FOLDER || "CraveCart"
      );
      const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: imageUrl,
      });
      await food.save();
      res.json({ success: true, message: "Food Added" });
    } else {
      res.json({ success: false, message: "You are not admin" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error?.message || "Error" });
  }
};

// all foods
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error?.message || "Error" });
  }
};

// remove food item
const removeFood = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    if (userData && userData.role === "admin") {
      const food = await foodModel.findById(req.body.id);
      if (!food) {
        return res.json({ success: false, message: "Food not found." });
      }

      if (typeof food.image === "string" && /^https?:\/\//.test(food.image)) {
        await deleteCloudinaryImageByUrl(food.image);
      } else if (food.image) {
        fs.unlink(path.join(uploadsDir, food.image), () => {});
      }

      await foodModel.findByIdAndDelete(req.body.id);
      res.json({ success: true, message: "Food Removed" });
    } else {
      res.json({ success: false, message: "You are not admin" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addFood, listFood, removeFood };
