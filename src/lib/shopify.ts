/**
 * Shopify Storefront API Client
 * 
 * Используется для получения товаров, коллекций и контента из Shopify.
 * См. DESIGN.MD для контекста дизайн-системы.
 */

const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '';
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';
const API_VERSION = '2024-07';
const API_URL = `https://${STORE_DOMAIN}/api/${API_VERSION}/graphql.json`;

interface ShopifyResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}

export async function shopifyFetch<T>({
  query,
  variables = {},
  cache = 'force-cache',
  tags,
}: {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
  tags?: string[];
}): Promise<{ status: number; body: T } | undefined> {
  try {
    const result = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      cache,
      ...(tags && { next: { tags } }),
    });

    const body = await result.json();

    if (body.errors) {
      throw new Error(body.errors[0]?.message || 'Shopify API error');
    }

    return {
      status: result.status,
      body: body.data,
    };
  } catch (error) {
    console.error('Shopify fetch error:', error);
    return undefined;
  }
}