import { createServerFn } from "@tanstack/react-start";
import { db } from "@/db";
import { products, productImages, categories } from "@/db/schema";
import { eq, like, desc, sql } from "drizzle-orm";
import {
  createShopifyProduct,
  updateShopifyProduct,
  deleteShopifyProduct,
  isShopifyAdminConfigured,
} from "./shopify-admin";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const listProducts = createServerFn({ method: "GET" })
  .inputValidator((data: { search?: string } | undefined) => data ?? {})
  .handler(async ({ data }) => {
    const { search } = data;
    if (search) {
      return db
        .select()
        .from(products)
        .where(like(products.name, `%${search}%`))
        .orderBy(desc(products.createdAt));
    }
    return db.select().from(products).orderBy(desc(products.createdAt));
  });

export const listCategories = createServerFn({ method: "GET" })
  .handler(async () => {
    return db.select().from(categories).orderBy(categories.name);
  });

export const getCategoryBySlug = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { slug } = data;

    // 1. Exact slug match
    const bySlug = await db.select().from(categories).where(eq(categories.slug, slug)).limit(1);
    if (bySlug.length > 0) return bySlug[0];

    // 2. Name-to-slug: slugify each DB category name and compare
    const all = await db.select().from(categories);
    const slugified = all.find((c) =>
      c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") === slug
    );
    if (slugified) return slugified;

    // 3. Partial name match from the URL slug words
    const words = slug.split("-").filter(Boolean);
    const partial = all.find((c) => {
      const lower = c.name.toLowerCase();
      return words.some((w) => w.length > 2 && lower.includes(w));
    });
    if (partial) return partial;

    return null;
  });

export const listPublicProducts = createServerFn({ method: "GET" })
  .inputValidator(
    (data: { search?: string; categoryId?: string } | undefined) => data ?? {},
  )
  .handler(async ({ data }) => {
    const { search, categoryId } = data;

    let query = db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        description: products.description,
        price: products.price,
        image: products.image,
        stock: products.stock,
        isActive: products.isActive,
        createdAt: products.createdAt,
        categoryId: products.categoryId,
        categoryName: categories.name,
        categorySlug: categories.slug,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .orderBy(desc(products.createdAt))
      .$dynamic();

    const conditions = [eq(products.isActive, true)];
    if (search) {
      conditions.push(like(products.name, `%${search}%`));
    }
    if (categoryId) {
      conditions.push(eq(products.categoryId, categoryId));
    }

    const combined = conditions.reduce((a, b) => sql`${a} AND ${b}`);
    query = query.where(combined);

    return query;
  });

export const getProduct = createServerFn({ method: "GET" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const result = await db.select().from(products).where(eq(products.id, data.id)).limit(1);
    const product = result[0];
    if (!product) return null;

    const images = await db
      .select()
      .from(productImages)
      .where(eq(productImages.productId, data.id));

    return { ...product, images };
  });

export const getProductBySlug = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const result = await db.select().from(products).where(eq(products.slug, data.slug)).limit(1);
    const product = result[0];
    if (!product) return null;

    const images = await db
      .select()
      .from(productImages)
      .where(eq(productImages.productId, product.id));

    return { ...product, images };
  });

export const getProductByShopifyId = createServerFn({ method: "GET" })
  .inputValidator((data: { shopifyProductId: string }) => data)
  .handler(async ({ data }) => {
    const result = await db
      .select()
      .from(products)
      .where(eq(products.shopifyProductId, data.shopifyProductId))
      .limit(1);
    const product = result[0];
    if (!product) return null;

    const images = await db
      .select()
      .from(productImages)
      .where(eq(productImages.productId, product.id));

    return { ...product, images };
  });

export const createProduct = createServerFn({ method: "POST" })
  .inputValidator((data: {
    name: string;
    description?: string;
    price: string;
    stock?: number;
    image?: string;
    categoryId?: string;
  }) => data)
  .handler(async ({ data }) => {
    const slug = slugify(data.name) + "-" + Date.now().toString(36);
    const result = await db
      .insert(products)
      .values({ ...data, slug })
      .returning();
    const product = result[0];

    // Push to Shopify if Admin API is configured
    if (isShopifyAdminConfigured()) {
      try {
        const shopify = await createShopifyProduct({
          title: data.name,
          descriptionHtml: data.description || "",
          price: data.price,
          image: data.image,
        });
        await db
          .update(products)
          .set({
            shopifyProductId: shopify.productId,
            shopifyVariantId: shopify.variantId,
          })
          .where(eq(products.id, product.id));
        product.shopifyProductId = shopify.productId;
        product.shopifyVariantId = shopify.variantId;
      } catch (e) {
        console.error("Failed to push product to Shopify:", e);
      }
    }

    return product;
  });

export const updateProduct = createServerFn({ method: "POST" })
  .inputValidator((data: {
    id: string;
    name?: string;
    description?: string;
    price?: string;
    stock?: number;
    image?: string;
    categoryId?: string;
    isActive?: boolean;
  }) => data)
  .handler(async ({ data }) => {
    const { id, ...updates } = data;
    const result = await db
      .update(products)
      .set({ ...updates, updatedAt: new Date().toISOString() })
      .where(eq(products.id, id))
      .returning();
    const product = result[0];

    // Sync to Shopify if product has a Shopify ID and Admin API is configured
    if (isShopifyAdminConfigured() && product?.shopifyProductId) {
      try {
        await updateShopifyProduct(product.shopifyProductId, {
          title: data.name,
          descriptionHtml: data.description,
          price: data.price,
          image: data.image,
        });
      } catch (e) {
        console.error("Failed to update product on Shopify:", e);
      }
    }

    return product;
  });

export const deleteProduct = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    // Delete from Shopify first if it exists there
    const existing = await db.select().from(products).where(eq(products.id, data.id)).limit(1);
    if (existing.length > 0 && existing[0].shopifyProductId && isShopifyAdminConfigured()) {
      try {
        await deleteShopifyProduct(existing[0].shopifyProductId);
      } catch (e) {
        console.error("Failed to delete product from Shopify:", e);
      }
    }

    await db.delete(products).where(eq(products.id, data.id));
    return { success: true };
  });
