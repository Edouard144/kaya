import { createServerFn } from "@tanstack/react-start";
import { v2 as cloudinary } from "cloudinary";
import { db } from "@/db";
import { productImages } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

function getCloudinary() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  return cloudinary;
}

export const uploadImage = createServerFn({ method: "POST" })
  .inputValidator((data: { dataUrl: string; folder?: string }) => data)
  .handler(async ({ data }) => {
    const c = getCloudinary();
    const result = await c.uploader.upload(data.dataUrl, {
      folder: data.folder || "kaya/products",
      transformation: [{ width: 1200, height: 1200, crop: "limit", quality: "auto" }],
    });
    return { url: result.secure_url, publicId: result.public_id };
  });

export const deleteImage = createServerFn({ method: "POST" })
  .inputValidator((data: { publicId: string }) => data)
  .handler(async ({ data }) => {
    const c = getCloudinary();
    await c.uploader.destroy(data.publicId);
    return { success: true };
  });

export const getProductImages = createServerFn({ method: "GET" })
  .inputValidator((data: { productId: string }) => data)
  .handler(async ({ data }) => {
    return db
      .select()
      .from(productImages)
      .where(eq(productImages.productId, data.productId))
      .orderBy(asc(productImages.sortOrder));
  });

export const addProductImage = createServerFn({ method: "POST" })
  .inputValidator((data: { productId: string; url: string; alt?: string; sortOrder?: number }) => data)
  .handler(async ({ data }) => {
    const result = await db
      .insert(productImages)
      .values(data)
      .returning();
    return result[0];
  });

export const removeProductImage = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    await db.delete(productImages).where(eq(productImages.id, data.id));
    return { success: true };
  });

export const reorderProductImages = createServerFn({ method: "POST" })
  .inputValidator((data: { imageIds: string[] }) => data)
  .handler(async ({ data }) => {
    for (let i = 0; i < data.imageIds.length; i++) {
      await db
        .update(productImages)
        .set({ sortOrder: i })
        .where(eq(productImages.id, data.imageIds[i]));
    }
    return { success: true };
  });
