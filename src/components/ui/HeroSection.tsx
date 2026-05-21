import Image from 'next/image';
import Link from 'next/link';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage: string;
  layout?: 'fullWidth' | 'twoColumns' | 'imageLeft';
}

/**
 * HeroSection — большой full-bleed блок (DESIGN.MD §8)
 *
 * Поддерживает три варианта layout:
 * - fullWidth: полноэкранное изображение с наложением текста и CTA по центру
 * - twoColumns: изображение слева, текст справа (2-колоночная сетка)
 * - imageLeft: по умолчанию то же что twoColumns
 */
export function HeroSection({
  title,
  subtitle,
  ctaText = 'SHOP NOW',
  ctaLink = '/collections/all',
  backgroundImage,
  layout = 'fullWidth',
}: HeroSectionProps) {
  // Full width hero with overlay text — DESIGN.MD §8: "Large, full-bleed image"
  if (layout === 'fullWidth') {
    return (
      <section className="relative w-full h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-secondary">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-6xl font-medium text-white tracking-wide mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm md:text-base text-white/90 mb-6">
              {subtitle}
            </p>
          )}
          <Link
            href={ctaLink}
            className="inline-block text-xs tracking-wide font-medium text-white border border-white px-8 py-3 hover:bg-white hover:text-foreground transition-colors uppercase"
          >
            {ctaText}
          </Link>
        </div>
      </section>
    );
  }

  // Two column layout — DESIGN.MD §9: "2-column layouts" for hero sections
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2">
      <div className="relative aspect-[4/3] md:aspect-auto bg-secondary">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          sizes="50vw"
          className="object-cover"
          priority
        />
      </div>
      <div className="flex flex-col justify-center px-6 md:px-12 py-12">
        <h2 className="text-2xl md:text-4xl font-medium text-foreground tracking-wide mb-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs text-muted leading-5 mb-6 max-w-md">
            {subtitle}
          </p>
        )}
        <Link
          href={ctaLink}
          className="text-xs tracking-wide font-medium text-foreground border-b border-foreground pb-1 self-start uppercase"
        >
          {ctaText}
        </Link>
      </div>
    </section>
  );
}