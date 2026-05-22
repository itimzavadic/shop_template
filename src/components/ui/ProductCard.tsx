'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ExtendedProduct } from '@/lib/product-data';

interface ProductCardProps {
  product: ExtendedProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const isNew = product.tags?.includes('NEW');

  return (
    <div className="group">
      <Link href={`/products/${product.handle}`} className="block">
        {/* Image */}
        <div className="relative aspect-[3/4] bg-secondary overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {isNew && (
            <span className="absolute top-2 left-2 bg-foreground text-background text-2xs tracking-wide px-2 py-1 font-medium uppercase">
              НОВИНКА
            </span>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="pt-3 px-0 space-y-1">
        <p className="text-xs text-muted">{product.vendor}</p>
        <Link href={`/products/${product.handle}`}>
          <h3 className="text-sm font-normal text-foreground leading-5 hover:underline">
            {product.title}
          </h3>
        </Link>
        <p className="text-xs text-muted">{product.color}</p>
        <p className="text-xs text-muted">Арт. {product.article}</p>
        <p className="text-xs font-medium text-foreground">
          {product.price} Br
        </p>
      </div>
    </div>
  );
}