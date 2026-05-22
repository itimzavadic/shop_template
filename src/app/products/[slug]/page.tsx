'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useMemo, useCallback } from 'react';
import { generateProducts } from '@/lib/product-data';

const products = generateProducts(8);

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;

  const product = useMemo(() => products.find((p) => p.handle === slug), [slug]);

  const [accordionOpen, setAccordionOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [showPreorder, setShowPreorder] = useState(false);
  const [preorderName, setPreorderName] = useState('');
  const [preorderPhone, setPreorderPhone] = useState('');
  const [preorderSubmitted, setPreorderSubmitted] = useState(false);

  if (!product) {
    return (
      <div className="w-full px-6 py-16 text-center">
        <h1 className="text-base font-medium text-foreground mb-2">Товар не найден</h1>
        <Link href="/products" className="text-xs text-muted underline">
          Вернуться к каталогу
        </Link>
      </div>
    );
  }

  const selectedSizeData = product.sizes.find((s) => s.size === selectedSize);
  const anyAvailable = selectedSizeData?.stores.some((s) => s.available);

  const toggleAccordion = useCallback(() => {
    setAccordionOpen((prev) => {
      if (prev) {
        setSelectedSize(null);
        setChecked(false);
        setShowPreorder(false);
      }
      return !prev;
    });
  }, []);

  const selectSize = useCallback((size: string) => {
    setSelectedSize(size);
    setChecked(false);
    setShowPreorder(false);
  }, []);

  const checkAvailability = useCallback(() => {
    setChecked(true);
    setShowPreorder(!anyAvailable);
  }, [anyAvailable]);

  const submitPreorder = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setPreorderSubmitted(true);
    setShowPreorder(false);
    setPreorderName('');
    setPreorderPhone('');
  }, []);

  return (
    <div className="w-full">
      <div className="mx-auto px-6 py-8">
        <nav className="mb-6">
          <Link href="/" className="text-xs text-muted hover:text-foreground transition-colors">
            Главная
          </Link>
          <span className="text-xs text-muted mx-2">/</span>
          <span className="text-xs text-muted">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {product.images.map((image, index) => (
              <div key={index} className="relative aspect-[3/4] bg-secondary">
                <Image
                  src={image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          <div className="md:sticky md:top-8 self-start">
            <div className="mb-6">
              {product.tags.includes('NEW') && (
                <span className="text-2xs tracking-wide font-medium text-muted uppercase mb-2 block">
                  НОВИНКА
                </span>
              )}
              <p className="text-xs text-muted mb-1">{product.vendor}</p>
              <h1 className="text-xl font-medium text-foreground tracking-wide">
                {product.title}
              </h1>
              <p className="text-xs text-muted mt-2">{product.color}</p>
              <p className="text-xs text-muted">Арт. {product.article}</p>
              <p className="text-sm font-medium text-foreground mt-2">
                {product.price} Br
              </p>
            </div>

            <p className="text-xs text-muted leading-5 mb-6">
              {product.description}
            </p>

            <div className="border-t border-border">
              {/* Accordion toggle */}
              <div
                onClick={toggleAccordion}
                onTouchEnd={(e) => { e.preventDefault(); toggleAccordion(); }}
                className="w-full flex items-center justify-between text-sm text-foreground tracking-wide py-4 cursor-pointer select-none bg-background"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleAccordion(); }}
              >
                <span>Узнать о наличии товара в магазине</span>
                <span className="text-lg font-light leading-none select-none">
                  {accordionOpen ? '−' : '+'}
                </span>
              </div>

              {accordionOpen && (
                <div className="pb-4 space-y-4">
                  <div>
                    <p className="text-xs text-muted mb-2 uppercase tracking-wide font-medium">
                      Выберите размер
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((s) => (
                        <div
                          key={s.size}
                          onClick={() => selectSize(s.size)}
                          onTouchEnd={(e) => { e.preventDefault(); selectSize(s.size); }}
                          className={`text-xs border px-4 py-2.5 cursor-pointer select-none active:scale-95 transition-all ${
                            selectedSize === s.size
                              ? 'bg-foreground text-background border-foreground'
                              : 'border-border text-foreground hover:border-foreground'
                          }`}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') selectSize(s.size); }}
                        >
                          {s.size}
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedSize && !checked && (
                    <div
                      onClick={checkAvailability}
                      onTouchEnd={(e) => { e.preventDefault(); checkAvailability(); }}
                      className="w-full bg-foreground text-background text-xs tracking-wide font-medium py-3 text-center cursor-pointer select-none active:opacity-70 transition-opacity uppercase"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') checkAvailability(); }}
                    >
                      Проверить наличие
                    </div>
                  )}

                  {checked && selectedSizeData && (
                    <div className="border border-border p-4 space-y-3">
                      <p className="text-xs font-medium text-foreground uppercase tracking-wide">
                        Наличие в магазинах
                      </p>
                      <ul className="space-y-3">
                        {selectedSizeData.stores.map((store, i) => (
                          <li key={i} className="border-b border-border pb-3 last:border-0 last:pb-0">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-foreground font-medium">{store.storeName}</span>
                              <span
                                className={`text-2xs font-medium px-2 py-0.5 ${
                                  store.available
                                    ? 'text-green-700 bg-green-50'
                                    : 'text-red-600 bg-red-50'
                                }`}
                              >
                                {store.available ? 'В наличии' : 'Нет в наличии'}
                              </span>
                            </div>
                            {store.available && (
                              <p className="text-2xs text-muted">{store.phone}</p>
                            )}
                          </li>
                        ))}
                      </ul>

                      {!anyAvailable && !showPreorder && !preorderSubmitted && (
                        <p className="text-xs text-muted">
                          Товара нет в наличии.{' '}
                          <span
                            onClick={() => setShowPreorder(true)}
                            onTouchEnd={(e) => { e.preventDefault(); setShowPreorder(true); }}
                            className="underline cursor-pointer select-none hover:text-foreground"
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowPreorder(true); }}
                          >
                            Оформить предзаказ
                          </span>
                        </p>
                      )}
                    </div>
                  )}

                  {showPreorder && (
                    <div className="border border-border p-4">
                      <p className="text-xs font-medium text-foreground uppercase tracking-wide mb-3">
                        Оформить предзаказ
                      </p>
                      <form onSubmit={submitPreorder} className="space-y-3">
                        <input
                          type="text"
                          placeholder="Ваше имя"
                          value={preorderName}
                          onChange={(e) => setPreorderName(e.target.value)}
                          required
                          className="w-full text-xs border border-border px-3 py-2.5 placeholder:text-muted focus:outline-none focus:border-foreground"
                        />
                        <input
                          type="tel"
                          placeholder="Номер телефона"
                          value={preorderPhone}
                          onChange={(e) => setPreorderPhone(e.target.value)}
                          required
                          className="w-full text-xs border border-border px-3 py-2.5 placeholder:text-muted focus:outline-none focus:border-foreground"
                        />
                        <button
                          type="submit"
                          className="w-full bg-foreground text-background text-xs tracking-wide font-medium py-3 cursor-pointer active:opacity-70 transition-opacity uppercase"
                        >
                          Отправить
                        </button>
                      </form>
                    </div>
                  )}

                  {preorderSubmitted && (
                    <div className="border border-green-200 bg-green-50 p-4">
                      <p className="text-xs text-green-800">
                        Спасибо! Мы свяжемся с вами, когда товар появится в наличии.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
