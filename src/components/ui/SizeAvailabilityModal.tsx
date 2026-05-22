'use client';

import { useState } from 'react';
import type { ProductSize } from '@/lib/product-data';

interface SizeAvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  sizes: ProductSize[];
  productTitle: string;
}

export function SizeAvailabilityModal({
  isOpen,
  onClose,
  sizes,
  productTitle,
}: SizeAvailabilityModalProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  if (!isOpen) return null;

  const selectedSizeData = sizes.find((s) => s.size === selectedSize);

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full md:max-w-lg bg-background animate-slide-up md:rounded-t-none rounded-t-xl max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-medium text-foreground tracking-wide">
              {productTitle}
            </h2>
            <button
              onClick={onClose}
              className="text-muted hover:text-foreground text-lg leading-none"
              aria-label="Закрыть"
            >
              ✕
            </button>
          </div>

          {/* Size Grid */}
          <div className="mb-6">
            <p className="text-xs text-muted mb-3 uppercase tracking-wide font-medium">
              Выберите размер
            </p>
            <div className="grid grid-cols-3 gap-2">
              {sizes.map((s) => (
                <button
                  key={s.size}
                  onClick={() => setSelectedSize(s.size)}
                  className={`text-sm border px-4 py-3 transition-colors ${
                    selectedSize === s.size
                      ? 'bg-foreground text-background border-foreground'
                      : 'border-border text-foreground hover:border-foreground'
                  }`}
                >
                  {s.size}
                </button>
              ))}
            </div>
          </div>

          {/* Store Availability */}
          {selectedSize && selectedSizeData && (
            <div className="border-t border-border pt-4 animate-fade-in">
              <p className="text-xs text-muted mb-3 uppercase tracking-wide font-medium">
                Наличие в магазинах
              </p>
              <ul className="space-y-3">
                {selectedSizeData.stores.map((store, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-foreground">{store.storeName}</span>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 ${
                        store.available
                          ? 'text-green-700 bg-green-50'
                          : 'text-red-600 bg-red-50'
                      }`}
                    >
                      {store.available ? 'В наличии' : 'Нет в наличии'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-full mt-6 bg-foreground text-background text-xs tracking-wide font-medium py-3 hover:opacity-90 transition-opacity uppercase"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}