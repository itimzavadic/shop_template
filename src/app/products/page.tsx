import { ProductGrid } from '@/components/ui/ProductGrid';
import { generateProducts } from '@/lib/product-data';

const products = generateProducts(12);

export default function ProductsPage() {
  return (
    <div className="w-full">
      <div className="mx-auto px-6 py-8">
        <h1 className="text-sm tracking-wide font-medium text-foreground mb-8">
          Все товары
        </h1>
        <ProductGrid products={products} columns={4} />
      </div>
    </div>
  );
}
