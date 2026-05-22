import Image from 'next/image';
import Link from 'next/link';
import type { ShopifyProduct } from '@/lib/shopify-types';

interface ProductCardProps {
  product: ShopifyProduct;
}

/**
 * ProductCard — карточка товара (DESIGN.MD §8)
 *
 * - Изображение товара с hover-эффектом scale(1.05)
 * - Название (Title Case), бренд, цена
 * - Бейдж "NEW" если товар помечен соответствующим тегом
 */
export function ProductCard({ product }: ProductCardProps) {
  const image = product.images.edges[0]?.node;
  const price = product.priceRange.minVariantPrice;
  const isNew = product.tags?.includes('NEW') || product.tags?.includes('new');

  return (
    <Link href={`/products/${product.handle}`} className="group block">
      {/* Image */}
      <div className="relative aspect-square bg-secondary overflow-hidden">
        {image && (
          <Image
            src={image.url}
            alt={image.altText || product.title}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        {isNew && (
          <span className="absolute top-2 left-2 bg-foreground text-background text-2xs tracking-wide px-2 py-1 font-medium uppercase">
            НОВИНКА
          </span>
        )}
      </div>

      {/* Info — DESIGN.MD §3: 14px title, 12px brand/price */}
      <div className="pt-3 px-0">
        <h3 className="text-sm font-normal text-foreground leading-5">
          {product.title}
        </h3>
        <p className="text-xs font-normal text-muted leading-4 mt-1">
          {product.vendor}
        </p>
        <p className="text-xs font-medium text-foreground leading-4 mt-1">
          {(parseFloat(price.amount) * 3.3).toFixed(2)} Br
        </p>
      </div>
    </Link>
  );
}