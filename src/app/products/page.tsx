import { ProductGrid } from '@/components/ui/ProductGrid';
import { shopifyFetch } from '@/lib/shopify';
import { PRODUCTS_QUERY } from '@/lib/shopify-queries';
import type { ProductsResponse } from '@/lib/shopify-types';

const placeholderProducts = Array.from({ length: 12 }, (_, i) => ({
  id: `placeholder-${i}`,
  title: `Product ${i + 1}`,
  handle: `product-${i + 1}`,
  description: '',
  availableForSale: true,
  priceRange: {
    minVariantPrice: { amount: `${(Math.random() * 200 + 50).toFixed(2)}`, currencyCode: 'USD' },
    maxVariantPrice: { amount: `${(Math.random() * 200 + 50).toFixed(2)}`, currencyCode: 'USD' },
  },
  images: {
    edges: [{
      node: {
        url: `https://picsum.photos/seed/all${i}/600/800`,
        altText: `Product ${i + 1}`,
        width: 600,
        height: 800,
      },
    }],
  },
  vendor: ['MHL', 'Metalwood', 'ERL', 'Larriet', 'Cherrys Los Angeles'][i % 5],
  tags: i < 3 ? ['NEW'] : [],
}));

export default async function ProductsPage() {
  const result = await shopifyFetch<ProductsResponse>({
    query: PRODUCTS_QUERY,
    variables: { first: 12 },
    tags: ['products'],
  });

  const products = result?.body?.products?.edges.map((e) => e.node) ?? placeholderProducts;

  return (
    <div className="w-full">
      <div className="mx-auto px-6 py-8">
        <h1 className="text-sm tracking-wide font-medium text-foreground mb-8">
          All Products
        </h1>
        <ProductGrid products={products} columns={4} />
      </div>
    </div>
  );
}
