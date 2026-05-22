import type { ExtendedProduct } from '@/lib/product-data';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: ExtendedProduct[];
  columns?: 2 | 3 | 4;
  title?: string;
}

export function ProductGrid({ products, columns = 4, title }: ProductGridProps) {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  };

  return (
    <section className="w-full py-8">
      {title && (
        <h2 className="text-2xs tracking-wide font-medium text-muted uppercase mb-6">
          {title}
        </h2>
      )}
      <div
        className={`grid ${gridCols[columns]} gap-[var(--grid-gap)]`}
        style={{ rowGap: 'var(--grid-gap-y)' }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}