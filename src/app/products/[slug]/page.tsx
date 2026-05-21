import Image from 'next/image';
import Link from 'next/link';
import { shopifyFetch } from '@/lib/shopify';
import { PRODUCT_BY_HANDLE_QUERY } from '@/lib/shopify-queries';
import type { ProductByHandleResponse } from '@/lib/shopify-types';
import { notFound } from 'next/navigation';

const IMAGES = '/images';

// Placeholder data for demo
const placeholderProduct = {
  id: 'placeholder-1',
  title: 'Product Name',
  handle: 'product-name',
  description: 'Product description goes here.',
  descriptionHtml: '<p>Product description goes here.</p>',
  availableForSale: true,
  priceRange: {
    minVariantPrice: { amount: '110.00', currencyCode: 'USD' },
    maxVariantPrice: { amount: '110.00', currencyCode: 'USD' },
  },
  images: {
    edges: [
      { node: { url: `${IMAGES}/product1.svg`, altText: 'Product', width: 600, height: 800 } },
      { node: { url: `${IMAGES}/product2.svg`, altText: 'Product', width: 600, height: 800 } },
    ],
  },
  vendor: 'Brand',
  tags: [],
  options: [
    { id: 'opt-1', name: 'Size', values: ['S', 'M', 'L', 'XL'] },
    { id: 'opt-2', name: 'Color', values: ['Black', 'White', 'Grey'] },
  ],
  variants: {
    edges: [
      { node: { id: 'var-1', title: 'S / Black', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'S' }, { name: 'Color', value: 'Black' }], price: { amount: '110.00', currencyCode: 'USD' } } },
    ],
  },
};

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  // Пытаемся получить данные из Shopify
  const result = await shopifyFetch<ProductByHandleResponse>({
    query: PRODUCT_BY_HANDLE_QUERY,
    variables: { handle: slug },
    tags: [`product-${slug}`],
  });

  const product = result?.body?.productByHandle ?? placeholderProduct;

  if (!product) {
    notFound();
  }

  const images = product.images.edges.map((e) => e.node);
  const price = product.priceRange.minVariantPrice;
  const isNew = product.tags?.includes('NEW');

  return (
    <div className="w-full">
      <div className="mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link href="/" className="text-xs text-muted hover:text-foreground transition-colors">
            Home
          </Link>
          <span className="text-xs text-muted mx-2">/</span>
          <span className="text-xs text-muted">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            {images.map((image, index) => (
              <div key={index} className="relative aspect-[3/4] bg-secondary">
                <Image
                  src={image.url}
                  alt={image.altText || product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          {/* Product Info */}
          <div className="md:sticky md:top-8 self-start">
            <div className="mb-6">
              {isNew && (
                <span className="text-2xs tracking-wide font-medium text-muted uppercase mb-2 block">
                  NEW
                </span>
              )}
              <p className="text-xs text-muted mb-1">{product.vendor}</p>
              <h1 className="text-xl font-medium text-foreground tracking-wide">
                {product.title}
              </h1>
              <p className="text-sm font-medium text-foreground mt-2">
                ${parseFloat(price.amount).toFixed(2)}
              </p>
            </div>

            {/* Options */}
            {product.options?.map((option) => (
              <div key={option.id} className="mb-4">
                <p className="text-xs font-medium text-foreground mb-2 uppercase tracking-wide">
                  {option.name}
                </p>
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value) => (
                    <button
                      key={value}
                      className="text-xs border border-border px-4 py-2 hover:bg-foreground hover:text-background transition-colors"
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Add to Cart */}
            <button className="w-full bg-foreground text-background text-xs tracking-wide font-medium py-3 hover:opacity-90 transition-opacity uppercase mt-6">
              Add to Cart
            </button>

            {/* Description */}
            {product.descriptionHtml ? (
              <div
                className="mt-8 text-xs text-muted leading-5 space-y-3"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            ) : (
              <p className="mt-8 text-xs text-muted leading-5">
                {product.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
