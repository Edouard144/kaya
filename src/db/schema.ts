import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  numeric,
  integer,
  boolean,
  unique,
  pgEnum,
  foreignKey,
} from "drizzle-orm/pg-core";

// ---- Enums ----

export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "paid",
  "shipped",
  "delivered",
  "cancelled",
]);

export const roleEnum = pgEnum("role", ["customer", "admin"]);

// ---- Tables ----

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
}, (t) => [
  unique("categories_name_unique").on(t.name),
  unique("categories_slug_unique").on(t.slug),
]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  role: roleEnum("role").default("customer"),
  company: text("company"),
  phone: text("phone"),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
}, (t) => [
  unique("users_email_unique").on(t.email),
]);

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  description: text("description"),
  // Columns we ADD to the existing DB schema (via migration)
  price: numeric("price", { precision: 10, scale: 2 }).notNull().default("0"),
  image: text("image"),
  shopifyProductId: varchar("shopify_product_id", { length: 255 }),
  shopifyVariantId: varchar("shopify_variant_id", { length: 255 }),
  // Existing columns
  categoryId: uuid("category_id"),
  stock: integer("stock").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow(),
}, (t) => [
  foreignKey({
    columns: [t.categoryId],
    foreignColumns: [categories.id],
    name: "products_category_id_categories_id_fk",
  }),
  unique("products_slug_unique").on(t.slug),
]);

export const productImages = pgTable("product_images", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id").notNull(),
  url: text("url").notNull(),
  alt: text("alt"),
  sortOrder: integer("sort_order").default(0),
}, (t) => [
  foreignKey({
    columns: [t.productId],
    foreignColumns: [products.id],
    name: "product_images_product_id_products_id_fk",
  }).onDelete("cascade"),
]);

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id"),
  status: orderStatusEnum("status").default("pending"),
  total: numeric("total", { precision: 10, scale: 2 }).notNull(),
  stripePaymentId: text("stripe_payment_id"),
  address: text("address").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
}, (t) => [
  foreignKey({
    columns: [t.userId],
    foreignColumns: [users.id],
    name: "orders_user_id_users_id_fk",
  }),
]);

export const orderItems = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id"),
  productId: uuid("product_id"),
  quantity: integer("quantity").notNull(),
  unitPrice: numeric("unit_price", { precision: 10, scale: 2 }).notNull(),
}, (t) => [
  foreignKey({
    columns: [t.orderId],
    foreignColumns: [orders.id],
    name: "order_items_order_id_orders_id_fk",
  }).onDelete("cascade"),
  foreignKey({
    columns: [t.productId],
    foreignColumns: [products.id],
    name: "order_items_product_id_products_id_fk",
  }),
]);

export const pricingTiers = pgTable("pricing_tiers", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id"),
  minQty: integer("min_qty").notNull(),
  maxQty: integer("max_qty"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
}, (t) => [
  foreignKey({
    columns: [t.productId],
    foreignColumns: [products.id],
    name: "pricing_tiers_product_id_products_id_fk",
  }).onDelete("cascade"),
]);
