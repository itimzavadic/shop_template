export interface StoreAvailability {
  storeName: string;
  available: boolean;
  phone: string;
}

export interface ProductSize {
  size: string;
  stores: StoreAvailability[];
}

export interface ExtendedProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  price: string;
  color: string;
  article: string;
  vendor: string;
  tags: string[];
  images: string[];
  sizes: ProductSize[];
}

const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const IMAGES = '/images';

const productImageNames = [
  'benjamin-r-zNPlKIWCoZc-unsplash.jpg',
  'brock-wegner-7yONARoUsbY-unsplash.jpg',
  'kasongo-bulobo-GKmk8qYlJBc-unsplash.jpg',
  'khalid-boutchich-KSazmALqLVg-unsplash.jpg',
  'mohamad-khosravi-7I0umiKzwgc-unsplash.jpg',
  'mohamad-khosravi-WO0cn-xjX4k-unsplash.jpg',
  'otabek-xatipov-gtqZEFBJeq8-unsplash.jpg',
  'pexels-subhansaad-3613388.jpg',
];

const productConfigs = [
  {
    title: 'Классическое пальто',
    vendor: 'MHL',
    color: 'Чёрный',
    article: 'UN-001',
    price: '429.00',
    sizes: ['XS', 'S', 'M', 'L', 'XL'] as string[],
  },
  {
    title: 'Шерстяное пальто',
    vendor: 'Metalwood',
    color: 'Бежевый',
    article: 'UN-002',
    price: '495.00',
    sizes: ['S', 'M', 'L', 'XL'] as string[],
  },
  {
    title: 'Кожаная куртка',
    vendor: 'ERL',
    color: 'Коричневый',
    article: 'UN-003',
    price: '660.00',
    sizes: ['M', 'L', 'XL', 'XXL'] as string[],
  },
  {
    title: 'Джинсовая куртка',
    vendor: 'MHL',
    color: 'Синий',
    article: 'UN-004',
    price: '363.00',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as string[],
  },
  {
    title: 'Трикотажный кардиган',
    vendor: 'Larriet',
    color: 'Серый',
    article: 'UN-005',
    price: '280.50',
    sizes: ['S', 'M', 'L'] as string[],
  },
  {
    title: 'Бомбер',
    vendor: 'Metalwood',
    color: 'Оливковый',
    article: 'UN-006',
    price: '528.00',
    sizes: ['S', 'M', 'L', 'XL'] as string[],
  },
  {
    title: 'Тренч',
    vendor: 'ERL',
    color: 'Песочный',
    article: 'UN-007',
    price: '577.50',
    sizes: ['S', 'M', 'L', 'XL'] as string[],
  },
  {
    title: 'Пуховик',
    vendor: 'Larriet',
    color: 'Чёрный',
    article: 'UN-008',
    price: '742.50',
    sizes: ['XS', 'S', 'M', 'L', 'XL'] as string[],
  },
];

// Store info with phone numbers
const STORES = [
  { name: 'Светлогорск, ТЦ «Берёзки»', phone: '+375 29 111-11-11' },
  { name: 'Мозырь, ТЦ «Катапульта»', phone: '+375 29 222-22-22' },
];

// Deterministic availability pattern based on index
const availabilityPatterns: boolean[][] = [
  [true, true],
  [true, false],
  [false, true],
  [true, true],
  [false, false],
  [true, false],
  [false, true],
  [true, true],
];

function generateSizes(productIndex: number, sizeNames: string[]): ProductSize[] {
  const pattern = availabilityPatterns[productIndex % availabilityPatterns.length];

  return sizeNames.map((size, si) => ({
    size,
    stores: STORES.map((store, si2) => ({
      storeName: store.name,
      phone: store.phone,
      available: pattern[(si + si2) % pattern.length],
    })),
  }));
}

export function generateProducts(count: number = 8): ExtendedProduct[] {
  return productConfigs.slice(0, count).map((cfg, i) => ({
    id: `product-${i}`,
    title: cfg.title,
    handle: `product-${i + 1}`,
    description: `${cfg.vendor} — ${cfg.title.toLowerCase()}. Идеально подходит для повседневного образа. Качественные материалы и продуманный крой.`,
    price: cfg.price,
    color: cfg.color,
    article: cfg.article,
    vendor: cfg.vendor,
    tags: i === 0 ? ['NEW'] : [],
    images: [
      `${IMAGES}/${productImageNames[i]}`,
      `${IMAGES}/${productImageNames[i]}`,
    ],
    sizes: generateSizes(i, cfg.sizes),
  }));
}