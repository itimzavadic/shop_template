import { ProductGrid } from '@/components/ui/ProductGrid';
import { generateProducts } from '@/lib/product-data';
import { notFound } from 'next/navigation';

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;

  // For now, use generated products for all collections
  const products = generateProducts(8);
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  if (!products) {
    notFound();
  }

  return (
    <div className="w-full">
      <div className="mx-auto px-6 py-8">
        <h1 className="text-sm tracking-wide font-medium text-foreground mb-1">
          {title}
        </h1>
        <ProductGrid products={products} columns={4} />
      </div>
    </div>
  );
}
