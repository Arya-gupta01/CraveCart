import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import { uploadImageBuffer } from "./config/cloudinary.js";
import foodModel from "./models/foodModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

const uploadsDir = path.resolve(__dirname, "uploads");
const cloudFolderBase = process.env.CLOUDINARY_FOLDER || "CraveCart";

const isCloudinaryUrl = (value) =>
  typeof value === "string" && /res\.cloudinary\.com/i.test(value);

const extractLocalImageRef = (value) => {
  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  if (!trimmed) return null;
  if (isCloudinaryUrl(trimmed)) return null;

  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const parsed = new URL(trimmed);
      const pathname = decodeURIComponent(parsed.pathname || "");
      const idx = pathname.toLowerCase().indexOf("/images/");
      if (idx === -1) return null;
      return pathname.slice(idx + "/images/".length).replace(/^[/\\]+/, "");
    } catch {
      return null;
    }
  }

  if (/^[/\\]?images[/\\]/i.test(trimmed)) {
    return trimmed.replace(/^[/\\]?images[/\\]/i, "").replace(/^[/\\]+/, "");
  }

  return trimmed.replace(/^[/\\]+/, "");
};

const resolveExistingFile = (imageRef) => {
  const normalizedRef = imageRef.replace(/\\/g, "/");
  const primaryPath = path.resolve(uploadsDir, normalizedRef);
  if (primaryPath.startsWith(uploadsDir) && fs.existsSync(primaryPath)) {
    return primaryPath;
  }

  const fallbackPath = path.resolve(uploadsDir, path.basename(normalizedRef));
  if (fallbackPath.startsWith(uploadsDir) && fs.existsSync(fallbackPath)) {
    return fallbackPath;
  }

  return null;
};

const migrateCollection = async (label, model) => {
  const docs = await model.find({}, { _id: 1, image: 1 }).lean();
  const stats = {
    total: docs.length,
    migrated: 0,
    skippedCloudinary: 0,
    skippedInvalid: 0,
    missingLocalFile: 0,
    failed: 0,
  };

  for (const doc of docs) {
    const imageRef = extractLocalImageRef(doc.image);

    if (isCloudinaryUrl(doc.image)) {
      stats.skippedCloudinary += 1;
      continue;
    }

    if (!imageRef) {
      stats.skippedInvalid += 1;
      continue;
    }

    const localFilePath = resolveExistingFile(imageRef);
    if (!localFilePath) {
      stats.missingLocalFile += 1;
      console.log(`[${label}] Missing file for ${doc._id}: ${doc.image}`);
      continue;
    }

    try {
      const buffer = fs.readFileSync(localFilePath);
      const uploadedUrl = await uploadImageBuffer(
        buffer,
        `${cloudFolderBase}/migrated-${label}`
      );

      await model.findByIdAndUpdate(doc._id, { image: uploadedUrl });
      stats.migrated += 1;
      console.log(`[${label}] Migrated ${doc._id}`);
    } catch (error) {
      stats.failed += 1;
      console.log(
        `[${label}] Failed ${doc._id}: ${error?.message || "Unknown error"}`
      );
    }
  }

  return stats;
};

const main = async () => {
  try {
    await connectDB();

    const foodStats = await migrateCollection("food", foodModel);

    console.log("\nMigration complete.");
    console.log("Food stats:", foodStats);
  } catch (error) {
    console.error("Migration failed:", error?.message || error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

main();