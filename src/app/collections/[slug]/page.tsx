import { ProductGrid } from '@/components/ui/ProductGrid';
import { shopifyFetch } from '@/lib/shopify';
import { COLLECTION_PRODUCTS_QUERY } from '@/lib/shopify-queries';
import type { CollectionProductsResponse } from '@/lib/shopify-types';
import { notFound } from 'next/navigation';

const IMAGES = '/images';

const placeholderProducts = Array.from({ length: 8 }, (_, i) => ({
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
        url: `${IMAGES}/product${i}.svg`,
        altText: `Product ${i + 1}`,
        width: 600,
        height: 800,
      },
    }],
  },
  vendor: ['MHL', 'Metalwood', 'ERL', 'Larriet'][i % 4],
  tags: [],
}));

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;

  // Пытаемся получить данные из Shopify
  const result = await shopifyFetch<CollectionProductsResponse>({
    query: COLLECTION_PRODUCTS_QUERY,
    variables: { handle: slug, first: 12 },
    tags: [`collection-${slug}`],
  });

  const collection = result?.body?.collectionByHandle;

  const products = collection?.products?.edges.map((e) => e.node) ?? placeholderProducts;
  const title = collection?.title ?? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="w-full">
      <div className="mx-auto px-6 py-8">
        <h1 className="text-sm tracking-wide font-medium text-foreground mb-1">
          {title}
        </h1>
        {collection?.description && (
          <p className="text-xs text-muted mb-8 max-w-lg">
            {collection.description}
          </p>
        )}

        <ProductGrid products={products} columns={4} />
      </div>
    </div>
  );
}
