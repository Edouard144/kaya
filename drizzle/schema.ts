import { pgTable, foreignKey, uuid, text, integer, numeric, timestamp, unique, boolean, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const orderStatus = pgEnum("order_status", ['pending', 'paid', 'shipped', 'delivered', 'cancelled'])
export const role = pgEnum("role", ['customer', 'admin'])


export const productImages = pgTable("product_images", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	productId: uuid("product_id").notNull(),
	url: text().notNull(),
	alt: text(),
	sortOrder: integer("sort_order").default(0),
}, (table) => [
	foreignKey({
			columns: [table.productId],
			foreignColumns: [products.id],
			name: "product_images_product_id_products_id_fk"
		}).onDelete("cascade"),
]);

export const orders = pgTable("orders", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id"),
	status: orderStatus().default('pending'),
	total: numeric({ precision: 10, scale:  2 }).notNull(),
	stripePaymentId: text("stripe_payment_id"),
	address: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "orders_user_id_users_id_fk"
		}),
]);

export const orderItems = pgTable("order_items", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	orderId: uuid("order_id"),
	productId: uuid("product_id"),
	quantity: integer().notNull(),
	unitPrice: numeric("unit_price", { precision: 10, scale:  2 }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.orderId],
			foreignColumns: [orders.id],
			name: "order_items_order_id_orders_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.productId],
			foreignColumns: [products.id],
			name: "order_items_product_id_products_id_fk"
		}),
]);

export const products = pgTable("products", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	slug: text().notNull(),
	description: text(),
	categoryId: uuid("category_id"),
	stock: integer().default(0),
	isActive: boolean("is_active").default(true),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [categories.id],
			name: "products_category_id_categories_id_fk"
		}),
	unique("products_slug_unique").on(table.slug),
]);

export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	password: text().notNull(),
	role: role().default('customer'),
	company: text(),
	phone: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);

export const pricingTiers = pgTable("pricing_tiers", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	productId: uuid("product_id"),
	minQty: integer("min_qty").notNull(),
	maxQty: integer("max_qty"),
	price: numeric({ precision: 10, scale:  2 }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.productId],
			foreignColumns: [products.id],
			name: "pricing_tiers_product_id_products_id_fk"
		}).onDelete("cascade"),
]);

export const categories = pgTable("categories", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	slug: text().notNull(),
}, (table) => [
	unique("categories_name_unique").on(table.name),
	unique("categories_slug_unique").on(table.slug),
]);
