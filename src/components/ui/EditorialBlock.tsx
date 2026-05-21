import Image from 'next/image';
import Link from 'next/link';

interface EditorialBlockProps {
  title: string;
  description: string;
  image: string;
  imagePosition?: 'left' | 'right';
  ctaText?: string;
  ctaLink?: string;
  backgroundColor?: string;
}

/**
 * EditorialBlock — редакционный блок с изображением и текстом (DESIGN.MD §8)
 *
 * - Изображение слева, текст справа (по умолчанию) или наоборот
 * - Для CTA используется стиль "SHOP NOW" в ALL CAPS с подчёркиванием
 * - Фон блока настраивается (по умолчанию bg-secondary для editorial секций)
 *
 * DESIGN.MD §9: "Editorial blocks with left-aligned image and right-aligned text"
 */
export function EditorialBlock({
  title,
  description,
  image,
  imagePosition = 'left',
  ctaText = 'SHOP NOW',
  ctaLink = '/collections/all',
  backgroundColor = 'bg-secondary',
}: EditorialBlockProps) {
  const isImageLeft = imagePosition === 'left';

  return (
    <section className={`w-full ${backgroundColor}`}>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Image */}
        <div
          className={`relative aspect-[4/5] ${isImageLeft ? 'md:order-1' : 'md:order-2'}`}
        >
          <Image
            src={image}
            alt={title}
            fill
            sizes="50vw"
            className="object-cover"
          />
        </div>

        {/* Text Content */}
        <div
          className={`flex flex-col justify-center px-6 md:px-12 py-12 ${isImageLeft ? 'md:order-2' : 'md:order-1'}`}
        >
          <h2 className="text-2xl md:text-3xl font-medium text-foreground tracking-wide mb-4">
            {title}
          </h2>
          <p className="text-xs text-muted leading-5 mb-6 max-w-md">
            {description}
          </p>
          <Link
            href={ctaLink}
            className="text-xs tracking-wide font-medium text-foreground border-b border-foreground pb-1 self-start uppercase"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}