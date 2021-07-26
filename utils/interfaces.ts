// Recommendation interface
export interface Recommendations {
  src: string;
  alt: string;
}
// Dimentions Interface
export interface Dimmentions {
  width: number;
  height: number;
}
// Image Interface
export interface Images {
  src: string;
  alt: string;
}
// Details interface
export interface Details {
  dimmentions?: Dimmentions;
  size?: number;
  description?: string;
  recommendations?: Recommendations[];
}
// product Interface
export interface ProductInterface {
  id: number;
  name: string;
  category: string;
  price: number;
  currency: string;
  image: Images;
  details?: Details | null;
  featured: boolean;
  bestseller: boolean;
}
// category interface
export interface Categories {
  name: string;
  description: string;
  isChecked?: boolean;
}

// price range interface
export interface PriceRange {
  name: string;
  value: number[];
}
// product promise interface
export interface ProductPromise {
  products: ProductInterface[];
  priceRange: PriceRange[];
}
