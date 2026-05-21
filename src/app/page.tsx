import { HeroSection } from '@/components/ui/HeroSection';
import { ProductGrid } from '@/components/ui/ProductGrid';
import { EditorialBlock } from '@/components/ui/EditorialBlock';
import { shopifyFetch } from '@/lib/shopify';
import { PRODUCTS_QUERY, COLLECTION_PRODUCTS_QUERY } from '@/lib/shopify-queries';
import type { ProductsResponse, CollectionProductsResponse } from '@/lib/shopify-types';

const IMAGES = '/images';

// Эти функции будут работать, когда Shopify API настроен.
// Пока используем placeholder данные для демонстрации.
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
  tags: i === 0 ? ['NEW'] : [],
}));

async function getProducts() {
  // Пытаемся получить данные из Shopify, если не получится — возвращаем placeholder
  const result = await shopifyFetch<ProductsResponse>({
    query: PRODUCTS_QUERY,
    variables: { first: 8 },
    tags: ['products'],
  });

  if (result?.body?.products?.edges) {
    return result.body.products.edges.map((edge) => edge.node);
  }

  return placeholderProducts;
}

export default async function HomePage() {
  const products = await getProducts();
  const footwear = products.slice(0, 4);
  const arrivals = products.slice(4, 8);
  const staffSelects = products.slice(0, 6);

  return (
    <div className="w-full">
      {/* Hero Section — full-bleed, DESIGN.MD §8 */}
      <HeroSection
        title="Globally Curated"
        subtitle="Fashion, Footwear & Accessories"
        ctaText="SHOP NOW"
        ctaLink="/collections/all"
        backgroundImage={`${IMAGES}/hero.jpg`}
        layout="fullWidth"
      />

      {/* Editorial Block — Winter '28, DESIGN.MD §8, §9 */}
      <EditorialBlock
        title="Winter '28"
        description="Introducing our curated Winter '28 collection. A return to essentials — designed for the season ahead with timeless silhouettes and premium materials."
        image={`${IMAGES}/winter28.svg`}
        ctaText="SHOP NOW"
        ctaLink="/collections/winter-28"
        imagePosition="left"
        backgroundColor="bg-secondary"
      />

      {/* Latest Footwear — Product Grid, DESIGN.MD §11 */}
      <div className="px-6">
        <ProductGrid
          products={footwear}
          title="Latest Footwear"
          columns={4}
        />
      </div>

      {/* Latest Arrivals — Product Grid, DESIGN.MD §11 */}
      <div className="px-6">
        <ProductGrid
          products={arrivals}
          title="Latest Arrivals"
          columns={4}
        />
      </div>

      {/* Staff Selects — Product Grid with 3 columns, DESIGN.MD §4, §11 */}
      <div className="px-6">
        <ProductGrid
          products={staffSelects}
          title="Staff Selects"
          columns={3}
        />
      </div>

      {/* Editorial Block — Larriet brand story, DESIGN.MD §11 */}
      <EditorialBlock
        title="Larriet"
        description="A return to essentials. Designed in Melbourne and built to layer, last and live in; we're pleased to welcome the latest collection from Larriet."
        image={`${IMAGES}/larriet.svg`}
        ctaText="SHOP NOW"
        ctaLink="/collections/larriet"
        imagePosition="right"
        backgroundColor="bg-background"
      />
    </div>
  );
}
