import { HeroSection } from '@/components/ui/HeroSection';
import { ProductGrid } from '@/components/ui/ProductGrid';
import { EditorialBlock } from '@/components/ui/EditorialBlock';
import { generateProducts } from '@/lib/product-data';

const IMAGES = '/images';

const products = generateProducts(8);
const footwear = products.slice(0, 4);
const arrivals = products.slice(4, 8);
const staffSelects = products.slice(0, 6);

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
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

      {/* Latest Footwear — Product Grid */}
      <div className="px-6">
        <ProductGrid
          products={footwear}
          title="ТРЕНДЫ"
          columns={4}
        />
      </div>

      {/* Latest Arrivals — Product Grid */}
      <div className="px-6">
        <ProductGrid
          products={arrivals}
          title="Новинки"
          columns={4}
        />
      </div>

      {/* Staff Selects */}
      <div className="px-6">
        <ProductGrid
          products={staffSelects}
          title="Рекомендации UNIVERSE"
          columns={3}
        />
      </div>

      {/* Editorial Block — Styling */}
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
