import { HeroSection } from '@/components/ui/HeroSection';
import { ProductGrid } from '@/components/ui/ProductGrid';
import { EditorialBlock } from '@/components/ui/EditorialBlock';
import { shopifyFetch } from '@/lib/shopify';
import { PRODUCTS_QUERY, COLLECTION_PRODUCTS_QUERY } from '@/lib/shopify-queries';
import type { ProductsResponse, CollectionProductsResponse } from '@/lib/shopify-types';

const IMAGES = '/images';

const productImages = [
  'benjamin-r-zNPlKIWCoZc-unsplash.jpg',
  'brock-wegner-7yONARoUsbY-unsplash.jpg',
  'kasongo-bulobo-GKmk8qYlJBc-unsplash.jpg',
  'khalid-boutchich-KSazmALqLVg-unsplash.jpg',
  'mohamad-khosravi-7I0umiKzwgc-unsplash.jpg',
  'mohamad-khosravi-WO0cn-xjX4k-unsplash.jpg',
  'otabek-xatipov-gtqZEFBJeq8-unsplash.jpg',
  'pexels-subhansaad-3613388.jpg',
];

// Эти функции будут работать, когда Shopify API настроен.
// Пока используем placeholder данные для демонстрации.
const placeholderProducts = Array.from({ length: 8 }, (_, i) => ({
  id: `placeholder-${i}`,
  title: `Product ${i + 1}`,
  handle: `product-${i + 1}`,
  description: '',
  availableForSale: true,
  priceRange: {
    minVariantPrice: { amount: `${((Math.random() * 200 + 50) * 3.3).toFixed(2)}`, currencyCode: 'BYN' },
    maxVariantPrice: { amount: `${((Math.random() * 200 + 50) * 3.3).toFixed(2)}`, currencyCode: 'BYN' },
  },
  images: {
    edges: [{
      node: {
        url: `${IMAGES}/${productImages[i]}`,
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
        title="UNIVERSE"
        subtitle="ОДЕЖДА • ТРЕНДЫ • СТИЛЬ • МАНЕРА"
        ctaText="Посмотреть"
        ctaLink="/collections/all"
        backgroundImage={`${IMAGES}/hero.jpg`}
        layout="fullWidth"
      />

      {/* Editorial Block — Summer '26 */}
      <EditorialBlock
        title="Лето '26"
        description="Встречайте летнюю коллекцию 2026 — свежие образы для жарких дней и тёплых вечеров."
        image={`${IMAGES}/joshua-alejo-5AOI-34uBo8-unsplash.jpg`}
        ctaText="Посмотреть"
        ctaLink="/collections/winter-28"
        imagePosition="left"
        backgroundColor="bg-secondary"
      />

      {/* Latest Footwear — Product Grid, DESIGN.MD §11 */}
      <div className="px-6">
        <ProductGrid
          products={footwear}
          title="ТРЕНДЫ"
          columns={4}
        />
      </div>

      {/* Latest Arrivals — Product Grid, DESIGN.MD §11 */}
      <div className="px-6">
        <ProductGrid
          products={arrivals}
          title="Новинки"
          columns={4}
        />
      </div>

      {/* Staff Selects — Product Grid with 3 columns, DESIGN.MD §4, §11 */}
      <div className="px-6">
        <ProductGrid
          products={staffSelects}
          title="Рекомендации UNIVERSE"
          columns={3}
        />
      </div>

      {/* Editorial Block — Styling "под ключ" */}
      <EditorialBlock
        title="Образ под ключ"
        description="Стильный образ с головы до пят — подберём всё необходимое для любого повода."
        image={`${IMAGES}/mei-ling-mirow-Kbl1RYTPIDA-unsplash.jpg`}
        ctaText="Посмотреть"
        ctaLink="/collections/larriet"
        imagePosition="right"
        backgroundColor="bg-background"
      />
    </div>
  );
}
