/**
 * Shopify Storefront API client.
 * Uses @shopify/hydrogen-react for the GraphQL client.
 * Env vars: VITE_SHOPIFY_STORE_DOMAIN, VITE_SHOPIFY_STOREFRONT_TOKEN
 */
import {
  createStorefrontClient,
} from "@shopify/hydrogen-react";

// ---- Config ----

function getConfig() {
  const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN as string;
  const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN as string;
  if (!domain || !token) {
    console.warn(
      "Shopify env vars missing — set VITE_SHOPIFY_STORE_DOMAIN and VITE_SHOPIFY_STOREFRONT_TOKEN",
    );
  }
  return { domain: domain || "", token: token || "" };
}

let _client: ReturnType<typeof createStorefrontClient> | null = null;

function getShopifyClient() {
  if (!_client) {
    const { domain, token } = getConfig();
    _client = createStorefrontClient({
      storeDomain: `https://${domain}`,
      publicStorefrontToken: token,
    });
  }
  return _client;
}

export function getStorefrontApiUrl() {
  return getShopifyClient().getStorefrontApiUrl();
}

export function getShopifyHeaders() {
  return getShopifyClient().getPublicTokenHeaders();
}

// ---- Types ----

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyMoneyV2 {
  amount: string;
  currencyCode: string;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  priceV2: ShopifyMoneyV2;
  compareAtPriceV2: ShopifyMoneyV2 | null;
  image: ShopifyImage | null;
  selectedOptions: { name: string; value: string }[];
  quantityAvailable: number | null;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  productType: string;
  vendor: string;
  tags: string[];
  availableForSale: boolean;
  createdAt: string;
  updatedAt: string;
  images: {
    edges: { node: ShopifyImage }[];
  };
  variants: {
    edges: { node: ShopifyProductVariant }[];
  };
  priceRange: {
    minVariantPrice: ShopifyMoneyV2;
    maxVariantPrice: ShopifyMoneyV2;
  };
  collections?: {
    edges: { node: { id: string; title: string; handle: string } }[];
  };
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: ShopifyImage | null;
  products: {
    edges: { node: ShopifyProduct }[];
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
  };
}

// ---- App-compatible types ----
// These map to the shapes components expect, so we don't have to rewrite every component.

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  price: string;
  stock: number | null;
  categoryId: string | null;
  pricingTiers: never[];
  variants: ShopifyProductVariant[];
  handle: string;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  products: Product[];
}

// ---- Mapping helpers ----

export function mapProduct(sp: ShopifyProduct): Product {
  const firstVariant = sp.variants.edges[0]?.node;
  const image = sp.images.edges[0]?.node?.url ?? firstVariant?.image?.url ?? null;
  const price = firstVariant?.priceV2?.amount ?? "0";
  const stock = firstVariant?.quantityAvailable;
  const collection = sp.collections?.edges[0]?.node;

  return {
    id: sp.id,
    name: sp.title,
    slug: sp.handle,
    description: sp.description,
    image,
    price,
    stock,
    categoryId: collection?.id ?? null,
    pricingTiers: [],
    variants: sp.variants.edges.map((e) => e.node),
    handle: sp.handle,
  };
}

export function mapCollection(sc: ShopifyCollection): Collection {
  return {
    id: sc.id,
    name: sc.title,
    slug: sc.handle,
    description: sc.description,
    image: sc.image?.url ?? null,
    products: sc.products.edges.map((e) => mapProduct(e.node)),
  };
}

export function formatMoney(amount: string, currencyCode: string = "USD"): string {
  const num = parseFloat(amount);
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currencyCode }).format(num);
}

export function formatUSD(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

export function priceForQty(product: Product, qty: number): number {
  if (!product.variants?.length) return parseFloat(product.price) || 0;
  // Simple: return the first variant price (Shopify handles variant-level pricing)
  return parseFloat(product.price) || 0;
}

// ---- GraphQL Fragments ----

export const PRODUCT_ITEM_FRAGMENT = /* GraphQL */ `
  fragment ProductItem on Product {
    id
    title
    handle
    description
    productType
    vendor
    tags
    availableForSale
    images(first: 5) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 10) {
      edges {
        node {
          id
          title
          availableForSale
          priceV2 {
            amount
            currencyCode
          }
          compareAtPriceV2 {
            amount
            currencyCode
          }
          image {
            url
            altText
            width
            height
          }
          selectedOptions {
            name
            value
          }
          quantityAvailable
        }
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
  }
`;

export const COLLECTION_FRAGMENT = /* GraphQL */ `
  fragment CollectionItem on Collection {
    id
    title
    handle
    description
    image {
      url
      altText
      width
      height
    }
  }
`;

// ---- Queries ----

export const GET_COLLECTIONS = /* GraphQL */ `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          ...CollectionItem
          products(first: 10) {
            edges {
              node {
                ...ProductItem
              }
            }
          }
        }
      }
    }
  }
  ${COLLECTION_FRAGMENT}
  ${PRODUCT_ITEM_FRAGMENT}
`;

export const GET_COLLECTION_BY_HANDLE = /* GraphQL */ `
  query GetCollectionByHandle($handle: String!, $first: Int!, $after: String) {
    collectionByHandle(handle: $handle) {
      ...CollectionItem
      products(first: $first, after: $after) {
        edges {
          node {
            ...ProductItem
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
  ${COLLECTION_FRAGMENT}
  ${PRODUCT_ITEM_FRAGMENT}
`;

export const GET_PRODUCT_BY_HANDLE = /* GraphQL */ `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      ...ProductItem
      collections(first: 5) {
        edges {
          node {
            id
            title
            handle
          }
        }
      }
    }
  }
  ${PRODUCT_ITEM_FRAGMENT}
`;

export const GET_ALL_PRODUCTS = /* GraphQL */ `
  query GetAllProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      edges {
        node {
          ...ProductItem
          collections(first: 1) {
            edges {
              node {
                id
                title
                handle
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  ${PRODUCT_ITEM_FRAGMENT}
`;

export const SEARCH_PRODUCTS = /* GraphQL */ `
  query SearchProducts($query: String!, $first: Int!) {
    products(first: $first, query: $query) {
      edges {
        node {
          ...ProductItem
        }
      }
    }
  }
  ${PRODUCT_ITEM_FRAGMENT}
`;

// ---- Cart Queries ----

export const CREATE_CART = /* GraphQL */ `
  mutation CreateCart($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
                  }
                  product {
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
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

export const ADD_TO_CART = /* GraphQL */ `
  mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
                  }
                  product {
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
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

export const UPDATE_CART = /* GraphQL */ `
  mutation UpdateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
                  }
                  product {
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
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

export const REMOVE_FROM_CART = /* GraphQL */ `
  mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        checkoutUrl
        totalQuantity
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
                  }
                  product {
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
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

export const GET_CART = /* GraphQL */ `
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      totalQuantity
      lines(first: 50) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                priceV2 {
                  amount
                  currencyCode
                }
                image {
                  url
                  altText
                }
                product {
                  title
                  handle
                  images(first: 1) {
                    edges {
                      node {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
      }
    }
  }
`;

// ---- Cart API helpers ----

export interface CartLine {
  id: string;
  quantity: number;
  variant: {
    id: string;
    title: string;
    price: string;
    currencyCode: string;
    image: string | null;
    productTitle: string;
    productHandle: string;
  };
}

export interface CartData {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: CartLine[];
  totalAmount: string;
  currencyCode: string;
  subtotalAmount: string;
}

function parseCartResponse(data: any): CartData | null {
  const cart =
    data?.cartCreate?.cart ||
    data?.cartLinesAdd?.cart ||
    data?.cartLinesUpdate?.cart ||
    data?.cartLinesRemove?.cart ||
    data?.cart;
  if (!cart) return null;

  const lines: CartLine[] = cart.lines.edges.map((e: any) => {
    const m = e.node.merchandise;
    return {
      id: e.node.id,
      quantity: e.node.quantity,
      variant: {
        id: m.id,
        title: m.title,
        price: m.priceV2.amount,
        currencyCode: m.priceV2.currencyCode,
        image: m.image?.url ?? m.product?.images?.edges?.[0]?.node?.url ?? null,
        productTitle: m.product?.title ?? "",
        productHandle: m.product?.handle ?? "",
      },
    };
  });

  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    lines,
    totalAmount: cart.cost?.totalAmount?.amount ?? "0",
    currencyCode: cart.cost?.totalAmount?.currencyCode ?? "USD",
    subtotalAmount: cart.cost?.subtotalAmount?.amount ?? "0",
  };
}

export async function createCart(
  variantId: string,
  quantity: number = 1,
): Promise<CartData | null> {
  const res = await fetch(getStorefrontApiUrl(), {
    method: "POST",
    headers: getShopifyHeaders(),
    body: JSON.stringify({
      query: CREATE_CART,
      variables: {
        input: {
          lines: [{ merchandiseId: variantId, quantity }],
        },
      },
    }),
  });
  const json = await res.json();
  if (json.data?.cartCreate?.userErrors?.length) {
    throw new Error(json.data.cartCreate.userErrors[0].message);
  }
  return parseCartResponse(json.data);
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity: number = 1,
): Promise<CartData | null> {
  const res = await fetch(getStorefrontApiUrl(), {
    method: "POST",
    headers: getShopifyHeaders(),
    body: JSON.stringify({
      query: ADD_TO_CART,
      variables: {
        cartId,
        lines: [{ merchandiseId: variantId, quantity }],
      },
    }),
  });
  const json = await res.json();
  if (json.data?.cartLinesAdd?.userErrors?.length) {
    throw new Error(json.data.cartLinesAdd.userErrors[0].message);
  }
  return parseCartResponse(json.data);
}

export async function updateCartLines(
  cartId: string,
  lineId: string,
  quantity: number,
): Promise<CartData | null> {
  const res = await fetch(getStorefrontApiUrl(), {
    method: "POST",
    headers: getShopifyHeaders(),
    body: JSON.stringify({
      query: UPDATE_CART,
      variables: {
        cartId,
        lines: [{ id: lineId, quantity }],
      },
    }),
  });
  const json = await res.json();
  if (json.data?.cartLinesUpdate?.userErrors?.length) {
    throw new Error(json.data.cartLinesUpdate.userErrors[0].message);
  }
  return parseCartResponse(json.data);
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<CartData | null> {
  const res = await fetch(getStorefrontApiUrl(), {
    method: "POST",
    headers: getShopifyHeaders(),
    body: JSON.stringify({
      query: REMOVE_FROM_CART,
      variables: {
        cartId,
        lineIds,
      },
    }),
  });
  const json = await res.json();
  if (json.data?.cartLinesRemove?.userErrors?.length) {
    throw new Error(json.data.cartLinesRemove.userErrors[0].message);
  }
  return parseCartResponse(json.data);
}

export async function getCart(cartId: string): Promise<CartData | null> {
  const res = await fetch(getStorefrontApiUrl(), {
    method: "POST",
    headers: getShopifyHeaders(),
    body: JSON.stringify({
      query: GET_CART,
      variables: { cartId },
    }),
  });
  const json = await res.json();
  return parseCartResponse(json.data);
}
