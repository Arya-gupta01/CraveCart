import { v2 as cloudinary } from "cloudinary";

let configured = false;

const ensureConfigured = () => {
  if (configured) return;

  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error("Cloudinary environment variables are missing.");
  }

  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });

  configured = true;
};

export const uploadImageBuffer = (buffer, folder = "foodify") => {
  ensureConfigured();

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );

    uploadStream.end(buffer);
  });
};

const extractPublicIdFromUrl = (imageUrl) => {
  try {
    const parsedUrl = new URL(imageUrl);
    if (!parsedUrl.hostname.includes("res.cloudinary.com")) return null;

    const pathParts = parsedUrl.pathname.split("/").filter(Boolean);
    const uploadIndex = pathParts.findIndex((part) => part === "upload");
    if (uploadIndex === -1) return null;

    let publicIdParts = pathParts.slice(uploadIndex + 1);
    if (publicIdParts.length === 0) return null;

    if (/^v\d+$/.test(publicIdParts[0])) {
      publicIdParts = publicIdParts.slice(1);
    }
    if (publicIdParts.length === 0) return null;

    const lastIndex = publicIdParts.length - 1;
    publicIdParts[lastIndex] = publicIdParts[lastIndex].replace(/\.[^/.]+$/, "");

    return publicIdParts.join("/");
  } catch {
    return null;
  }
};

export const deleteCloudinaryImageByUrl = async (imageUrl) => {
  const publicId = extractPublicIdFromUrl(imageUrl);
  if (!publicId) return false;

  ensureConfigured();
  await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
  return true;
};
