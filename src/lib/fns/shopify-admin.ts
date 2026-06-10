/**
 * Shopify Admin API — pushes products from Neon DB to Shopify.
 * Env vars: SHOPIFY_ADMIN_ACCESS_TOKEN, VITE_SHOPIFY_STORE_DOMAIN
 */

function getShopifyStore(): string {
  return (process.env.VITE_SHOPIFY_STORE_DOMAIN as string) || "";
}

function getAdminToken(): string {
  return (process.env.SHOPIFY_ADMIN_ACCESS_TOKEN as string) || "";
}

export function isShopifyAdminConfigured(): boolean {
  return !!(getShopifyStore() && getAdminToken());
}

async function shopifyAdminFetch(query: string, variables?: Record<string, any>) {
  const store = getShopifyStore();
  const token = getAdminToken();
  if (!store || !token) {
    throw new Error("Shopify Admin API not configured — set VITE_SHOPIFY_STORE_DOMAIN and SHOPIFY_ADMIN_ACCESS_TOKEN");
  }
  const res = await fetch(`https://${store}/admin/api/2024-01/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors[0]?.message || "Shopify Admin API error");
  }
  return json.data;
}

export async function createShopifyProduct(input: {
  title: string;
  descriptionHtml?: string;
  price: string;
  image?: string;
  productType?: string;
}): Promise<{ productId: string; variantId: string }> {
  const mutation = `
    mutation productCreate($input: ProductInput!) {
      productCreate(input: $input) {
        product {
          id
          variants(first: 1) {
            edges {
              node {
                id
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const productInput: any = {
    title: input.title,
    descriptionHtml: input.descriptionHtml || "",
    productType: input.productType || "Hotel Supply",
    status: "ACTIVE",
    variants: [
      {
        price: input.price,
        inventoryManagement: "SHOPIFY",
      },
    ],
  };

  if (input.image) {
    productInput.images = [{ src: input.image }];
  }

  const data = await shopifyAdminFetch(mutation, { input: productInput });

  if (data.productCreate.userErrors?.length) {
    throw new Error(data.productCreate.userErrors[0].message);
  }

  const product = data.productCreate.product;
  const variantId = product.variants.edges[0]?.node?.id;

  return {
    productId: product.id,
    variantId: variantId || "",
  };
}

export async function updateShopifyProduct(
  shopifyProductId: string,
  input: {
    title?: string;
    descriptionHtml?: string;
    price?: string;
    image?: string;
  }
): Promise<void> {
  const mutation = `
    mutation productUpdate($input: ProductInput!) {
      productUpdate(input: $input) {
        product {
          id
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const productInput: any = { id: shopifyProductId };
  if (input.title) productInput.title = input.title;
  if (input.descriptionHtml) productInput.descriptionHtml = input.descriptionHtml;
  if (input.price) {
    productInput.variants = [{ price: input.price }];
  }

  const data = await shopifyAdminFetch(mutation, { input: productInput });

  if (data.productUpdate.userErrors?.length) {
    throw new Error(data.productUpdate.userErrors[0].message);
  }
}

export async function deleteShopifyProduct(shopifyProductId: string): Promise<void> {
  const mutation = `
    mutation productDelete($input: ProductDeleteInput!) {
      productDelete(input: $input) {
        deletedProductId
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await shopifyAdminFetch(mutation, {
    input: { id: shopifyProductId },
  });

  if (data.productDelete.userErrors?.length) {
    throw new Error(data.productDelete.userErrors[0].message);
  }
}
