import { relations } from "drizzle-orm/relations";
import { products, productImages, users, orders, orderItems, categories, pricingTiers } from "./schema";

export const productImagesRelations = relations(productImages, ({one}) => ({
	product: one(products, {
		fields: [productImages.productId],
		references: [products.id]
	}),
}));

export const productsRelations = relations(products, ({one, many}) => ({
	productImages: many(productImages),
	orderItems: many(orderItems),
	category: one(categories, {
		fields: [products.categoryId],
		references: [categories.id]
	}),
	pricingTiers: many(pricingTiers),
}));

export const ordersRelations = relations(orders, ({one, many}) => ({
	user: one(users, {
		fields: [orders.userId],
		references: [users.id]
	}),
	orderItems: many(orderItems),
}));

export const usersRelations = relations(users, ({many}) => ({
	orders: many(orders),
}));

export const orderItemsRelations = relations(orderItems, ({one}) => ({
	order: one(orders, {
		fields: [orderItems.orderId],
		references: [orders.id]
	}),
	product: one(products, {
		fields: [orderItems.productId],
		references: [products.id]
	}),
}));

export const categoriesRelations = relations(categories, ({many}) => ({
	products: many(products),
}));

export const pricingTiersRelations = relations(pricingTiers, ({one}) => ({
	product: one(products, {
		fields: [pricingTiers.productId],
		references: [products.id]
	}),
}));